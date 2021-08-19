import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ArticleView from '../../pages/ArticleView';
import ArticelCarousel from './ArticleCarousel';
import { customAxios } from '../../utils/customAxios';
import Button from '../Common/Button/Button';

function ArticleListWrapper() {
  const [ArticleData, setArticleData] = useState(null);
  const [ContributionData, setContributionData] = useState(null);
  const [ArticlePlus, setArticlePlus] = useState(12);

  let FakeData = [
    {
      contribution_id: 1,
      contribution_title: 'contribution_title1',
      contribution_content: 'contribution_content',
      contribution_keyword: '게임',
      contribution_date: '2021.08.16',
      hit: '1004',
    },
    {
      contribution_id: 2,
      contribution_title: 'contribution_title2',
      contribution_content: 'contribution_content',
      contribution_keyword: '게임',
      contribution_date: '2021.08.16',
      hit: '1004',
    },
    {
      contribution_id: 3,
      contribution_title: 'contribution_title3',
      contribution_content: 'contribution_content',
      contribution_keyword: '게임',
      contribution_date: '2021.08.16',
      hit: '1004',
    },
    {
      contribution_id: 4,
      contribution_title: 'contribution_title4',
      contribution_content: 'contribution_content',
      contribution_keyword: '게임',
      contribution_date: '2021.08.16',
      hit: '1004',
    },
    {
      contribution_id: 5,
      contribution_title: 'contribution_title5',
      contribution_content: 'contribution_content',
      contribution_keyword: '게임',
      contribution_date: '2021.08.16',
      hit: '1004',
    },
    {
      contribution_id: 6,
      contribution_title: 'contribution_title6',
      contribution_content: 'contribution_content',
      contribution_keyword: '게임',
      contribution_date: '2021.08.16',
      hit: '1004',
    },
    {
      contribution_id: 7,
      contribution_title: 'contribution_title7',
      contribution_content: 'contribution_content',
      contribution_keyword: '게임',
      contribution_date: '2021.08.16',
      hit: '1004',
    },
    {
      contribution_id: 8,
      contribution_title: 'contribution_title8',
      contribution_content: 'contribution_content',
      contribution_keyword: '게임',
      contribution_date: '2021.08.16',
      hit: '1004',
    },
    {
      contribution_id: 9,
      contribution_title: 'contribution_title9',
      contribution_content: 'contribution_content',
      contribution_keyword: '게임',
      contribution_date: '2021.08.16',
      hit: '1004',
    },
    {
      contribution_id: 10,
      contribution_title: 'contribution_title10',
      contribution_content: 'contribution_content',
      contribution_keyword: '게임',
      contribution_date: '2021.08.16',
      hit: '1004',
    },
    {
      contribution_id: 11,
      contribution_title: 'contribution_title11',
      contribution_content: 'contribution_content',
      contribution_keyword: '게임',
      contribution_date: '2021.08.16',
      hit: '1004',
    },
    {
      contribution_id: 12,
      contribution_title: 'contribution_title12',
      contribution_content: 'contribution_content',
      contribution_keyword: '게임',
      contribution_date: '2021.08.16',
      hit: '1004',
    },
    {
      contribution_id: 13,
      contribution_title: 'contribution_title13',
      contribution_content: 'contribution_content',
      contribution_keyword: '게임',
      contribution_date: '2021.08.16',
      hit: '1004',
    },
  ];

  useEffect(async () => {
    await customAxios
      .get('/magazine')
      .then(res => {
        console.log(res.data);
        setArticleData(res.data.articleData);
        // setArticleData(FakeData);
        // setContributionData(res.data.contributionData);
        setContributionData(FakeData);
      })
      .catch(err => {
        // setArticleData(FakeData.slice(0, 12));
        setContributionData(FakeData);

        return alert('기고, 기사글 받아오는데 실패하였습니다.');
      });
  }, [ArticlePlus]);

  function latestBtn() {
    customAxios
      .get('/magazine')
      .then(res => {
        setArticleData(res.data.ArticleeData.slice(0, 12));
        setContributionData(res.data.contributionData);
      })
      .catch(err => {
        setArticleData(null);
        setArticleData(FakeData.slice(0, 12));
        setContributionData(FakeData);

        return alert('최신순 받아오는데 실패하였습니다.');
      });
  }

  function viewBtn() {
    customAxios
      .get('/magazine')
      .then(res => {
        setArticleData(res.data.ArticleeData.slice(0, 12));
        setContributionData(res.data.contributionData);
      })
      .catch(err => {
        setArticleData(null);
        setArticleData(FakeData.slice(1, 13));
        setContributionData(FakeData);

        return alert('조회순 받아오는데 실패하였습니다.');
      });
  }

  function articlePlusHandler() {
    setArticlePlus(ArticlePlus + 12);
  }

  return ArticleData ? (
    <>
      <div className="artilistwrapper">
        <div className="container">
          <div className="row">
            <div className="col-sm-4">
              <div className="carousel">
                <h2>DEVzine이 추천하는 소식</h2>
                <span
                  onClick={() => alert('추천소식 모두 보기')}
                  className="allviewbtn"
                >
                  추천소식 모두 보기
                </span>
                <ArticelCarousel ContributionData={ContributionData} />
              </div>
            </div>
            <div className="col-sm-4 col-md-12 col-lg-12">
              <div className="articlebox">
                <div className="articlebox-align">
                  <span onClick={latestBtn}>최신순</span>|
                  <span onClick={viewBtn}>조회순</span>
                </div>

                {ArticleData.slice(0, ArticlePlus).map(el => {
                  return (
                    <div className="articlebox-listbox" key={el.article_title}>
                      <Link
                        to={`/article/art-${el.article_id}`}
                        children={<ArticleView />}
                      >
                        <ul>
                          <li className="articlebox-date">{el.article_date}</li>
                          <li className="articlebox-title">
                            {el.article_title.slice(0, 8) + '...'}
                          </li>
                          <li className="articlebox-content">
                            {el.article_content.slice(0, 8) + '...'}
                          </li>
                          <li className="articlebox-keyword">
                            {el.article_keyword}
                          </li>
                          <li className="articlebox-hit">{el.hit}</li>
                        </ul>
                      </Link>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-sm-4">
              <div className="plusbtn">
                <Button
                  subject={`더보기`}
                  color={`#999999`}
                  backgroundColor={`#ffffff`}
                  border={`1px solid #d9d9d9`}
                  onClickHandle={articlePlusHandler}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  ) : null;
}

export default ArticleListWrapper;
