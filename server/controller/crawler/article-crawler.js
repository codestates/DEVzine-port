const { scrapeBoanNews } = require('./scrape-boannews');
const { scrapeITWorld } = require('./scrape-itworld');
const { scrapeCodingWorld } = require('./scrape-codingworld');

module.exports = {
  getRecentArticlesFromHours: async (hours) => {
    // hours = 24 or 48 
    let boanNewsData = await scrapeBoanNews(1000 * 60 * 60 * hours);
    let ITWorldData = await scrapeITWorld(hours);
    let codingWorldData = await scrapeCodingWorld(1000 * 60 * 60 * hours);

    let data = [...boanNewsData, ...ITWorldData, ...codingWorldData];

    return data;
  }
};
