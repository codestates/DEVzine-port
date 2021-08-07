const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { User } = require('../models/Users');

const dummyUser = {
	user_name: 'test',
	user_password: 'qwer1234',
	user_email: 'test@test.com'
}

module.exports = () => {

	// 로그인을 성공했을 때 딱 한 번 callback 함수가 실행
	// 앞서 로그인 성공한 경우에 전달 받은 done 객체를 받아 세션(req.session.passport.user)에 id만 저장(세션 용량 조절)
	passport.serializeUser((user, done) => {
		done(null, user._id);
	});

	// 로그인에 성공하고 페이지를 방문할 때마다 호출
	// 세션에 저장한 아이디를 통해서 사용자 정보 객체 불러옴
	// req.user 객체가 생성되어 유저에 대한 정보 조회 가능
	passport.deserializeUser((id, done) => {
		User.findById(id, (err, user) => {
			done(err, user);
		});
	});
	
	passport.use(new LocalStrategy({
		usernameField: 'user_email', // id set
		passwordField: 'user_password', // password set
		session: true, // session set
		passReqToCallback: false // callback req off
	}, (username, password, done) => {
		let user = {
			_id: 1,
			user_name: username,
			user_password: password
		}
		if (dummyUser.user_name !== username) {
			return done(null, false, { message: 'Incorrect username.' });
		}
		if (dummyUser.user_password !== password) {
			return done(null, false, { message: 'Incorrect password.' });
		}
		return done(null, user);


		// db 조회 ver
		// User.findOne({ user_email: username }, (err, user) => {
		// 	if (err) { // 에러가 발생하면 에러를 반환
		// 		return done(err);
		// 	}
		// 	if (!user) { // 유저가 없으면 에러를 반환
		// 		return done(null, false, { message: 'Incorrect username.' });
		// 	}
		// 	// ! 패스워드 비교 함수 작성 필요 지금처럼 단순 비교x
		// 	// console.log(user.password);
		// 	if (user.user_password !== password) { // 유저의 패스워드가 일치하지 않으면 에러를 반환
		// 		return done(null, false, { message: 'Incorrect password.' });
		// 	}
		// 	return done(null, user); // 정상적으로 세션에 저장된 유저의 정보를 반환
		// 	// 인증이성공하면 passport에 사용자의 정보를 전달
		// });
	}));

};
