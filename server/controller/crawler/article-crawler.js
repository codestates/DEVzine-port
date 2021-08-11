const { scrapeBoanNews } = require('./scrape-boannews')

module.exports = {
    getAllRecentArticles = async () => {
        
        await scrapeBoanNews()
        
    }
}