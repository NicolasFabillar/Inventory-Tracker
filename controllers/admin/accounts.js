const passport = require("../../util/passport-config");
const jwt = require("jsonwebtoken");

exports.accountLogin = (req, res, next) => {
    passport.authenticate("login", (err, user, info) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.status(400).json({ success: false, message: info.message });
        }

        const token = jwt.sign({ userId: user.id, type: user.type }, process.env.SECRETKEY, {
            expiresIn: "2h",
        });

        res.json({ success: true, token });
    })(req, res, next);
};
