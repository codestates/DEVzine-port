const redisClient = require('../config/redis')
const { getUserStats } = require('./statfunction/userStats')
const { getArticleStats } = require('./statfunction/articleStats')
const { Stat } = require('../Models/Stats')

module.exports = {

	getStatisticsForVisual: async (req, res) => {

                try {

                        let users = await getUserStats();
                        let articles = await getArticleStats();
                        
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