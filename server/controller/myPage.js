const { User } = require('../Models/Users')
const { Contribution } = require('../Models/Contributions')

module.exports = {
    
    getUserInfo: async (req, res) => {
        
        try {
            
            // TODO: Token parsing 
            // status: 401
            // {
            //     "message": "Unauthorized user"
            // }
            let tempUserID = '6113dc06a10fa04bd6b1fdec';
            let user = await User.findOne({ 
                _id: tempUserID 
            });

            if (!user) {
                return res.status(404).json({"message": "Invalid user"});
            }

            const { user_email, 
                user_password,
                user_name, 
                user_gender, 
                user_age, 
                user_position, 
                user_language, 
                subscribed, 
                contribution_id } = user
            
            let contributions = await Contribution.find({
                contribution_id: {
                    $in: contribution_id
                }
            }, {
                contribution_id: 1,
                contribution_title: 1,
                contribution_url: 1,
                status: 1,
                _id: 0
            });

            return res.status(200).json({
                "data": {
                    "user": {
                        user_email,
                        user_password,
                        user_name,
                        "user_info": {
                            user_gender,
                            user_age,
                            user_position,
                            user_language
                        },
                        subscribed
                    },
                    contributions
                },
                "message": "User data successfully found"
            })

        } catch (err) {
            console.log(err)
            return res.status(500).send(err);
        }

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