const { Contribution } = require('../../Models/Contributions');
const { Subscriber } = require('../../Models/Subscribers');
const { Article } = require('../../Models/Articles');
const { User } = require('../../Models/Users');
const smtpTransport = require('nodemailer-smtp-transport');
const inlineCss = require('nodemailer-juice');
const nodemailer = require('nodemailer');
const ejs = require('ejs');
const fs = require('fs');

require('dotenv').config();

const transporter = nodemailer.createTransport(
  smtpTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    auth: {
      user: process.env.NODEMAIL_EMAIL,
      pass: process.env.NODEMAIL_PWD,
    },
    pool: true,
  }),
);
transporter.use('compile', inlineCss());

const sendMailToSubscribers = async () => {
  const subscribers = await Subscriber.find({});
  // articles 어제 06시 이후에 크롤링 된 기사 가져오기
  const getRange = new Date().getDay() === 0 ? 2 : 1;
  const articles = await Article.find({
    article_date: {
      $gte: new Date(
        Date.now() - 1000 * 60 * 60 * 24 * getRange - 1000 * 60 * 60,
      ),
    },
  });

  articles.sort(() => Math.random() - 0.5); // 랜덤으로 정렬
  const articlesCount = articles.length;
  let usedKeyword = new Array();
  let articleList = new Array();
  let usedId = new Array();
  let count = 0;
  let idx = 0;

  const max = articlesCount > 4 ? 4 : articlesCount;
  while (articles[idx]) {
    let currentArticle = articles[idx];
    if (count === 4) break;
    // 배열 순회 하면서 alreadyKeyword 에 있는지 확인 후 있으면 안 담음
    if (usedKeyword.includes(currentArticle.article_keyword)) {
      idx++;
      continue;
    }
    articleList.push(currentArticle);
    usedKeyword.push(currentArticle.article_keyword);
    usedId.push(currentArticle.article_id);
    idx++;
    count++;
  }
  idx = 0;
  // 키워드가 4개 미만일 때 중복되는 키워드지만 다른 기사 담기
  while (count < max) {
    if (!usedId.includes(articles[idx].article_id)) {
      articleList.push(articles[idx]);
      count++;
    }
    idx++;
  }

  const contribution = await Contribution.findOneAndUpdate(
    {
      recommended: false,
      $or: [
        {
          status: 110,
        },
        {
          status: 111,
        },
        {
          status: 121,
        },
        {
          status: 122,
        },
      ],
    },
    {
      recommended: true,
      // recommended: false,
    },
    {
      sort: {
        hit: -1,
      },
    },
  );

  const date = new Date();
  date.setHours(date.getHours() + 9);
  const week = ['일', '월', '화', '수', '목', '금', '토'];
  const formatDate = `${date.getFullYear()}/${
    date.getMonth() + 1
  }/${date.getDate()} ${week[date.getDay()]}요일`;

  const contributionUserInfo = contribution
    ? await User.findOne({
        user_email: contribution.user_email,
      })
    : null;
  const contributionUserName = contributionUserInfo
    ? contributionUserInfo.user_name
    : 'anonymous';

  subscribers.map(async (subscriber, index) => {
    const userEmail = subscriber.subscriber_email;
    const user = await User.findOne({
      user_email: userEmail,
    });
    const userName = user ? `${user.user_name}님` : '여러분';

    let newsLetter;
    ejs.renderFile(
      __dirname + '/../ejsform/newsLetter.ejs',
      {
        formatDate,
        userEmail,
        userName,
        articleList,
        contribution,
        articlesCount,
        max,
        contributionUserName,
      },
      (err, data) => {
        if (err) console.log(err);
        newsLetter = data;
      },
    );

    const logDir = __dirname + '/emailLog.txt';
    if (!fs.existsSync(logDir)) {
      fs.writeFileSync(logDir, 'EMAIL LOGGER\n\n');
    }

    setTimeout(async() => {
      await transporter.sendMail(
        {
          from: 'DEVzine:port <devzineport@gmail.com>',
          to: userEmail,
          subject: `🗞${formatDate} 최신 IT 소식`,
          html: newsLetter,
        },
        (err, info) => {
          if (err) {
            // console.log(err);
            fs.appendFileSync(logDir, `${err} \nUser Email: ${userEmail}\n\n`)
          } else {
            // console.log('Email send: ' + info.response);
            // console.log('Email send: ' + userEmail);
            fs.appendFileSync(logDir, `Email sent: ${info.response} \nUser Email: ${userEmail}\n\n`)
            transporter.close();
          }
        },
      );
    }, 500 * index);
  });
};

module.exports = {
  sendMailToSubscribers,
};
