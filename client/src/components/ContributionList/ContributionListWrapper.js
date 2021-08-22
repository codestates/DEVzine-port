import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ArticleView from '../../pages/ArticleView';
import { useDispatch } from 'react-redux';
import { getContributionData } from '../../_actions/article_actions';
import { filterContributionData } from '../../_actions/article_actions';
import Button from '../Common/Button/Button';
import eye from '../../assets/images/eye.svg';
import search from '../../assets/images/search.svg';

function ContributionListWrapper() {
  const dispatch = useDispatch();

  const [ContributionData, setContributionData] = useState(null);
  const [CurrentKeyword, setCurrentKeyword] = useState('');
  const [CurrentTitle, setCurrentTitle] = useState('');
  const [CurrentOrder, setCurrentOrder] = useState('최신순');
  const [ConPlus, setConPlus] = useState(12);
  const [PlaceHodler, setPlaceHolder] = useState('기사를 검색하세요.');
  const [Selected, setSelected] = useState('키워드선택');
  const [ArchiveTitle, setArchiveTitle] = useState('');

  let selectOptions = [
    '전체',
    '게임',
    '머신러닝',
    '모바일',
    '보안',
    '블록체인',
    '빅 데이터',
    '코딩',
    '클라우드',
    '퍼스널 컴퓨팅',
    'AI/로봇',
    '기타',
  ];

  useEffect(() => {
    dispatch(getContributionData())
      .then(res => setContributionData(res.payload))
      .catch(err => alert('최신순 받아오는데 실패하였습니다.'));
  }, []);

  useEffect(() => {
    let body = {
      CurrentKeyword,
      CurrentTitle: ArchiveTitle,
      CurrentOrder,
    };

    dispatch(filterContributionData(body))
      .then(res => {
        setContributionData(null);
        setContributionData(res.payload);
      })
      .catch(err => alert('검색한 결과를 받아오는데 실패하였습니다.'));
  }, [CurrentKeyword, CurrentOrder]);

  function latestBtn() {
    setCurrentOrder('최신순');
    setConPlus(12);
  }

  function viewBtn() {
    setCurrentOrder('조회순');
    setConPlus(12);
  }

  function conPlusHandler() {
    setConPlus(ConPlus + 12);
  }

  function onKeywordHandler(e) {
    setCurrentKeyword(e.currentTarget.value);
    setSelected(e.currentTarget.value);
  }

  function onTitleHandler(e) {
    setCurrentTitle(e.currentTarget.value);
  }

  function onTitleSubmit() {
    let body = {
      CurrentKeyword,
      CurrentTitle,
      CurrentOrder,
    };

    setArchiveTitle(CurrentTitle);

    dispatch(filterContributionData(body))
      .then(res => {
        setContributionData(null);

        if (CurrentTitle !== '') {
          setPlaceHolder(`'${CurrentTitle}'의 검색 결과입니다.`);
        } else {
          setPlaceHolder(`기사를 검색하세요.`);
        }

        setContributionData(res.payload);
        setCurrentTitle('');
      })
      .catch(err => alert('검색한 결과를 받아오는데 실패하였습니다.'));
  }

  function initialBtn() {
    setCurrentKeyword('');
    setCurrentTitle('');
    setArchiveTitle('');
    setCurrentOrder('최신순');
    setPlaceHolder('기사를 검색하세요.');
    setSelected('키워드선택');
    setConPlus(12);

    dispatch(getContributionData())
      .then(res => {
        setContributionData(res.payload);
      })
      .catch(err => alert('최신순 받아오는데 실패하였습니다.'));
  }

  return ContributionData ? (
    <>
      <div className="contributionlistwrapper">
        <div className="container">
          <div className="row">
            <div className="col-sm-4 col-md-12 col-lg-12">
              <div className="articlebox">
                <div className="articlebox-align">
                  <div className="prebox">
                    <Link to="/articlelist">
                      <div className="prebtn">이전으로</div>
                    </Link>
                  </div>
                  <div className="selectionbox">
                    <span>
                      <select
                        className="articlebox-select"
                        onChange={e => onKeywordHandler(e)}
                        id="articlebox-select"
                      >
                        <option value="">{Selected}</option>
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
                        className="articlebox-text"
                        placeholder={PlaceHodler}
                        onChange={e => onTitleHandler(e)}
                      />
                      <img
                        src={search}
                        alt="search btn"
                        className="articlebox-search-btn"
                        onClick={onTitleSubmit}
                      />
                    </span>
                    <span className="ordergroup">
                      <span
                        className={
                          CurrentOrder === '최신순' ? 'setbold first' : 'first'
                        }
                        onClick={latestBtn}
                      >
                        최신순
                      </span>
                      |
                      <span
                        className={
                          CurrentOrder === '조회순'
                            ? 'setbold second'
                            : 'second'
                        }
                        onClick={viewBtn}
                      >
                        조회순
                      </span>
                    </span>
                    <span onClick={initialBtn} className="initialbtn">
                      초기화
                    </span>
                  </div>
                </div>

                {ContributionData.length === 0
                  ? '소식이 없습니다.'
                  : ContributionData.map(el => {
                      return (
                        <div
                          className="articlebox-listbox"
                          key={el.article_title}
                        >
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
                {ContributionData.length <= 12 ? null : (
                  <Button
                    subject={`더보기`}
                    color={`#999999`}
                    backgroundColor={`#ffffff`}
                    border={`1px solid #d9d9d9`}
                    onClickHandle={conPlusHandler}
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

export default ContributionListWrapper;
