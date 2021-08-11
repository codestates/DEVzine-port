const bcrypt = require('bcryptjs');
const { User } = require('../Models/Users');
const { VerifiedEmail } = require('../Models/Verifiedemails');

module.exports = {

	signUp: async (req, res) => {
        const { user_email, user_password, user_name, user_info } = req.body;
        
        const emailRegex = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
        if (!emailRegex.test(user_email)) {
            return res.status(400).send({ "message": "Invalid email" });
        }
        const tempUser = await VerifiedEmail.findOne({ temp_email: user_email });
        if (!tempUser) {
            return res.status(401).send({ "message": "Email unverified" });
        }
        
        try {
            const newUser = new User({
                user_email,
                user_password,
                user_name,
                ...user_info
            });
            await newUser.save((err) => {
                if (err) {
                    return res.status(409).send({ "message": `${user_email} already exists` });
                }
            });
            res.status(201).send({ "message": "User created" });
        } catch (err) {
            res.status(500).send(err);
        }
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
            res.status(200).send({ "message": "Logout success" });
        } catch (err) {
            res.status(404).send({ "message": "Not found" });
        }

	},

    signIn: async (req, res) => {
        const { user_email } = req.body;
        // status:401
        // {
        //     "message": "Invalid password"
        // }
        // status:404
        // {
        //     "message": "Invalid user"
        // }
        // invalid user / passwd 경우 passport.js에서 처리하는데 좀 더 찾아봐야함
        res.status(200).send({ "data": { "user_name": user_email }, "message": "Login success" });

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