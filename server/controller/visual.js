const { Stat } = require('../Models/Stats');
const { getUserStats } = require('./statfunction/userStats');
const { getArticleStats } = require('./statfunction/articleStats');
const redisClient = require('../config/redis');

module.exports = {
  getStatisticsForVisual: async (req, res) => {
    try {
      let users = await getUserStats();
      let articles = await getArticleStats();

      if (!users || !articles) {
        return res.status(404).json({
          message: 'Not found',
        });
      }

      const data = { users, articles };

      let curDate = new Date();
      curDate.setHours(curDate.getHours() + 9);

      await Stat.create({
        stat_datetime: curDate,
        stat_content: data,
      });

      //TODO: 배포 직전에 유효시간 12시간으로 수정 (43200 초)
      redisClient.setex('visualsActivated', 10, JSON.stringify(data));
      return res.status(200).json({
        data,
        message: 'success',
        source: 'DB',
      });
    } catch (err) {
      console.log(err);
      return res.status(500).send(err);
    }
  },
};
