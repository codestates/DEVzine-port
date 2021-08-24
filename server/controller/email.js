const { User } = require('../Models/Users');
const { VerifiedEmail } = require('../Models/Verifiedemails');
const smtpTransport = require('nodemailer-smtp-transport');
const nodemailer = require('nodemailer');
const ejs = require('ejs');
const CryptoJS = require('crypto-js');
require('dotenv').config();

const CLIENT_ENDPOINT = process.env.DEVZINE_CLIENT_ENDPOINT;
const cryptoKey = '111';
// const cryptoKey = process.env.CRYPTO_KEY;

const transporter = nodemailer.createTransport(
  smtpTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    auth: {
      user: process.env.NODEMAIL_EMAIL,
      pass: process.env.NODEMAIL_PWD,
    },
  }),
);

module.exports = {
  reqUserEmail: async (req, res) => {
    const { user_email } = req.body;
    const emailRegex =
      /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (!emailRegex.test(user_email)) {
      return res.status(400).send({ message: 'Invalid email' });
    }

    const user = await User.findOne({ user_email });
    if (user) {
      return res.status(400).send({ message: 'Email already exists' });
    }

    let data = {
      email: user_email,
    };
    let encryptEmail = CryptoJS.AES.encrypt(
      JSON.stringify(data),
      cryptoKey,
    ).toString();
    console.log('Encrypt : ', encryptEmail);

    let authMailForm;
    ejs.renderFile(
      __dirname + '/ejsform/authMail.ejs',
      { CLIENT_ENDPOINT, user_email, encryptEmail },
      (err, data) => {
        if (err) console.log(err);
        authMailForm = data;
      },
    );

    transporter.sendMail(
      {
        from: 'DEVzine:port <devzineport@gmail.com>',
        to: user_email,
        subject: 'DEVzine 이메일 확인을 위한 메일입니다.',
        html: authMailForm,
      },
      (err, info) => {
        if (err) {
          return res.status(404).send({ message: 'Not found' });
        } else {
          console.log('Email sent: ' + info.response);
          transporter.close();
        }
      },
    );

    return res.status(200).send({ message: 'Email sent' });
  },

  verifyUserEmail: async (req, res) => {
    const { temp_email } = req.body;

    let bytes = CryptoJS.AES.decrypt(temp_email, cryptoKey);
    let decryptEmail = JSON.parse(bytes.toString(CryptoJS.enc.Utf8)).email;
    console.log('Decrypt : ', decryptEmail);

    const tempEmail = new VerifiedEmail({
      temp_email: decryptEmail,
    });
    await tempEmail.save(err => {
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
