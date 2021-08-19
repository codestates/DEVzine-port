import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getArticleData } from '../../_actions/article_actions';
import { getArticleHitData } from '../../_actions/article_actions';
import ArticleView from '../../pages/ArticleView';
import ArticelCarousel from './ArticleCarousel';
import Button from '../Common/Button/Button';
import eye from '../../assets/images/eye.svg';

function ArticleListWrapper() {
  const dispatch = useDispatch();

  const [ArticleData, setArticleData] = useState(null);
  const [ContributionData, setContributionData] = useState(null);
  const [ArticlePlus, setArticlePlus] = useState(12);
  const [OrderStatus, setOrderStatus] = useState('최신순');

  useEffect(() => {
    if (OrderStatus === '최신순') {
      dispatch(getArticleData)
        .then(res => {
          console.log(res.payload[0]);
          setArticleData(res.payload[0]);
          setContributionData(res.payload[1]);
        })
        .catch(err => alert('최신순 받아오는데 실패하였습니다.'));
    }

    if (OrderStatus === '조회순') {
      dispatch(getArticleHitData)
        .then(res => setArticleData(res.payload))
        .catch(err => alert('조회순 받아오는데 실패하였습니다.'));
    }
  }, [ArticlePlus, OrderStatus]);

  function latestBtn() {
    setOrderStatus('최신순');
    setArticlePlus(12);
  }

  function viewBtn() {
    setOrderStatus('조회순');
    setArticlePlus(12);
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
                <Link to="/contributionlist">
                  <span className="allviewbtn">모두 보기</span>
                </Link>
                <ArticelCarousel ContributionData={ContributionData} />
              </div>
            </div>
            <div className="col-sm-4 col-md-12 col-lg-12">
              <div className="articlebox">
                <div className="articlebox-align">
                  <span
                    className={OrderStatus === '최신순' ? 'setbold' : null}
                    onClick={latestBtn}
                  >
                    최신순
                  </span>
                  |
                  <span
                    className={OrderStatus === '조회순' ? 'setbold' : null}
                    onClick={viewBtn}
                  >
                    조회순
                  </span>
                </div>

                {ArticleData.slice(0, ArticlePlus).map(el => {
                  return (
                    <div className="articlebox-listbox" key={el.article_title}>
                      <Link
                        to={`/article/art-${el.article_id}`}
                        children={<ArticleView />}
                      >
                        <ul>
                          <li className="articlebox-date ">
                            {el.article_date.split('T')[0].replace(/-/gi, '.')}
                          </li>
                          <li className="articlebox-title ell-24 sm-hidden">
                            {el.article_title}
                          </li>
                          <li className="articlebox-title ell-18 sm-only">
                            {el.article_title}
                          </li>
                          <li className="articlebox-content ell-12 ">
                            {el.article_content}
                          </li>
                          <li>
                            <span className="articlebox-keyword">
                              {el.article_keyword}
                            </span>
                            <span className="articlebox-hit">
                              <img src={eye} alt="view number" />
                              <span>{el.hit}</span>
                            </span>
                          </li>
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
