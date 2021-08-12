const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');
const ejs = require('ejs');
const { User } = require('../Models/Users');
const { VerifiedEmail } = require('../Models/Verifiedemails');
require('dotenv').config();

const CLIENT_ENDPOINT=process.env.DEVZINE_CLIENT_ENDPOINT;

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

module.exports = {
  reqUserEmail: async (req, res) => {
    const { user_email } = req.body;
    const emailRegex =
      /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (!emailRegex.test(user_email)) {
      return res.status(400).send({ message: 'Invalild email' });
    }

    const user = await User.findOne({ user_email });
    // if (user) {
    //   return res.status(400).send({ message: 'Email already exists' });
    // }

    let authMailForm;
    ejs.renderFile(
      __dirname + '/ejsform/authMail.ejs',
      { CLIENT_ENDPOINT, user_email },
      (err, data) => {
        if (err) console.log(err);
        authMailForm = data;
      }
    );

    transporter.sendMail(
      {
        from: 'DEVzine:port <devzineport@gmail.com>',
        to: user_email,
        subject: '회원가입 수락하삼[nodemailer]',
        html: authMailForm,
      },
      (err, info) => {
        if (err) {
          return res.status(404).send({ message: 'Not found' });
        } else {
          console.log('Email sent: ' + info.response);
          transporter.close();
        }
      }
    );

    return res.status(200).send({ message: 'Email sent' });
  },

  verifyUserEmail: async (req, res) => {
    const { temp_email } = req.body;

    const tempEmail = new VerifiedEmail({
      temp_email,
    });
    await tempEmail.save((err) => {
      if (err) {
        return res.status(500).send(err);
      }
      return res.status(200).send({ message: 'Verified email created' });
    });

    setTimeout(() => {
      tempEmail.remove();
    }, 30 * 60 * 1000);
  },
};
