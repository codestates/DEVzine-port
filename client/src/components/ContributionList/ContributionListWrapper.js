import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ArticleView from '../../pages/ArticleView';
import { useDispatch } from 'react-redux';
import { getContributionData } from '../../_actions/article_actions';
import { getContributionHitData } from '../../_actions/article_actions';
import Button from '../Common/Button/Button';
import eye from '../../assets/images/eye.svg';

function ContributionListWrapper() {
  const dispatch = useDispatch();

  const [ContributionData, setContributionData] = useState(null);
  const [ConPlus, setConPlus] = useState(12);
  const [OrderStatus, setOrderStatus] = useState('최신순');

  useEffect(() => {
    if (OrderStatus === '최신순') {
      dispatch(getContributionData())
        .then(res => setContributionData(res.payload))
        .catch(err => alert('최신순 받아오는데 실패하였습니다.'));
    }

    if (OrderStatus === '조회순') {
      dispatch(getContributionHitData())
        .then(res => setContributionData(res.payload))
        .catch(err => alert('조회순 받아오는데 실패하였습니다.'));
    }
  }, [ConPlus, OrderStatus]);

  function latestBtn() {
    setOrderStatus('최신순');
    setConPlus(12);
  }

  function viewBtn() {
    setOrderStatus('조회순');
    setConPlus(12);
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
                  <Link to="/articlelist">
                    <span className="prebtn">이전으로</span>
                  </Link>
                </div>

                {ContributionData.map(el => {
                  return (
                    <div className="articlebox-listbox" key={el.article_title}>
                      <Link
                        to={`/article/con-${el.contribution_id}`}
                        children={<ArticleView />}
                      >
                        <ul>
                          <li className="articlebox-date ">
                            {el.contribution_date
                              .split('T')[0]
                              .replace(/-/gi, '.')}
                          </li>
                          <li className="articlebox-title ell-24 sm-hidden">
                            {el.contribution_title}
                          </li>
                          <li className="articlebox-title ell-18 sm-only">
                            {el.contribution_title}
                          </li>
                          <li className="articlebox-content ell-12 ">
                            {el.contribution_content}
                          </li>
                          <li>
                            <span className="articlebox-keyword">
                              {el.contribution_keyword}
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
