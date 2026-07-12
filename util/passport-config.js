const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const { Users, OneTimeTokens} = require("../models/Associations")
const {formatTimestamp, getCurrentTimestamp} = require("../util/formatTimestamp");
const { Op } = require("sequelize");


// One time token registration 
passport.use(
  "signup",
  new LocalStrategy(
    { usernameField: "emailAddress", passReqToCallback: true },
    async (req, emailAddress, password, done) => {
      try {
        const tokenCheck = await OneTimeTokens.findOne({
          where: {
            token: req.body.token,
            email_address: emailAddress,
            status: true
          }
        })

        if (!tokenCheck) {
          return done(null, false, {
            message: "Incorrect token used",
          });
        }
        const currentTime = getCurrentTimestamp();
        const tokenExpiration = formatTimestamp(tokenCheck.expires_at)

        if (!tokenExpiration > currentTime) {
          return done(null, false, {
            message: "Token expired",
          });
        }

        const existingEmail = await Users.findOne({ 
          where: { 
            email_address: emailAddress,
          } 
        });

        if (existingEmail) {
          return done(null, false, {
            message: "Email address is already in use",
          });
        }

        const existingUsername = await Users.findOne({ 
          where: { 
            username: req.body.username ,
          } 
        });

        if (existingUsername) {
          return done(null, false, {
            message: "Username is already in use",
          });
        }

        const newUser = await Users.create({
          role: tokenCheck.role,
          first_name: req.body.firstName,
          last_name: req.body.lastName,
          username: req.body.username,
          email_address: emailAddress,
          password: password,
          phone_no: req.body.phoneNo,
          status: true
        });

        tokenCheck.update({
          status: false
        })

        return done(null, newUser);
      } catch (error) {
        return done(error);
      }
    }
  )
);

// All user login
passport.use(
  "login",
  new LocalStrategy(
    { usernameField: "usernameOrEmail" },
    async (usernameOrEmail, password, done) => {
      try {
        const user = await Users.findOne({
          where: {
            [Op.or]: [
              { username: usernameOrEmail },
              { email_address: usernameOrEmail },
            ],
          },
        });

        if (!user || !(await user.validatePassword(password))) {
          return done(null, false, { message: "Invalid username, email or password" });
        }

        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await Users.findByPk(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});

module.exports = passport;