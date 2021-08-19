import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ArticleView from '../../pages/ArticleView';
import { customAxios } from '../../utils/customAxios';
import Button from '../Common/Button/Button';
import eye from '../../assets/images/eye.svg';

function ContributionListWrapper() {
  const [ContributionData, setContributionData] = useState(null);
  const [ConPlus, setConPlus] = useState(12);

  useEffect(async () => {
    await customAxios
      .get('/magazine')
      .then(res => {
        console.log(res.data);
        setContributionData(res.data.articleData);
      })
      .catch(err => {
        alert('추천글 받아오는데 실패하였습니다.');
      });
  }, [ConPlus]);

  function latestBtn() {
    customAxios
      .get('/magazine')
      .then(res => {
        setContributionData(res.data.articleData.slice(0, 12));
      })
      .catch(err => {
        alert('최신순 받아오는데 실패하였습니다.');
      });
  }

  function viewBtn() {
    customAxios
      .get('/magazine')
      .then(res => {
        setContributionData(res.data.articleData.slice(0, 12));
      })
      .catch(err => {
        alert('조회순 받아오는데 실패하였습니다.');
      });
  }

  function ConPlusHandler() {
    setConPlus(ConPlus + 12);
  }

  return ContributionData ? (
    <>
      <div className="contributionlistwrapper">
        <div className="container">
          <div className="row">
            <div className="col-sm-4 col-md-12 col-lg-12">
              <div className="articlebox">
                <div className="articlebox-align">
                  <span onClick={latestBtn}>최신순</span>|
                  <span onClick={viewBtn}>조회순</span>
                  <Link to="/articlelist">
                    <span className="prebtn">이전으로</span>
                  </Link>
                </div>

                {ContributionData.slice(0, ConPlus).map(el => {
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
                  onClickHandle={ConPlusHandler}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  ) : null;
}

export default ContributionListWrapper;
