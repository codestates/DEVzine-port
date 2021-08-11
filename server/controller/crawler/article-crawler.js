const { scrapeBoanNews } = require('./scrape-boannews')
const { scrapeITWorld } = require('./scrape-itworld')
const { scrapeCodingWorld } = require('./scrape-codingworld')

module.exports = {

    getAllRecentArticles : async (req, res) => {

        let boanNewsData= await scrapeBoanNews()
        let ITWorldData = await scrapeITWorld()
        let codingWorldData = await scrapeCodingWorld()

        let data = [ ...boanNewsData, ...ITWorldData, ...codingWorldData ]

        return res.json({"count": data.length, "data": data});

    }
    
}