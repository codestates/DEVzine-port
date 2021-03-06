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

// ???-??? ?????? 6??? ????????? (24?????? ?????? ??????????????? ?????? ????????????)
const automatedCrawlerForWeekday = schedule.scheduleJob(
  '00 21 * * 1-5',
  async () => {
    crawlerForHours(24);
  },
);
// ????????? ?????? 6??? ????????? (48?????? ?????? ??????????????? ?????? ????????????)
const automatedCrawlerForWeekend = schedule.scheduleJob(
  '00 21 * * 7',
  async () => {
    crawlerForHours(48);
  },
);
// ????????? ????????? ?????? ?????? (?????? 7???)
const automatedNewsLetter = schedule.scheduleJob(
  '00 22 * * 1-5,7',
  async () => {
    await sendMailToSubscribers();
  },
);

mongoose
  .connect(process.env.MONGO_STRING, {
    useNewUrlParser: true, // ?????? 5 ???????????? ???????????? ????????? url parser ??????
    useUnifiedTopology: true, // shard ??? replica set ??? ??????
    useCreateIndex: true, // deprecated ??? ensureIndex ?????? createIndex ??????
    useFindAndModify: false, // findOneAndRemove() ??? findOneAndUpdate() ??? ???????????? ??????
    dbName: process.env.MONGO_DATABASE, // connection string ??? ?????? db ?????? ?????? ????????? db ??????
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
