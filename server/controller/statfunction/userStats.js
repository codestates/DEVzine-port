const { User } = require('../../Models/Users')

module.exports = {

        getUserStats: async () => {

                try {
                        
                        let users = {};

                        users.users_gender = {
                                users_male: await User.find({
                                        user_gender: "남자"
                                }).countDocuments(),
                                users_female: await User.find({
                                        user_gender: "여자"
                                }).countDocuments()
                        }

                        users.user_generation = {
                                users_under20: await User.find({
                                        user_age: "10대"
                                }).countDocuments(),
                                users_20: await User.find({
                                        user_age: "20대"
                                }).countDocuments(),
                                users_30: await User.find({
                                        user_age: "30대"
                                }).countDocuments(),
                                users_40: await User.find({
                                        user_age: "40대"
                                }).countDocuments(),
                                users_over50: await User.find({
                                        user_age: {
                                                $in: ["50대", "60대 이상"]
                                        }
                                }).countDocuments()
                        }; 

                        users.users_top_position = {};

                        let positionCount = await User.aggregate([
                                {
                                        $group: {
                                                _id: '$user_position',
                                                count: {
                                                        $sum: 1
                                                }
                                        }
                                }
                        ]).sort({
                                count: -1
                        }).limit(5);

                        positionCount.forEach(position => {
                                users.users_top_position[position._id] = position.count;
                        });

                        users.users_top_language = {};

                        let languageCount = await User.aggregate([
                                {
                                        $unwind: "$user_language"
                                },
                                {
                                        $group: {
                                                _id: '$user_language',
                                                count: {
                                                        $sum: 1
                                                }
                                        }
                                }
                        ]).sort({
                                count: -1
                        }).limit(5);
                        
                        languageCount.forEach(language => {
                                users.users_top_language[language._id] = language.count;
                        });

                        return users;

                } catch (err) {

                        console.log(err);
                        return false;

                }

        }       

}