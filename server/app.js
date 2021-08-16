const { stream } = require('./config/winston');
const fs = require('fs');
const https = require('https');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const express = require('express');
const morgan = require('morgan');
const app = express();
const session = require('express-session');
const passport = require('passport');
const passportConfig = require('./config/passport');
const schedule = require('node-schedule');
require('dotenv').config();

const robots = require('express-robots-txt')
app.use(robots({UserAgent: '*', Disallow: '/'}))

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    // store: ?
  })
);
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
  res.status(200).json({ message: 'server & db connected!' });
});

const { isAuthenticated } = require('./controller/middleware/isAuthenticated');
app.get('/testauth', isAuthenticated, (req, res) => {
	// let user = req.user;
	// if (user) {
		res.send(`user: ${req.user}`);
	// }
	// else {
	// 	res.send('not authenticated');
	// }
});

const { insertSeedData } = require('./seeds/insertSeedData');
app.use('/seed', insertSeedData);

const adminRouter = require('./router/adminRouter');
const contributionRouter = require('./router/contributionRouter');
const emailRouter = require('./router/emailRouter');
const landingRouter = require('./router/landingRouter');
const magazineRouter = require('./router/magazineRouter');
const myPageRouter = require('./router/myPageRouter');
const subscribeRouter = require('./router/subscribeRouter');
const userRouter = require('./router/userRouter');
const visualRouter = require('./router/visualRouter');
app.use('/admin', adminRouter);
app.use('/contribution', contributionRouter);
app.use('/email', emailRouter);
app.use('/landing', landingRouter);
app.use('/magazine', magazineRouter);
app.use('/mypage', myPageRouter);
app.use('/subscribe', subscribeRouter);
app.use('/user', userRouter);
app.use('/visual', visualRouter);

const { Article } = require('./Models/Articles')
const { getRecentArticlesFrom24H, getRecentArticlesFrom48H } = require('./controller/crawler/article-crawler');
const automatedCrawlerForWeekday = schedule.scheduleJob('00 21 * * 1-5', async () => { // 화-토 오전 6시 크롤링 (24시간 이내 업데이트)
  const data = await getRecentArticlesFrom24H();
  await Article.create(data);
});
const automatedCrawlerForWeekend = schedule.scheduleJob('00 21 * * 7', async () => { // 월요일 오전 6시 크롤링 (48시간 이내 업데이트) 
  const data = await getRecentArticlesFrom48H();
  await Article.create(data);
});
// const test = schedule.scheduleJob('39 13 * * *', async () => { // 크롤링 자동화 test 용 코드, 최종 배포 전에 삭제해야 함 
//   const data = await getRecentArticlesFrom24H();
//   console.log(data)
// });

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
