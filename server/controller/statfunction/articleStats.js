const { Article } = require('../../Models/Articles')

module.exports = {

        getArticleStats: async () => {

                try {

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

                        let compareDate = new Date(Date.now());
                        compareDate.setHours(compareDate.getHours() + 9);
                        compareDate.setDate(compareDate.getDate() - 1);

                        let keywordCountForDay = await Article.aggregate([
                                {
                                        $match: {
                                                article_date: {
                                                        $gt: compareDate
                                                }
                                        }
                                },
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
                                {
                                        $match: {
                                                article_date: {
                                                        $gt: compareDate
                                                }
                                        }
                                },
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

                        return articles;
                        
                } catch (err) {

                        console.log(err);
                        return false;
                        
                }

        }

}