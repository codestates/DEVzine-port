const { stream } = require('./config/winston');
const fs = require('fs');
const https = require('https');
const mongoose = require("mongoose");
const cors = require('cors');
const cookieParser = require('cookie-parser');
const express = require('express');
const morgan = require('morgan');
const app = express();
require('dotenv').config();

const testRouter = require('./router/server_test/testRouter');
const { insertSeedData } = require('./seed/insertSeedData');
app.use('/', testRouter);
app.use('/seed', insertSeedData);

const articleListRouter = require('./router/articleListRouter');
const articleRouter = require('./router/articleRouter');
const contributionRouter = require('./router/contributionRouter');
const landingRouter = require('./router/landingRouter');
const myPageRouter = require('./router/myPageRouter');
const signInRouter = require('./router/signInRouter');
const signOutRouter = require('./router/signOutRouter');
const signUpRouter = require('./router/signUpRouter');
const subscribeRouter = require('./router/subscribeRouter');
const visualRouter = require('./router/visualRouter');
app.use('/articlelist', articleListRouter);
app.use('/article', articleRouter);
app.use('/contribution', contributionRouter);
app.use('/landing', landingRouter);
app.use('/mypage', myPageRouter);
app.use('/signin', signInRouter);
app.use('/signout', signOutRouter);
app.use('/signup', signUpRouter);
app.use('/subscribe', subscribeRouter);
app.use('/visual', visualRouter);

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

mongoose
  .connect(process.env.MONGO_STRING, {
    useNewUrlParser: true, // 버전 5 이상부터 적용되는 새로운 url parser 사용
    useUnifiedTopology: true, // shard 와 replica set 에 접근
    useCreateIndex: true, // deprecated 된 ensureIndex 대신 createIndex 사용 
    useFindAndModify: false, // findOneAndRemove() 과 findOneAndUpdate() 를 분리해서 사용 
    dbName: process.env.MONGO_DATABASE, // connection string 에 있는 db 대신 다른 디폴트 db 지정 
    autoIndex: true // 어플리케이션이 커지면 성능 저하 불러올 수 있음 
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
