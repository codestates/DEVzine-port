const bcrypt = require('bcryptjs');
const { User } = require('../Models/Users');
const { Contribution } = require('../Models/Contributions');
const jwt = require('jsonwebtoken');

module.exports = {
    
    getUserInfo: async (req, res) => {
        
        try {
            // TODO: Token parsing 
            // status: 401
            // {
            //     "message": "Unauthorized user"
            // }
            let tempUserID = req.user._id;
            let user = await User.findOne(
                { 
                    _id: tempUserID 
                }
            );
            if (!user) {
                return res.status(404).json(
                    {
                        "message": "Invalid user"
                    }
                );
            }

            const { 
                user_email, 
                user_password,
                user_name, 
                user_gender, 
                user_age, 
                user_position, 
                user_language, 
                subscribed, 
                contribution_id 
            } = user
            
            let contributions = await Contribution.find(
                {
                    contribution_id: {
                        $in: contribution_id
                    }
                }, {
                    contribution_id: 1,
                    contribution_title: 1,
                    contribution_url: 1,
                    status: 1,
                    _id: 0
                }
            );

            return res.status(200).json(
                {
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
                }
            )

        } catch (err) {

            console.log(err)
            return res.status(500).send(err);
            
        }

	},

    patchUserInfo: async (req, res) => {
        // TODO: token 유효성 검사 -> 401 

        const { 
            user_email, 
            user_name 
        } = req.body;

        const {
            user_gender,
            user_age,
            user_position,
            user_language 
        } = req.body.user_info;
        
        const user_password = await bcrypt.hashSync(req.body.user_password, 10);

        let subscribed;
        if (req.body.subscribed === '구독') {
            subscribed = true;
        } else {
            subscribed = false;
        }

        const update = { 
            user_password,
            user_name,
            user_gender,
            user_age,
            user_position,
            user_language,
            subscribed
        }

        try {

            let user = await User.findOneAndUpdate(
                {
                    user_email
                }, 
                update, 
                {
                    new: true
                }
                
            );

            if (!user) {
                return res.status(404).json(
                    {
                        "message": "Invalid user"
                    }
                );
            }

            return res.status(200).json(
                {
                    "data": {
                        user_name
                    },
                    "message": "Patch success"
                }
            );

        } catch (err) {

            console.log(err)
            return res.status(500).send(err);

        }

    }
};