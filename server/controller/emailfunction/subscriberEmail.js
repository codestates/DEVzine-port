const { Contribution } = require('../../Models/Contributions');
const { Subscriber } = require('../../Models/Subscribers');
const { Article } = require('../../Models/Articles');
const { User } = require('../../Models/Users');
const smtpTransport = require('nodemailer-smtp-transport');
const nodemailer = require('nodemailer');
const inlineCss = require('nodemailer-juice');
const ejs = require('ejs');
require('dotenv').config();

const transporter = nodemailer.createTransport(
  smtpTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    auth: {
      user: process.env.NODEMAIL_EMAIL,
      pass: process.env.NODEMAIL_PWD,
    },
  })
);
transporter.use('compile', inlineCss());

// const contribution = await Contribution.findOneAndUpdate(
//   {
//     recommended: false,
//   },
//   {
//     recommended: true,
//   },
//   {
//     sort: {
//       hit: -1,
//     },
//   }
// );

// console.log('////////');
// console.log(formatDate);
// console.log(userEmail);
// console.log(userName);
// console.log(articleList);
// console.log(max);
// console.log(contribution);
// console.log(contributionContent);
// console.log('////////');
  
const sendMailToSubscribers = async () => {

  const subscribers = await Subscriber.find({});

  // articles 어제 06시 이후에 크롤링 된 기사 가져오기
  const getRange = new Date().getDay() === 0 ? 4 : 3;
  const articles = await Article.find({
    article_date: {
      $gte: new Date(
        Date.now() - 1000 * 60 * 60 * 24 * getRange - 1000 * 60 * 60
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

  const contribution = await Contribution.findOne(
    {
      recommended: false,
    },
    [],
    {
      sort: {
        hit: -1,
      },
    }
  );

  subscribers.map(async (subscriber) => {
    const userEmail = subscriber.subscriber_email;
    let user = await User.findOne({
      user_email: userEmail,
    });
    const userName = user ? user.user_name + '님' : '여러분';
    let date = new Date();
    const week = ['일', '월', '화', '수', '목', '금', '토'];
    let formatDate = `${date.getFullYear()}/${
      date.getMonth() + 1
    }/${date.getDate()} ${week[date.getDay()]}요일`;
    const contributionContent =
      contribution.contribution_content.substr(0, 150) + '...';
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
        contributionContent,
      },
      (err, data) => {
        if (err) console.log(err);
        newsLetter = data;
      }
    );

    await transporter.sendMail(
      {
        from: 'DEVzine:port <devzineport@gmail.com>',
        // to: 'idhyo0o@naver.com', // dummy email
        to: 'haeun.yah@gmail.com',
        // to: userEmail,
        subject: 'DEVzine:port 에서 발송된 뉴스레터',
        html: newsLetter,
      },
      (err, info) => {
        if (err) {
          console.log(err);
        } else {
          console.log('Email send: ' + info.response);
          transporter.close();
        }
      }
    );
  });
};

module.exports = {
  sendMailToSubscribers,
};

