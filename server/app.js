const fs = require('fs');
const https = require('https');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const express = require('express');
const morgan = require('morgan');
const { stream } = require('./config/winston');
const mongoose = require("mongoose");
const session = require('express-session');
const passport = require('passport');
const passportConfig = require('./config/passport');

const app = express();

const testRouter = require('./router/testRouter');

require('dotenv').config();

app.use('/', testRouter);

app.use(session({ secret: process.env.SESSION_SECRET, resave: true, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());
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

mongoose
  .connect(process.env.MONGO_STRING, {
    useNewUrlParser: true, // 버전 5 이상부터 적용되는 새로운 url parser 사용
    useUnifiedTopology: true, // shard 와 replica set 에 접근
    useCreateIndex: true, // deprecated 된 ensureIndex 대신 createIndex 사용 
    useFindAndModify: false, // findOneAndRemove() 과 findOneAndUpdate() 를 분리해서 사용 
    dbName: process.env.MONGO_DATABASE // connection string 에 있는 db 대신 다른 디폴트 db 지정 
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