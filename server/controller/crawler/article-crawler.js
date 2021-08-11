const { scrapeBoanNews } = require('./scrape-boannews')
const { scrapeITWorld } = require('./scrape-itworld')

module.exports = {
    getAllRecentArticles = async () => {
        
        const ITWorldCloudURL = 'https://www.itworld.co.kr/t/34/%ED%81%B4%EB%9D%BC%EC%9A%B0%EB%93%9C'
        const ITWorldPersonalComputingURL = 'https://www.itworld.co.kr/t/62074/%ED%8D%BC%EC%8A%A4%EB%84%90%20%EC%BB%B4%ED%93%A8%ED%8C%85'
        const ITWorldBigDataURL = 'https://www.itworld.co.kr/t/54649/%EB%B9%85%20%EB%8D%B0%EC%9D%B4%ED%84%B0'


        await scrapeBoanNews()
        await scrapeITWorld(ITWorldCloudURL)
        await scrapeITWorld(ITWorldPersonalComputingURL)
        await scrapeITWorld(ITWorldBigDataURL)
        
    }
}