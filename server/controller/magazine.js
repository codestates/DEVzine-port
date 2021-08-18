const { checkCacheForArticles } = require('./cachefunction/articlesCache')

module.exports = {

	getMagazineList: async (req, res) => {

        try {

            const articleData = await checkCacheForArticles().catch((err) => {
                    return res.status(500).send(err)
                }
            )

            if (!articleData) {
                return res.status(404).json(
                    {
                        "message" : "Not found"
                    }
                )
            }
            
            return res.status(200).json(
                {
                    "articleData": articleData.data,
                    "contributionData": '',
                    "message" : "Article list successfully found",
                    "articleSource" : articleData.source,
                    "contributionSource" : ''
                }
            );

        } catch (err) {
            
            console.log(err)
            return res.status(500).send(err)

        }

        // "contributionData": [
        //     {
        //     "contribution_id": "number",
        //     "contribution_title": "string",
        //     "contribution_content": "string",
        //     "contribution_keyword": "string",
        //     "contribution_date" : "date",
        //     "hit": "number"
        // }
        // ]
    },

    getArticle: async (req, res) => {
        
        // TODO: 개별 기사 정보를 조회한다. 
        // status: 200
        // {
        //     "data": [
        //         ...
        //         {
        //             "article_id": number,
        //             "article_title": "string",
        //             "article_content": "string",
        //             "article_date": date,
        //             "article_keyword": "string",
        //             "article_url": "string",
        //             "hit": number,
        //         }
        //     ],
        //     "message" : "Article list successfully found"
        // }
        // status:404
        // {
        //     "message": "Not found"
        // }

        return res.send('article');

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
        // 	"message" : "Update request success"
        // }
        // status:404
        // {
        //     "message": "Not found"
        // }
        return res.send('contribution');
    }
};