const axios = require('axios');
const cheerio = require('cheerio');
const iconv = require('iconv-lite');
iconv.skipDecodeWarning = true;

const parseDate = date => {
  // 입력 형식: 2021년 08월 10일 12:23
  const year = date.substring(0, 4);
  const month = date.substring(6, 8);
  const day = date.substring(10, 12);
  const hour = date.substring(14, 16);
  const minute = date.substring(17, 19);
  return new Date(year, month - 1, day, hour, minute); // 기사 게시일자
};

const getArticlesFromURL = async (compareDate, requestURL) => {

  let articles = [];

  const html = await axios.get(requestURL, {
    responseEncoding: 'binary',
  }).catch(err => '');

  if(!html) {
    return [];
  }
  
  const htmlData = iconv.decode(html.data, 'euc-kr').toString();
  const $ = cheerio.load(htmlData);

  for (let i = 0; i <= 5; i++) {
    const article = $('.news_list')[i];
    const url = $(article).find('a').attr('href');
    const title = $(article).find('.news_txt').text();
    const content = $(article).find('.news_content').text();
    let date = $(article).find('.news_writer').text();
    date = parseDate(date.split('| ')[1]); // Date 객체로 변환

    let curDate = new Date(Date.now());
    curDate.setHours(curDate.getHours() + 9); // 한국 시간으로 변환

    if (curDate - date > compareDate) {
      // 1일 or 2일 이상 차이날 경우, skip
      continue;
    }

    let DATA = {
      article_title: title,
      article_content: content || title,
      article_date: date,
      article_url: `https://www.boannews.com${url}`,
      article_keyword: '보안',
      article_publisher: '보안뉴스',
    };

    articles.push(DATA);
  }

  return articles;

};

const scrapeBoanNews = async (compareDate) => {

  const data = await getArticlesFromURL(compareDate, 'https://www.boannews.com/media/t_list.asp')
  return data;

}

module.exports = {
  scrapeBoanNews
}

