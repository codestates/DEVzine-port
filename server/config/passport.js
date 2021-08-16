const passport = require('passport');
const { Strategy: JWTStrategy } = require('passport-jwt');
const { Strategy: LocalStrategy } = require('passport-local');

const { User } = require('../Models/Users');

require('dotenv').config();

const passportConfig = { usernameField: 'user_email', passwordField: 'user_password', session: false };

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

const cookieExtractor = function(req) {
	var token = null;
	if (req && req.cookies)
	{
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
    const user = await User.findOne({ _id: jwtPayload.user._id });
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