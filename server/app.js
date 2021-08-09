const { stream } = require('./config/winston');
const fs = require('fs');
const https = require('https');
const mongoose = require("mongoose");
const cors = require('cors');
const cookieParser = require('cookie-parser');
const express = require('express');
const morgan = require('morgan');
const app = express();
const session = require('express-session');
const passport = require('passport');
const passportConfig = require('./config/passport');
require('dotenv').config();


app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true,
  // store: ?
}));
app.use(passport.initialize()); // passport 미들웨어
app.use(passport.session()); // session 사용할 수 있도록 하는 미들웨어
passportConfig();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(morgan('combined', { stream }));
app.use(
  cors({
    origin: true,
    credentials: true,
    methods: ['GET', 'POST', 'PATCH', 'OPTIONS'],
  })
);

app.get('/', (req, res) => {
  res.status(200).json({"message": "server & db connected!"})
});

const { insertSeedData } = require('./seeds/insertSeedData');
app.use('/seed', insertSeedData);

const articleListRouter = require('./router/articleListRouter');
const articleRouter = require('./router/articleRouter');
const contributionRouter = require('./router/contributionRouter');
const landingRouter = require('./router/landingRouter');
const myPageRouter = require('./router/myPageRouter');
const subscribeRouter = require('./router/subscribeRouter');
const usersRouter = require('./router/usersRouter');
const visualRouter = require('./router/visualRouter');
app.use('/articlelist', articleListRouter);
app.use('/article', articleRouter);
app.use('/contribution', contributionRouter);
app.use('/landing', landingRouter);
app.use('/mypage', myPageRouter);
app.use('/subscribe', subscribeRouter);
app.use('/users', usersRouter);
app.use('/visual', visualRouter);

mongoose
  .connect(process.env.MONGO_STRING, {
    useNewUrlParser: true, // 버전 5 이상부터 적용되는 새로운 url parser 사용
    useUnifiedTopology: true, // shard 와 replica set 에 접근
    useCreateIndex: true, // deprecated 된 ensureIndex 대신 createIndex 사용 
    useFindAndModify: false, // findOneAndRemove() 과 findOneAndUpdate() 를 분리해서 사용 
    dbName: process.env.MONGO_DATABASE, // connection string 에 있는 db 대신 다른 디폴트 db 지정 
  })
  .then(() => console.log(`mongoDB connected`))
  .catch((err) => console.error(err));

// test zone
// app.post('/testlogin',
//   passport.authenticate('local', {
//     successRedirect: '/',
//     failureRedirect: '/testlogin'
// }));
app.post('/testlogin', passport.authenticate('local'), function(req, res) {
  res.status(200).send('success');
});

app.get('/testauth', isAuthenticated, function(req, res) {
	// let user = req.user;
	// if (user) {
		res.send(`user: ${req.user}`);
	// }
	// else {
	// 	res.send('not authenticated');
	// }
});

// 인증 확인 미들웨어
function isAuthenticated(req, res, next) {
  // req.isAuthenticated()
  // 서버에 요청을 보낸 사용자가 인증이 되어있는 상태인지 확인하여 boolean 값 반환
  if (req.isAuthenticated()) {
    return next();
  }
  return res.send('fail');
}

app.get('/testlogout', function(req, res) {
  req.logout();
  // 1. 로그 아웃 후 현재 세션을 삭제한 뒤 비동기 처리
  // req.session.destroy(function(err) {
  //   res.send('log out');
  // });
  // 2. 로그 아웃 후 현재 세션을 저장한 뒤 비동기 처리
  // req.session.save(function () {
  //   res.send('log out');
  // });
  res.send('log out');
});
// test zone

const HTTPS_PORT = process.env.HTTPS_PORT || 80;
let server;
if (fs.existsSync('./key.pem') && fs.existsSync('./cert.pem')) {
  const privateKey = fs.readFileSync(__dirname + '/key.pem', 'utf8');
  const certificate = fs.readFileSync(__dirname + '/cert.pem', 'utf8');
  const credentials = { key: privateKey, cert: certificate };

  server = https.createServer(credentials, app);
  server.listen(HTTPS_PORT, () => console.log('https server success'));
} else {
  server = app.listen(HTTPS_PORT, () => console.log('http server success'));
}
