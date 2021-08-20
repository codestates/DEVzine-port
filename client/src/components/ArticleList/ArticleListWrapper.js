import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getArticleData } from '../../_actions/article_actions';
import { getArticleHitData } from '../../_actions/article_actions';
import { filterArticleData } from '../../_actions/article_actions';
import ArticleView from '../../pages/ArticleView';
import ArticelCarousel from './ArticleCarousel';
import Button from '../Common/Button/Button';
import eye from '../../assets/images/eye.svg';

function ArticleListWrapper() {
  const dispatch = useDispatch();

  const [ArticleData, setArticleData] = useState(null);
  const [ContributionData, setContributionData] = useState(null);
  const [CurrentKeyword, setCurrentKeyword] = useState('');
  const [CurrentTitle, setCurrentTitle] = useState('');
  const [CurrentOrder, setCurrentOrder] = useState('최신순');
  const [ArticlePlus, setArticlePlus] = useState(12);

  // let selectOptions = [
  //   ['전체', 'All'],
  //   ['게임', '게임'],
  //   ['머신러닝', '머신러닝'],
  //   ['모바일', '모바일'],
  //   ['보안', '보안'],
  //   ['블록체인', '블록체인'],
  //   ['빅데이터', '빅데이터'],
  //   ['코딩', '코딩'],
  //   ['클라우드', '클라우드'],
  //   ['퍼스널 컴퓨팅', '퍼스널 컴퓨팅'],
  //   ['AI/로봇', 'AI/로봇'],
  //   ['기타', '기타'],
  // ];

  let selectOptions = [
    '전체',
    '게임',
    '머신러닝',
    '모바일',
    '보안',
    '블록체인',
    '빅데이터',
    '코딩',
    '클라우드',
    '퍼스널 컴퓨팅',
    'AI/로봇',
    '기타',
  ];

  useEffect(() => {
    dispatch(getArticleData())
      .then(res => {
        console.log(res.payload[0]);
        setArticleData(res.payload[0]);
        setContributionData(res.payload[1]);
      })
      .catch(err => alert('최신순 받아오는데 실패하였습니다.'));
  }, []);

  useEffect(() => {
    let body = {
      CurrentKeyword,
      CurrentTitle,
      CurrentOrder,
    };

    dispatch(filterArticleData(body))
      .then(res => {
        console.log(res.payload);
        setArticleData(null);
        setArticleData(res.payload);
      })
      .catch(err => alert('검색한 결과를 받아오는데 실패하였습니다.'));
  }, [CurrentKeyword, CurrentTitle, CurrentOrder]);

  function latestBtn() {
    setCurrentOrder('최신순');
    setArticlePlus(12);
  }

  function viewBtn() {
    setCurrentOrder('조회순');
    setArticlePlus(12);
  }

  function articlePlusHandler() {
    setArticlePlus(ArticlePlus + 12);
  }

  function onKeywordHandler(e) {
    setCurrentKeyword(e.currentTarget.value);
  }

  function onTitleHandler(e) {
    setCurrentTitle(e.currentTarget.valu);
  }

  function initialBtn() {
    dispatch(getArticleData())
      .then(res => {
        console.log(res.payload[0]);
        setArticleData(res.payload[0]);
        setContributionData(res.payload[1]);
        setArticlePlus(12);
      })
      .catch(err => alert('최신순 받아오는데 실패하였습니다.'));
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
                  <span>
                    <select
                      className="articlebox-select"
                      onChange={e => onKeywordHandler(e)}
                      id="articlebox-select"
                    >
                      <option value="">키워드선택</option>
                      {selectOptions.map((el, idx) => (
                        <option key={idx} value={el}>
                          {el}
                        </option>
                      ))}
                    </select>
                  </span>
                  <span>
                    <input
                      type="text"
                      className="request-text"
                      placeholder="기사를 검색하세요."
                      onChange={e => onTitleHandler(e)}
                    />
                  </span>
                  <span
                    className={CurrentOrder === '최신순' ? 'setbold' : null}
                    onClick={latestBtn}
                  >
                    최신순
                  </span>
                  |
                  <span
                    className={CurrentOrder === '조회순' ? 'setbold' : null}
                    onClick={viewBtn}
                  >
                    조회순
                  </span>
                  <span onClick={initialBtn}>초기화</span>
                </div>

                {ArticleData.length === 0
                  ? '소식이 없습니다.'
                  : ArticleData.slice(0, ArticlePlus).map(el => {
                      return (
                        <div
                          className="articlebox-listbox"
                          key={el.article_title}
                        >
                          <Link
                            to={`/article/art-${el.article_id}`}
                            children={<ArticleView />}
                          >
                            <ul>
                              <li className="articlebox-date ">
                                {el.article_date
                                  .split('T')[0]
                                  .replace(/-/gi, '.')}
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
                {ArticleData.length <= 12 ? null : (
                  <Button
                    subject={`더보기`}
                    color={`#999999`}
                    backgroundColor={`#ffffff`}
                    border={`1px solid #d9d9d9`}
                    onClickHandle={articlePlusHandler}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  ) : null;
}

export default ArticleListWrapper;
