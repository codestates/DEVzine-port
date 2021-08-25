const { User } = require('../Models/Users');
const { Admin } = require('../Models/Admins');
const { Strategy: JWTStrategy } = require('passport-jwt');
const { Strategy: LocalStrategy } = require('passport-local');
const passport = require('passport');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const passportConfig = {
  usernameField: 'user_email',
  passwordField: 'user_password',
  session: false,
};

const passportVerify = async (user_email, user_password, done) => {
  await User.findOne({ user_email }, 
    {
      user_name: 1,
      user_email: 1,
      user_password: 1,
      subscribed:1,
    }, async (err, user) => {
    if (err) {
      return done(err);
    }
    if (!user) {
      return done(null, false, { message: 'Invalid user' });
    }
    const isValidPassword = await bcrypt.compare(
      user_password,
      user.user_password,
      );
      if (!isValidPassword) {
        return done(null, false, { message: 'Invalid password' });
      }
      
      delete user._doc.user_password;
      return done(null, user);
  });
};

const cookieExtractor = function (req) {
  var token = null;
  if (req && req.cookies) {
    token = req.cookies['jwt'];
  }
  return token;
};

const JWTConfig = {
  jwtFromRequest: cookieExtractor,
  secretOrKey: process.env.JWT_SECRET,
};

const JWTVerify = async (jwtPayload, done) => {
  try {
    const user = await User.findOne({ _id: jwtPayload.user._id }, {
      user_name: 1,
      user_email: 1,
      subscribed: 1
    });
    if (user) {
      return done(null, user);
    }
    return done(null, false, { message: '올바르지 않은 인증정보 입니다.' });
  } catch (err) {
    return done(err);
  }
};

const adminConfig = {
  usernameField: 'admin_id',
  passwordField: 'admin_password',
  session: false,
};

const passportVerifyAdmin = async (admin_id, admin_password, done) => {
  Admin.findOne({ admin_id }, async (err, admin) => {
    if (err) {
      return done(err);
    }
    if (!admin) {
      return done(null, false, { message: 'Invalid user' });
    }
    const isValidPassword = await bcrypt.compare(
      admin_password,
      admin.admin_password,
    );
    if (!isValidPassword) {
      return done(null, false, { message: 'Invalid password' });
    }
    delete admin._doc.admin_password;
    return done(null, admin);
  });
};

const cookieExtractorAdmin = function (req, res, next) {
  var token = null;
  if (req && req.cookies) {
    token = req.cookies['admin'];
  }
  return token;
};

const JWTConfigAdmin = {
  jwtFromRequest: cookieExtractorAdmin,
  secretOrKey: process.env.JWT_SECRET,
};

const JWTVerifyAdmin = async (jwtPayload, done) => {
  try {
    const admin = await Admin.findOne({ admin_id: jwtPayload.admin_id},
    {
      admin_password:0 
    });
    if (admin) {
      return done(null, admin);
    }
    return done(null, false, { message: '올바르지 않은 인증정보 입니다.' });
  } catch (err) {
    return done(err);
  }
};

module.exports = () => {
  passport.use('local', new LocalStrategy(passportConfig, passportVerify));
  passport.use('jwt', new JWTStrategy(JWTConfig, JWTVerify));
  passport.use('admin', new LocalStrategy(adminConfig, passportVerifyAdmin));
  passport.use('adminJWT', new JWTStrategy(JWTConfigAdmin, JWTVerifyAdmin));
};
