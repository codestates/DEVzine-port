const redisClient = require('../config/redis')
const { User } = require('../Models/Users')

module.exports = {

	getStatisticsForVisual: async (req, res) => {

                try {
                        let users = {};

                        users.users_gender = {
                                users_male: await User.find({user_gender: "남자"}).countDocuments(),
                                users_female: await User.find({user_gender: "여자"}).countDocuments()
                        }

                        users.user_generation = {
                                users_under20: await User.find({user_age: "10대"}).countDocuments(),
                                users_20: await User.find({user_age: "20대"}).countDocuments(),
                                users_30: await User.find({user_age: "30대"}).countDocuments(),
                                users_40: await User.find({user_age: "40대"}).countDocuments(),
                                users_over50: await User.find({user_age: {$in: ["50대", "60대 이상"]}}).countDocuments()
                        }; 

                        users.users_top_position = {};
                        let positionCount = await User.aggregate([
                                {
                                        $group: {
                                                _id: '$user_position',
                                                count: {$sum: 1}
                                        }
                                }
                        ]).sort({count: -1}).limit(5);
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
                                                count: {$sum: 1}
                                        }
                                }
                        ]).sort({count: -1}).limit(5);
                        languageCount.forEach(language => {
                                users.users_top_language[language._id] = language.count;
                        });

                        let articles = {};

                        const data = { users, articles };
                        redisClient.setex('visualsActivated', 10, JSON.stringify(data));
                        return res.status(200).json({data, "message": "success", "source": "DB"});
                        // if (!maleCount) { // 어딘가에 사용될 404
                        //         return res.status(404).json({"message": "Not found"});
                        // }
                } catch (err) {
                        console.log(err);
                        return res.status(500).send(err);
                }
        // TODO: 08.12 Users 작업 완료 -> Articles 통계 작업 필요 (FE 측에서 visuals 부분 확인 후 시작)
        // {
        //     "data" : {
        //         "articles_top_hit" : [
        //             { "article_id": number,
        //                 "article_title": string,
        //                 "hit": number
        //             },
        //             ...
        //         ],
        //         "article_per_keyword_month" : {
        //             "keyword": number,
        //             "keyword2" : number,
        //         },
        //         "article_per_keyword_day" : {
        //             "keyword": number,
        //             "keyword2" : number,
        //         },
        // + 완료된 통계 DB 에 저장 
	}
};