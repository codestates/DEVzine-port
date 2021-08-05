module.exports = {

	getArticleList: async (req, res) => {
        
        // TODO: 뉴스를 최신순으로 12개 조회한다.
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
        //             "hit": number,
        //         }
        //     ],
        //     "message" : "Article list successfully found"
        // }
        // status:404
        // {
        //     "message": "Not found"
        // } 
        
        return res.send('articleList');

	}
};