const { stream } = require('./config/winston');
const { crawlerForHours } = require('./controller/crawler/automateCrawler');
const {
  sendMailToSubscribers,
} = require('./controller/emailfunction/subscriberEmail');
const fs = require('fs');
const https = require('https');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const express = require('express');
const morgan = require('morgan');
const passport = require('passport');
const passportConfig = require('./config/passport');
const schedule = require('node-schedule');
const robots = require('express-robots-txt');
const adminRouter = require('./router/adminRouter');
const contributionRouter = require('./router/contributionRouter');
const emailRouter = require('./router/emailRouter');
const landingRouter = require('./router/landingRouter');
const magazineRouter = require('./router/magazineRouter');
const myPageRouter = require('./router/myPageRouter');
const subscribeRouter = require('./router/subscribeRouter');
const unsubscribeRouter = require('./router/unsubscribeRouter');
const userRouter = require('./router/userRouter');
const visualRouter = require('./router/visualRouter');
const app = express();

require('dotenv').config();

app.set('trust proxy', 1);
app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());
passportConfig();
app.use(express.urlencoded({ extended: false }));
app.use(morgan('combined', { stream }));
app.use(
  cors({
    origin: true,
    credentials: true,
    methods: ['GET', 'POST', 'PATCH', 'OPTIONS', 'DELETE'],
  }),
);
app.use(
  robots({
    UserAgent: '*',
    Disallow: '/',
  }),
);

app.get('/', (req, res) => {
  res.status(200).json({
    message: 'server & db connected!',
  });
});
app.use('/admin', adminRouter);
app.use('/contribution', contributionRouter);
app.use('/email', emailRouter);
app.use('/landing', landingRouter);
app.use('/magazine', magazineRouter);
app.use('/mypage', myPageRouter);
app.use('/subscribe', subscribeRouter);
app.use('/unsubscribe', unsubscribeRouter);
app.use('/user', userRouter);
app.use('/visual', visualRouter);

// 화-토 오전 6시 크롤링 (24시간 이내 업데이트된 기사 불러오기)
const automatedCrawlerForWeekday = schedule.scheduleJob(
  '00 21 * * 1-5',
  async () => {
    crawlerForHours(24);
  },
);
// 월요일 오전 6시 크롤링 (48시간 이내 업데이트된 기사 불러오기)
const automatedCrawlerForWeekend = schedule.scheduleJob(
  '00 21 * * 7',
  async () => {
    crawlerForHours(48);
  },
);
// 구독자 이메일 자동 발송 (오전 7시)
const automatedNewsLetter = schedule.scheduleJob(
  '00 22 * * 1-5,7',
  async () => {
    await sendMailToSubscribers();
  },
);

mongoose
  .connect(process.env.MONGO_STRING, {
    useNewUrlParser: true, // 버전 5 이상부터 적용되는 새로운 url parser 사용
    useUnifiedTopology: true, // shard 와 replica set 에 접근
    useCreateIndex: true, // deprecated 된 ensureIndex 대신 createIndex 사용
    useFindAndModify: false, // findOneAndRemove() 과 findOneAndUpdate() 를 분리해서 사용
    dbName: process.env.MONGO_DATABASE, // connection string 에 있는 db 대신 다른 디폴트 db 지정
  })
  .then(() => console.log(`mongoDB connected`))
  .catch(err => console.error(err));

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
