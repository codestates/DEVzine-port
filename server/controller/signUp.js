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

	}
};