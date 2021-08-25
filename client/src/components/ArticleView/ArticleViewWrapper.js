import React, { useState, useEffect } from 'react';
import { customAxios } from '../../utils/customAxios';
import Button from '../Common/Button/Button';
import SigninModal from '../Common/SignInModal/SignInModal';
import Auth from '../../hoc/auth';

function ArticleViewWrapper({ id }) {
  const paramsArr = id.split('-');
  const indicator = paramsArr[0]; // /article/art
  const pathParameter = paramsArr[1]; // number
  const [Contribution, setContribution] = useState({});
  const [Article, setArticle] = useState({});
  const [Alldata, setAlldata] = useState(false);
  const [ModalOpen, setModalOpen] = useState(false);

  const Request = Auth(true);

  useEffect(async () => {
    if (indicator === 'pre') {
      await customAxios
        .get(`/admin/contribution/preview/${pathParameter}`)
        .then(res => {
          return setContribution(res.data.data);
        })
        .catch(err => {
          window.location.href = '/error';
        });
    } else if (indicator === 'con') {
      await customAxios
        .get(`/magazine/contribution/${pathParameter}`)
        .then(res => {
          return setContribution(res.data.data);
        })
        .catch(err => {
          window.location.href = '/error';
        });
    } else {
      await customAxios
        .get(`/magazine/article/${pathParameter}`)
        .then(res => {
          return setArticle(res.data.data);
        })
        .catch(err => {
          window.location.href = '/error';
        });
    }

    setAlldata(true);
  }, []);

  return Alldata ? (
    <>
      <div className="articlecontainer">
        <div className="container">
          <div className="row">
            <div className="col-sm-4 col-md-12 col-lg-12">
              <div className="articleviewwrapper">
                <div className="header">
                  <div className="headerleft">
                    <span className="keyword stopdragging">
                      {indicator === 'con' || indicator === 'pre'
                        ? Contribution.contribution_keyword
                        : Article.article_keyword}
                    </span>
                    <div className="title">
                      {indicator === 'con' || indicator === 'pre'
                        ? Contribution.contribution_title
                        : Article.article_title}
                    </div>
                    <div className="username">
                      {indicator === 'con' || indicator === 'pre'
                        ? Contribution.user_name
                        : Article.article_publisher}

                      <span className="datawrapper sm-hidden">
                        게시{' '}
                        <span className="data">
                          {indicator === 'con' || indicator === 'pre'
                            ? Contribution.contribution_date.slice(0, 10)
                            : Article.article_date.slice(0, 10)}
                        </span>
                        조회{' '}
                        <span className="data">
                          {indicator === 'con' || indicator === 'pre'
                            ? Contribution.hit
                            : Article.hit}
                        </span>
                      </span>

                      <div className="datawrapper sm-only">
                        게시{' '}
                        <span className="data">
                          {indicator === 'con' || indicator === 'pre'
                            ? Contribution.contribution_date.slice(0, 10)
                            : Article.article_date.slice(0, 10)}
                        </span>
                        조회{' '}
                        <span className="data">
                          {indicator === 'con' || indicator === 'pre'
                            ? Contribution.hit
                            : Article.hit}
                        </span>
                      </div>
                    </div>
                  </div>
                  <svg
                    className="backbtn"
                    onClick={() => window.history.back()}
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7.79313 10.5L5.3125 8L7.79313 5.5M5.65719 8H10.6875"
                      stroke="#b2b3b9"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M14 8C14 4.6875 11.3125 2 8 2C4.6875 2 2 4.6875 2 8C2 11.3125 4.6875 14 8 14C11.3125 14 14 11.3125 14 8Z"
                      stroke="#b2b3b9"
                      strokeMiterlimit="10"
                    />
                  </svg>

                  {/* <div className="datawrapper">
                    게시{' '}
                    <span className="data">
                      {indicator === 'con' || indicator === 'pre'
                        ? Contribution.contribution_date.slice(0, 10)
                        : Article.article_date.slice(0, 10)}
                    </span>
                    조회{' '}
                    <span className="data">
                      {indicator === 'con' || indicator === 'pre'
                        ? Contribution.hit
                        : Article.hit}
                    </span>
                  </div> */}
                </div>
                <div className="body">
                  <div className="contents">
                    {indicator === 'con' || indicator === 'pre'
                      ? Request === 'Login need'
                        ? Contribution.contribution_content
                            .slice(0, 300)
                            .split(/\.\s|\✨/)
                            .map(line => (
                              <div key={line} className="line-spacing">
                                {line}.<br />
                              </div>
                            ))
                        : Contribution.contribution_content
                            .split(/!|\.\s|\✨/)
                            .map(line => (
                              <div key={line} className="line-spacing">
                                {line}.<br />
                              </div>
                            ))
                      : Article.article_content.split(/!|\.\s/).map(line => (
                          <div key={line} className="line-spacing">
                            {line}.
                          </div>
                        ))}
                  </div>
                  {indicator === 'con' || indicator === 'pre' ? (
                    Request === 'Login need' ? (
                      <div className="layer"></div>
                    ) : null
                  ) : indicator === 'art' ? (
                    <div className="layer"></div>
                  ) : null}
                  {indicator === 'con' || indicator === 'pre' ? (
                    Request === 'Login need' ? (
                      <>
                        <div className="invitation">
                          로그인을 하면 내용을
                          <br /> 이어 볼 수 있습니다.
                        </div>
                        <Button
                          subject={'로그인/회원가입 하기'}
                          color={`#191A20`}
                          backgroundColor={`#FFDD14`}
                          onClickHandle={() => setModalOpen(true)}
                        />
                      </>
                    ) : null
                  ) : indicator === 'art' ? (
                    <Button
                      subject={'전체 게시글 보기'}
                      color={`#191A20`}
                      backgroundColor={`#FFDD14`}
                      onClickHandle={() => window.open(Article.article_url)}
                    />
                  ) : null}
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
