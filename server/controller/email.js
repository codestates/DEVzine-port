module.exports = {

	verifyUserEmail: async (req, res) => {
        
        // TODO: 회원가입 시 유저가 이메일 인증 버튼을 누르면 인증 메일을 보낸다.
        // body parameters
        // 회원가입 시 유저가 이메일 인증 버튼을 누르면 인증 메일을 보낸다.
        // status: 200
        // {
        //     "message": "Email sent"
        // }
        // status: 404
        // {
        //     "message": "Not Found"
        // } 
        

        return res.send('email sent');

	}
};