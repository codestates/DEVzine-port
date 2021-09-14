const axios = require('axios');
const cheerio = require('cheerio');

const getArticlesFromURL = async (compareDate, requestURL) => {

  let articles = [];

  const html = await axios.get(requestURL).catch( err => '' );
  if (!html) {
    return [];
  }

  const $ = cheerio.load(html.data);
  const articleList = $('.body_left').children()[1];

  for (let i = 0; i < $(articleList).children().length; i++) {
    const curArticle = $(articleList).children()[i];
    const url = $(curArticle).find('a').attr('href');
    const title = $(curArticle).find('.news_list_title').text().trim();
    const content = $(curArticle)
      .find('.news_body_summary')
      .text()
      .trim()
      .replace(/\n/g, '');
    let keyword = $(curArticle).find('.news_list_source').text().trim();
    let date = $(curArticle).find('.news_list_time').text();
    
    if (date.includes(`${compareDate/24}일`)) {
      date = new Date(Date.now());
      date.setHours(date.getHours() + 9); // 한국 표준시간으로 변환
      date.setDate(date.getDate() - (compareDate/24));
    } else {
      continue;
    }

    if (keyword.includes('퍼스널 컴퓨팅')) {
      keyword = '퍼스널 컴퓨팅';
    } else if (keyword.includes('클라우드')) {
      keyword = '클라우드';
    } else if (keyword.includes('빅 데이터')) {
      keyword = '빅 데이터';
    } else {
      continue;
    }

    let DATA = {
      article_title: title,
      article_content: content || title,
      article_date: date,
      article_url: `https://www.itworld.co.kr${url}`,
      article_keyword: keyword,
      article_publisher: 'It World Korea',
    };

    articles.push(DATA);
  }

  return articles;

};

const scrapeITWorld = async (compareDate) => {
      
  const ITWorldCloudURL =
    'https://www.itworld.co.kr/t/34/%ED%81%B4%EB%9D%BC%EC%9A%B0%EB%93%9C';
  const ITWorldPersonalComputingURL =
    'https://www.itworld.co.kr/t/62074/%ED%8D%BC%EC%8A%A4%EB%84%90%20%EC%BB%B4%ED%93%A8%ED%8C%85';
  const ITWorldBigDataURL =
    'https://www.itworld.co.kr/t/54649/%EB%B9%85%20%EB%8D%B0%EC%9D%B4%ED%84%B0';

  const ITWorldCloud = await getArticlesFromURL(compareDate, ITWorldCloudURL);
  const ITWorldPersonalComputing = await getArticlesFromURL(
    compareDate, ITWorldPersonalComputingURL,
  );
  const ITWorldBigData = await getArticlesFromURL(compareDate, ITWorldBigDataURL);
  
  return [...ITWorldCloud, ...ITWorldPersonalComputing, ...ITWorldBigData];

}

module.exports = {
  scrapeITWorld
}
