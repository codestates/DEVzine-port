const { get } = require('../config/redis');
const { 
    checkCacheForArticles, 
    checkCacheForOneArticle, 
    updateArticleHit, 
} = require('./cachefunction/articlesCache')
const {
    checkCacheForContributions,
    getAllConfirmedContributions
} = require('./cachefunction/contributionsCache')

module.exports = {

	getAllArticlesAndRecentContributions: async (req, res) => {

        try {

            const { articleData, articleSource } = await checkCacheForArticles()
            let{ contributionData, contributionSource } = await checkCacheForContributions()

            if (!articleData || !contributionData) {
                return res.status(404).json(
                    {
                        "message" : "Not found"
                    }
                )
            }
            
            contributionData = contributionData.slice(0,6)

            return res.status(200).json(
                {
                    articleData,
                    contributionData,
                    articleSource,
                    contributionSource,
                    "message" : "Article list successfully found",
                }
            );

        } catch (err) {
            
            console.log(err)
            return res.status(500).send(err)

        }

    },

    getAllContributions: async (req, res) => {
        
        try {

            const { contributionData, contributionSource } = await checkCacheForContributions();

            if (!contributionData) {
                return res.status(404).json(
                    {
                        "message" : "Not found"
                    }
                )
            }

            return res.status(200).json({
                data: contributionData,
                source: contributionSource,
                message: "Request success"
            });

        } catch (err) {

            console.log(err)
            return res.status(500).send(err)

        }

    },

    getArticle: async (req, res) => {
        
        try {

            const articleid = Number(req.params.articleid);

            const { data, source } = await checkCacheForOneArticle(articleid).catch((err) => {
                    return res.status(500).send(err)
                });
            

            if (!data) {
                return res.status(404).json(
                    {
                        "message" : "Not found"
                    }
                )
            }

            updateArticleHit(articleid);

            return res.status(200).json(
                {
                    data,
                    source,
                    "message" : "Article successfully found"
                }
            );

        } catch (err) {
            
            console.log(err)
            return res.status(500).send(err)

        }

	},

    getContribution: async (req, res) => {

        //TODO: 사용자가 등록한 (승인된) 기고글을 조회한다.
        // status: 200
        // {
        // 	"data" : {
        // 		"contribution_title": "string",
        // 		"contribution_content": "string",
        // 		"contribution_keyword": "string",
        // 		"contribution_date" : "date",
        // 		"hit": "number"
        // 		"user_name" : "string"
        // 	},
        // 	"message" : " request success"
        // }
        // status:404
        // {
        //     "message": "Not found"
        // }
        return res.send('contribution');
    }
};