const axios = require('axios');
const cheerio = require('cheerio');

module.exports = {

    scrapeITWorld : async () => {
        
        let articles = [];
        const html = await axios.get(url);
        const $ = cheerio.load(html.data);
        const articleList = $('.body_left').children()[1];

        for (let i=0; i<$(articleList).children().length; i++){
            const curArticle = $(articleList).children()[i];
            const url = $(curArticle).find('a').attr('href');
            const title = $(curArticle).find('.news_list_title').text().trim();
            const content = $(curArticle).find('.news_body_summary').text().trim().replace(/\n/g, '');
            let keyword = $(curArticle).find('.news_list_source').text().trim();
            let date = $(curArticle).find('.news_list_time').text();

            if (date.includes('1일')) {
                date = new Date(Date.now());
                date.setHours(date.getHours() + 9); // 한국 표준시간으로 변환
                date.setDate(date.getDate() - 1);
            } else {
                continue;
            }

            if (keyword.includes('퍼스널 컴퓨팅')) {
                keyword = '퍼스널 컴퓨팅'
            } else if (keyword.includes('클라우드')) {
                keyword = '클라우드'
            } else if (keyword.includes('빅 데이터')) {
                keyword = '빅 데이터'
            } else {
                continue;
            }

            let DATA = {
                "article_title": title,
                "article_content": content,
                "article_date": date,
                "article_url": 'https://www.itworld.co.kr/' + url, 
                "article_keyword": keyword,
                "article_publisher": "It World Korea"
            }
            
            articles.push(DATA); 

        }

        return articles;
        
    }
    
}