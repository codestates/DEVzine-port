const redisClient = require('../config/redis')
const { User } = require('../Models/Users')
const { Article } = require('../Models/Articles')
const { Stat } = require('../Models/Stats')

module.exports = {

	getStatisticsForVisual: async (req, res) => {

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

                        let articles = {};
                        
                        articles.articles_top_hit = await Article.find({},{
                                article_id: 1,
                                article_title: 1,
                                hit: 1
                        }).sort({
                                hit: -1, 
                                article_id: -1
                        }).limit(5);

                        articles.articles_per_keyword_day = {};
                        let compareDate = new Date();
                        compareDate.setHours(compareDate.getHours() + 9);
                        compareDate.setDate(compareDate.getDate() - 1);
                        let keywordCountForDay = await Article.aggregate([
                                {"$match": {
                                        "article_date": {
                                                $gt: compareDate
                                        }
                                }},
                                {
                                        $group: {
                                                _id: '$article_keyword',
                                                count: {
                                                        $sum: 1
                                                }
                                        }
                                }
                        ]).sort({
                                count: -1
                        }).limit(5);
                        keywordCountForDay.forEach(keyword => {
                                articles.articles_per_keyword_day[keyword._id] = keyword.count;
                        });

                        articles.articles_per_keyword_month = {};
                        compareDate.setDate(compareDate.getDate() - 29);
                        let keywordCountForMonth = await Article.aggregate([
                                {"$match": {
                                        "article_date": {
                                                $gt: compareDate
                                        }
                                }},
                                {
                                        $group: {
                                                _id: '$article_keyword',
                                                count: {
                                                        $sum: 1
                                                }
                                        }
                                }
                        ]).sort({
                                count: -1
                        }).limit(5);
                        keywordCountForMonth.forEach(keyword => {
                                articles.articles_per_keyword_month[keyword._id] = keyword.count;
                        });

                        const data = { users, articles };

                        let curDate = new Date();
                        curDate.setHours(curDate.getHours() + 9);

                        await Stat.create({
                                stat_datetime: curDate,
                                stat_content: data
                        });

                        redisClient.setex('visualsActivated', 10, JSON.stringify(data));
                        return res.status(200).json({data, "message": "success", "source": "DB"});
                        
                } catch (err) {
                        console.log(err);
                        return res.status(500).send(err);
                }

	}

};