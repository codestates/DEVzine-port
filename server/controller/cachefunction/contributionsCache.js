

// const updateArticleHit = async (id) => {
    
//     try {

//         Article.findOneAndUpdate({
//                 article_id: id
//             }, {
//                 $inc: {
//                     hit: 1
//                 }
//             }, (err, data) => {
//                 if (err) {
//                     throw err;
//                 }
//                 redisClient.hmset('recentArticles', id, JSON.stringify(data));
//                 return true;
//             }
//         )
        
//     } catch (err) {

//         return err;

//     }

// }
    
// module.exports = {
//     getArticlesPastTwoWeeks,
//     setNewCacheForArticles,
//     checkCacheForArticles,
//     checkCacheForOneArticle,
//     updateArticleHit
// }