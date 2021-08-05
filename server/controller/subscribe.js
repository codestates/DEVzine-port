module.exports = {

	addSubscriber: async (req, res) => {
        
        // TODO: 새로운 구독자를 추가하며, 사용자의 구독 정보를 수정한다.
        // req.body
        // { 
        //     "user_email": "example@gmail.com",
        // }
        // status: 200
        // {
        //     "message" : "Subscription success"
        // }
        // status: 400
        // {
        //     "message" : "User already subscribed"
        // }
        // status:404
        // {
        //     "message": "Not found"
        // }

        return res.send('subscribed');

	}
};