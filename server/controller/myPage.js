module.exports = {

	getUserInfo: async (req, res) => {
        
        // TODO: 유저의 개인정보를 조회한다.
        // status: 200
        // { 
        //     "data" : 
        //     {
        //         "user_email": "example@gmail.com",
        //         "user_password": "string",
        //         "user_name": "string",
        //         "user_info": {
        //             "user_gender": "string",
        //             "user_age": number,
        //             "user_position": "string",
        //             "user_language": [],
        //         }	,
        //         "subscribed" : boolean
        //         "contributions" : [
        //             {
        //                 "contribution_title": "string",
        //                 "contribution_url": "string",
        //                 "status" : "string"
        //             }
        //         ]
        //     }
        //     "message" : "User data successfully found"
        // }
        // status: 401
        // {
        //     "message": "Unauthorized user"
        // }
        // status:404
        // {
        //     "message": "Invalid user"
        // }
        // status: 500
        // err

        
        return res.send('myPage get');

	},

    patchUserInfo: async (req, res) => {

        // TODO: 유저의 개인정보를 수정한다. 
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
        //     }	,
        //     "subscribed" : boolean
        // }
        // status:200
        // {
        //     "message": "Unauthorized user"
        // }
        // status:401
        // {
        //     "message": "Unauthorized user"
        // }
        // status:404
        // {
        //     "message": "Invalid user"
        // }
        // status:500
        // err
        
        return res.send('myPage patch');

    }
};