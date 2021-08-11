const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');
const ejs = require('ejs');
require('dotenv').config();
const { VerifiedEmail } = require('../Models/Verifiedemails');
const { User } = require('../Models/Users');

const transporter = nodemailer.createTransport(smtpTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    auth: {
        user: process.env.NODEMAIL_EMAIL,
        pass: process.env.NODEMAIL_PWD
    }
}));

module.exports = {

    reqEmail: async (req, res) => {
        const { temp_email } = req.body;
        const emailRegex = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
        if (!emailRegex.test(temp_email)) {
            return res.status(400).send({ "message": "Invalild email" });
        }

        let authMailForm;
        ejs.renderFile('../form/authMail.ejs', { temp_email }, (err, data) => {
            if (err) console.log(err);
            authMailForm = data;
        })

        transporter.sendMail({
            from: 'DEVzine:port <devzineport@gmail.com>',
            to: temp_email,
            subject: '회원가입 수락하삼[nodemailer]',
            html: authMailForm
        }, (err, info) => {
            if (err) {
                console.log(err);
            } else {
                console.log('Email sent: ' + info.response);
                transporter.close();
            }
        });
    
        res.status(200).send({ message: 'plz accept mail' });
    },

    verifyEmail: async (req, res) => {
        const { temp_email } = req.body;

        console.log(temp_email);
        const tempEmail = new VerifiedEmail({
            temp_email
        });
        await tempEmail.save((err) => {
            if (err) {
                return res.status(500).send(err);
            }
            return res.status(200).send({ "message": "Success" });
        });

        setTimeout(() => {
            tempEmail.remove();
        }, 30 * 60 * 1000);
    },

	signUp: async (req, res) => {
        const { user_email, user_password, user_name, user_info } = req.body;
        // const user_info = JSON.parse(req.body.user_info);
        
        const emailRegex = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
        if (!emailRegex.test(user_email)) {
            return res.status(400).send({ "message": "Invalild email" });
        }

        try {
            const tempUser = await VerifiedEmail.findOne({ temp_email: user_email });
            if (!tempUser) {
                return res.status(400).send({ "message": "Not verified email" });
            }
            const newUser = new User({
                user_email,
                user_password,
                user_name,
                user_info
            });
            await newUser.save((err) => {
                if (err) {
                    return res.status(500).send(err);
                }
            });
            res.status(201).send({ "message": "User created" });
        } catch (err) {
            if (err.code === 11000) {
                return res.status(409).send({ "message": `${user_email} already exists` });
            }
        }
        return res.status(500).send(err);
    },
        // TODO: 사용자의 email, password를 입력 받아 유효성 검사를 하고, 회원가입 요청을 한다. 

        // status:404
        // {
        //     "message": "Not found"
        // }

    signOut: async (req, res) => {
        
        // TODO: 로그아웃을 하고 세션을 종료한다.
        // status:401
        // {
        //     "message": "Unauthorized user"
        // }

        try {
            req.logout();
            // 1. 로그 아웃 후 현재 세션을 삭제한 뒤 비동기 처리
            // req.session.destroy(function(err) {
            //   res.send('log out');
            // });
            // 2. 로그 아웃 후 현재 세션을 저장한 뒤 비동기 처리
            // req.session.save(function () {
            //     res.send('log out');
            // });
            res.status(200).send({ "message": "Logout success" });
        } catch (err) {
            res.status(404).send({ "message": "Logout error" });
        }

	},

    signIn: async (req, res) => {
        // status:401
        // {
        //     "message": "Invalid password"
        // }
        // status:404
        // {
        //     "message": "Invalid user"
        // }
        // invalid user / passwd 경우 passport.js에서 처리하는데 좀 더 찾아봐야함
        res.status(200).send({ "message": "Login success" });

	},

    deleteUser: async (req, res) => {
        // TODO: 사용자가 회원 탈퇴한다. 
        // status: 204
        // {
        //     "message": "User deleted"
        // }
        // status:400
        // {
        //     "message": "Invalid user"
        // }
        // status:404
        // {
        //     "message": "Not found"
        // 
        // status:500

        return res.send('delete user');
    }
};