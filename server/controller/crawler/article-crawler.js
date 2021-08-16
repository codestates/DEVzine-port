const { scrapeBoanNews } = require('./scrape-boannews')
const { scrapeITWorld } = require('./scrape-itworld')
const { scrapeCodingWorld } = require('./scrape-codingworld')

module.exports = {

    getRecentArticlesFrom24H : async (req, res) => {

        let boanNewsData = await scrapeBoanNews()
        let ITWorldData = await scrapeITWorld()
        let codingWorldData = await scrapeCodingWorld()

        let data = [ ...boanNewsData, ...ITWorldData, ...codingWorldData ]
        return data

    },

    getRecentArticlesFrom48H : async (req, res) => {

        let boanNewsData = await scrapeBoanNews(86400000*2)
        let ITWorldData = await scrapeITWorld('2일')
        let codingWorldData = await scrapeCodingWorld(86400000*2)

        let data = [ ...boanNewsData, ...ITWorldData, ...codingWorldData ]
        return data

    }
    
}