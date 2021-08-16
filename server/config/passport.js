const passport = require('passport');
const { ExtractJwt, Strategy: JWTStrategy } = require('passport-jwt');
const { Strategy: LocalStrategy } = require('passport-local');

const { User } = require('../Models/Users');

require('dotenv').config();

const passportConfig = { usernameField: 'user_email', passwordField: 'user_password' };

const passportVerify = async (user_email, user_password, done) => {
	User.findOne({ user_email }, (err, user) => {
		if (err) {
			return done(err);
		}
		if (!user) {
			return done(null, false, { message: "Invalid user" });
		}
		if (user.user_password !== user_password) {
			return done(null, false, { message: "Invalid password" });
		}
		return done(null, user);
	});
};

const JWTConfig = {
	// jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	jwtFromRequest: ExtractJwt.fromHeader('authorization'),
	secretOrKey: process.env.JWT_SECRET,
};

const JWTVerify = async (jwtPayload, done) => {
  try {
    const user = await User.findOne({ _id: jwtPayload.id });
    if (user) {
      return done(null, user);
    }
    return done(null, false, { message: '올바르지 않은 인증정보 입니다.' });
  } catch (err) {
    return done(err);
  }
};

module.exports = () => {
	
	passport.use('local', new LocalStrategy(passportConfig, passportVerify));
	passport.use('jwt', new JWTStrategy(JWTConfig, JWTVerify));

};