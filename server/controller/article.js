module.exports = {

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

	}
};