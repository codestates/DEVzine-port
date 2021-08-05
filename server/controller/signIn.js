module.exports = {

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
        
        return res.send('signIn');

	}
};