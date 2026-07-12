
const {Users, OneTimeTokens} = require("../../models/Associations");
const passport = require("../../util/passport-config");
const jwt = require("jsonwebtoken");
const errorHandler = require("../../util/errorHandler");
const { Op } = require("sequelize");
const {getCurrentTimestamp, formatTimestamp} = require("../../util/formatTimestamp")

exports.accountLogin = (req, res, next) => {
    passport.authenticate("login", (err, user, info) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.status(400).json({ success: false, message: info.message });
        }

        const token = jwt.sign({ userId: user.id, userRole: user.role }, process.env.SECRETKEY, {
            expiresIn: "2h",
        });

        res.json({ success: true, token });
    })(req, res, next);
};

exports.accountCreate = (req, res, next) => {
    passport.authenticate("signup", { session: false }, (err, user, info) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.status(400).json({ success: false, message: info.message });
        }

        const token = jwt.sign({ userId: user.id, userRole: user.role }, process.env.SECRETKEY, {
            expiresIn: "2h",
        });

        res.json({ success: true, token });
    })(req, res, next);
};

exports.changePassword = async (req, res, next) => {
  const { userId } = req
  const { oldPassword, newPassword, confirmNewPassword} = req.body

  try {
    const user = await Users.findByPk(userId);
    
    if (!user) {
        errorHandler(`User not found`, 404);
    }

    if (!(await user.validatePassword(oldPassword))) {
        errorHandler(`Password is incorrect`, 409);
    }

    if (newPassword != confirmNewPassword) {
        errorHandler(`New password does not match`, 409);
    }

    await user.update({
        password: newPassword
    })

    return res.status(200).json({ status: true})
  } catch (err) {  
    next(err)
  }
}

exports.changePasswordWithToken = async (req, res, next) => {
  const { token, newPassword, confirmNewPassword, emailAddress} = req.body

  try {
    const user = await Users.findOne({
        where: {
            email_address: emailAddress
        }
    });
    
    if (!user) {
        errorHandler(`User not found`, 404);
    }

    const tokenCheck = await OneTimeTokens.findOne({
        where: {
            token: token,
            email_address: emailAddress,
            status: true
        }
    })

    if (!tokenCheck) {
        errorHandler(`Incorrect Token`, 404);
    }

    const currentTime = getCurrentTimestamp();
    const tokenExpiration = formatTimestamp(tokenCheck.expires_at)

    if (!tokenExpiration > currentTime) {
        errorHandler(`Expired Token`, 409);
    }

    if (newPassword != confirmNewPassword) {
        errorHandler(`New password does not match`, 409);
    }

    await tokenCheck.update({
        status: false
    })

    await user.update({
        password: newPassword
    })

    return res.status(200).json({ status: true})
  } catch (err) {  
    next(err)
  }
}


