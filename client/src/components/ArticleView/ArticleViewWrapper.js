import React, { useState, useEffect } from 'react';
import { customAxios } from '../../utils/customAxios';
import {
  contributions,
  articles,
} from '../../assets/datas/ArticleViewData/data'; //지우기
import Button from '../Common/Button/Button';
import SigninModal from '../Common/SignInModal/SignInModal';
import Auth from '../../hoc/auth';

function ArticleViewWrapper({ id }) {
  const paramsArr = id.split('-');
  const indicator = paramsArr[0];
  const pathParameter = paramsArr[1];
  const [Contribution, setContribution] = useState({});
  const [Article, setArticle] = useState({});
  const [Alldata, setAlldata] = useState(false);
  const [ModalOpen, setModalOpen] = useState(false);

  let request = Auth(true);

  useEffect(async () => {
    indicator === 'con'
      ? await setContribution(contributions)
      : await setArticle(articles); //axios연결시 지우기
    indicator === 'con'
      ? await customAxios
          .get(`/magazine/contribution/${pathParameter}`)
          .then(res => {
            console.log('contribution으로 요청', res);
            // return setContribution(res.data.data);
          })
          .catch(err => console.log(err))
      : await customAxios
          .get(`/magazine/article/${pathParameter}`)
          .then(res => {
            console.log('Article로 요청', res);
            // return setArticle(res.data.data);
          })
          .catch(err => console.log(err));
    setAlldata(true);
  }, []);
  console.log(request);
  return Alldata ? (
    <>
      <div className="articlecontainer">
        <div className="container">
          <div className="row">
            <div className="col-sm-4 col-md-12 col-lg-12">
              <div className="articleviewwrapper">
                <div className="header">
                  <div className="headerleft">
                    <span className="keyword">
                      {indicator === 'con'
                        ? Contribution.contribution_keyword
                        : Article.article_keyword}
                    </span>
                    <div className="title">
                      {indicator === 'con'
                        ? Contribution.contribution_title.slice(0, 30) + '...'
                        : Article.article_title.slice(0, 30) + '...'}
                    </div>
                    <div className="username">
                      {indicator === 'con'
                        ? Contribution.user_name
                        : Article.article_publishment}
                    </div>
                  </div>
                  <svg
                    className="hamburger"
                    onClick={() => (window.location.href = '/articlelist')}
                    width="37"
                    height="37"
                    viewBox="0 0 37 37"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M5.78125 25.4375H31.2188M5.78125 11.5625H31.2188H5.78125ZM5.78125 18.5H31.2188H5.78125Z"
                      stroke="#999999"
                      strokeWidth="2"
                      strokeMiterlimit="10"
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="datawrapper">
                    게시{' '}
                    <span className="data">
                      {indicator === 'con'
                        ? Contribution.contribution_date
                        : Article.article_date}
                    </span>
                    조회{' '}
                    <span className="data">
                      {indicator === 'con' ? Contribution.hit : Article.hit}
                    </span>
                  </div>
                </div>
                <div className="body">
                  <div className="contents">
                    {indicator === 'con'
                      ? request === 'Login need'
                        ? Contribution.contribution_content.slice(0, 200) +
                          '...'
                        : Contribution.contribution_content
                      : Article.article_content.slice(0, 200) + '...'}
                  </div>
                  {indicator === 'con' ? (
                    request === 'Login need' ? (
                      <div className="layer"></div>
                    ) : null
                  ) : (
                    <div className="layer"></div>
                  )}
                  {indicator === 'con' ? (
                    request === 'Login need' ? (
                      <Button
                        subject={'로그인/회원가입 하기'}
                        color={`#191A20`}
                        backgroundColor={`#FFDD14`}
                        onClickHandle={() => setModalOpen(true)}
                      />
                    ) : null
                  ) : (
                    <Button
                      subject={'전체 게시글 보기'}
                      color={`#191A20`}
                      backgroundColor={`#FFDD14`}
                      onClickHandle={() =>
                        (window.location.href = `${Article.article_url}`)
                      }
                    />
                  )}
                </div>
                <div className="articlecontainer-footer" />
              </div>
            </div>
          </div>
        </div>
      </div>
      {ModalOpen ? (
        <SigninModal ModalOpen={ModalOpen} setModalOpen={setModalOpen} />
      ) : null}
    </>
  ) : null;
}

export default ArticleViewWrapper;
