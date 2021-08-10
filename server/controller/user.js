module.exports = {

	signUp: async (req, res) => {
        
        // TODO: 사용자의 email, password를 입력 받아 유효성 검사를 하고, 회원가입 요청을 한다. 
        // req.body
        // {
        //     "user_email": "example@gmail.com",
        //     "user_password": "string",
        //     "user_name": "string",
        //     "user_info": {
        //         "user_gender": "string",
        //         "user_age": number,
        //         "user_position": "string",
        //         "user_language": [],
        //     }	
        // }
        // status: 201
        // {
        //     "message": "User created"
        // }
        // status:400
        // {
        //     "message": "Invalild email"
        // }
        // status:404
        // {
        //     "message": "Not found"
        // }
        // status:409
        // {
        // "message": "${email} already exists"
        // }
        // status:500
        // err
        
        return res.send('signUp');

	},

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
            req.session.save(function () {
                res.send('log out');
            });
            res.status(200).send({ "message": "Logout success" });
        } catch (err) {
            res.status(404).send({ "message": "Logout error" });
        }

	},

    signIn: async (req, res) => {
        
        // TODO: 사용자의 email, password를 조회해 로그인한다. 
        // req.body
        // {
        //     "user_email": "example@gmail.com",
        //     "user_password": "string",
        // }
        // status: 200
        // {
        //     "message": "Login success"
        // }
        // status:401
        // {
        //     "message": "Invalid password"
        // }
        // status:404
        // {
        //     "message": "Invalid user"
        // }
        
        res.status(200).send({"message": "Login success" });

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