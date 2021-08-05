module.exports = {

	getStatisticsForVisual: async (req, res) => {
        
        // TODO: 다양한 통계 자료를 시각화한다.
        // status: 200
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
        //         "users_male" : number,
        //         "users_female" : number,
        //         "user_generation": {
        //             "users_under20": number,
        //             "users_20": number,
        //             "users_30": number,
        //             "users_40": number,
        //             "users_over50": number,
        //         },
        //         "users_top_position" : {
        //             "position": number,
        //             "position2": number,
        //             ...
        //         },
        //         "users_top_language" : {
        //             "language": number,
        //             "language2": number,
        //             ...
        //         }
        //     },
        //     "message" : "success"
        // }
        // status:404
        // {
        //     "message": "Not found"
        // }

        return res.send('visual statistics');

	}
};