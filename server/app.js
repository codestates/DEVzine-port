const { stream } = require('./config/winston');
const {
  crawlerFor24H,
  crawlerFor48H,
} = require('./controller/crawler/automateCrawler');
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
passportConfig();

app.set('trust proxy', 1);
app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());
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
    crawlerFor24H();
  },
);
// 월요일 오전 6시 크롤링 (48시간 이내 업데이트된 기사 불러오기)
const automatedCrawlerForWeekend = schedule.scheduleJob(
  '00 21 * * 7',
  async () => {
    crawlerFor48H();
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

///////// ejs 확인용 //////////
app.set('views', './controller/ejsform');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
app.get('/ejstest', (req, res) => {
  res.render('newsLetter', {
    formatDate: '2021/08/24 화요일',
    userEmail: 'test@test.com',
    userName: '여러분',
    articleList: [
      {
        _id: { $oid: '611e6c5d3f94a52fd830837a' },
        hit: { $numberInt: '1' },
        article_title:
          '[이상섭 보안外傳] 네이버-카페24, 해외 시장에서 성과 내길',
        article_content:
          '네이버가 1,300억원 대의 지분교환을 통해 카페24의 지분을 15% 확보했다. 네이버의 자사주로 카페24가 발행하는 신주를 전부 인수하는 방식이다. 이로...',
        article_date: { $date: { $numberLong: '1628699640000' } },
        article_url:
          'https://www.boannews.com//media/view.asp?idx=99749&page=1&kind=6',
        article_keyword: '보안',
        article_publisher: '보안뉴스',
        article_id: { $numberInt: '3' },
      },
      {
        _id: { $oid: '611e6c5d3f94a52fd8308371' },
        hit: { $numberInt: '1' },
        article_title: '채용 제안 메일이 왔다고? 정보탈취 악성코드 감염 조심',
        article_content:
          '기업의 하반기 채용이 이어지는 가운데 ‘채용 제안’을 위장한 이메일로 악성코드를 유포하는 사례가 발견돼 주의가 필요하다. 공격자는 악성 메일에 ‘Team ...',
        article_date: { $date: { $numberLong: '1628675580000' } },
        article_url:
          'https://www.boannews.com//media/view.asp?idx=99733&page=1&kind=1',
        article_keyword: '보안',
        article_publisher: '보안뉴스',
        article_id: { $numberInt: '4' },
      },
      {
        _id: { $oid: '611e6c5d3f94a52fd8308372' },
        hit: { $numberInt: '1' },
        article_title: '[기자수첩] <내가 죽던 날>, 가장 생생히 살아있으리라',
        article_content:
          '생명과 가장 가까운 건 죽음이다. 굳이 사람이 돌보지 않아도 산천의 생명들은 각자의 죽음을 통해 대를 잇는다. 사람들에게도 살아있다는 건 호시탐탐 기회를 ...',
        article_date: { $date: { $numberLong: '1628675280000' } },
        article_url:
          'https://www.boannews.com//media/view.asp?idx=99716&page=1&kind=6',
        article_keyword: '보안',
        article_publisher: '보안뉴스',
        article_id: { $numberInt: '2' },
      },
      {
        _id: { $oid: '611e6c5d3f94a52fd8308373' },
        hit: { $numberInt: '1' },
        article_title:
          '해킹 공격에도 시스템 상태를 정확히 추정하는 새로운 보안 알고리즘 개발',
        article_content:
          'DGIST 정보통신융합전공 은용순 교수팀은 사이버물리시스템 제어에 있어 핵심 요소인 시스템 상태추정 기법의 보안 안정성과 자율복원성을 동시에 보장하는 새로...',
        article_date: { $date: { $numberLong: '1628678940000' } },
        article_url:
          'https://www.boannews.com//media/view.asp?idx=99727&page=1&kind=2',
        article_keyword: '보안',
        article_publisher: '보안뉴스',
        article_id: { $numberInt: '1' },
      },
    ],
    contribution: {
      _id: { $oid: '611e6c603f94a52fd83084e0' },
      status: { $numberInt: '111' },
      hit: { $numberInt: '49' },
      contribution_keyword: '코딩',
      contribution_title:
        '2021년 7월 6일 코드스테이츠 DAY-93 session 스프린트 깊은 탐구',
      contribution_url: 'https://localhost:3000/article/con-8',
      contribution_content:
        '인증/보안 세션에서 session을 접하였기에 당연히 session이 인증/보안을 위해 생겨난 무엇이라고 생각을 했다. \n\n \n\n하지만 세션은 인증/보안의 역할을 하기 이전에 브라우저가 서버에 어떠한 요청을 했을때\n\n \n\n이 요청을 어떤 브라우저가 보낸 것인지 식별하기 위해 서버에서 생성되는 기본 객체였다. 위 그림의 3을 보면 PW를 해싱한 값과 DB를 비교해서 로그인에 성공한다면 세션을 생성하고\n\n \n\nresponse의 cookie에 sessionID를 보내줌이라고 적혀있는 부분을 확인할 수 있다. \n\n \n\n하지만 코드스테이츠에서의 session sprint에서 로그인 요청을 받고 응답을 보내줄때에는\n\n \n\n3의 과정이 없어도 test case를 통과함은 물론이거니와 sprint이후 제공된 reference에도 3의 과정이 보이지 않았다.\n\n(세션 객체에 userId를 저장하는 부분은 있었지만... 쿠키에 sessionID를 보내는 부분이 없다.)\n\n \n\n(브라우저에서 최초로 서버에 요청을 보내면 서버쪽에서 브라우저를 식별할 수 있도록 세션이라는 기본 객체를 만든다.\n\n \n\n그 기본 객체안에는 세션ID가 있고 이 세션ID를 쿠키에 담아서 브라우저로 보내주면 \n\n \n\n브라우저는 앞으로의 모든 요청에 세션ID를 서버에 보낸다. \n\n \n\n서버는 요청에 포함된 쿠키의 세션ID를 통해 어떤 브라우저인지 식별할 수 있게 된다.)\n\n \n\n세션이 브라우저마다 하나씩 만들어지는 그리고 서버에 저장되는 특성을 활용해서\n\n \n\n로그인 관련한 중요한 정보 및 클라이언트에 보관하면 민감한 정보들을\n\n \n\n세션에 저장하여 인증/보안의 역할을 할 수 있게 하는 것이다. \n\n \n\n출처 : https://youtu.be/VrWK1VPW5Qg\n\n \n\n위의 과정을 아래의 그림으로 표현해 보았다. 브라우저(클라이언트)에 sessionID를 보내준다고 적었으나,\n실제로 client에서는 connect.sid라는 고유값만을 받게 된다.\nconnect.sid는 서버에서 지정한 secret(salt)과 sessionID를 암호화하여 만들어진 것이다.\n또한 쿠키에 connect.sid를 보내주는 등의 내가 고민했던 부분은\nmiddleware에 의해 자동으로 처리되기 때문에 \n직접 쿠키에 접근하거나 할 필요가 없다라는게 깊은 탐구의 결론이다.',
      contribution_date: { $date: { $numberLong: '1629295110961' } },
      user_email: 'bmanerdaniel@gmail.com',
      contribution_id: { $numberInt: '8' },
      recommended: false,
    },
    articlesCount: 30,
    max: 4,
    contributionContent:
      'Dynamic Programming 동적 프로그래밍\n \n\n동적 프로그래밍에는 문제를 더 작은 문제로 쪼개는 과정을 포함하고 있음.\n\n \n\n(작은 문제를 해결해야 그 다음 문제를 해결할 수 있는 구조가 되려나)\n\n \n\n동적 프로그래밍은 작은 문제를 해결한 다음 이에 대한 결과를 메모리에 저장해\n\n \n\n필요 시 언제든 해결된 문제의 결과에...',
  });
});
///////// ejs 확인용 //////////

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
