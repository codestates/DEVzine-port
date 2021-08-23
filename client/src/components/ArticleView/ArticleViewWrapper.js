import React, { useState, useEffect } from 'react';
import { customAxios } from '../../utils/customAxios';
import Button from '../Common/Button/Button';
import SigninModal from '../Common/SignInModal/SignInModal';
import Auth from '../../hoc/auth';
import store from '../../store/store';

function ArticleViewWrapper({ id }) {
  const paramsArr = id.split('-');
  const indicator = paramsArr[0];
  const pathParameter = paramsArr[1];
  const [Contribution, setContribution] = useState({});
  const [Article, setArticle] = useState({});
  const [Alldata, setAlldata] = useState(false);
  const [ModalOpen, setModalOpen] = useState(false);
  // const [Request, setRrequest] = useState(Auth(true));

  // console.log(Auth(true));
  const Request = Auth(true);

  // useEffect(() => {
  //   // setRrequest(Auth(true));

  //   if (Request === 'Login need') {
  //     if (store.getState().admin.adminSigninSuccess) {
  //       if (store.getState().admin.adminSigninSuccess === 'Login success') {
  //         setRrequest('');
  //       }
  //     }
  //   }
  // }, []);

  useEffect(async () => {
    indicator === 'con'
      ? await customAxios
          .get(`/magazine/contribution/${pathParameter}`)
          .then(res => {
            console.log('contribution으로 요청', res);
            return setContribution(res.data.data);
          })
          .catch(err => {
            // window.location.href = '/error';
            console.log('무슨오류1', err);
          })
      : await customAxios
          .get(`/magazine/article/${pathParameter}`)
          .then(res => {
            console.log('Article로 요청', res);
            return setArticle(res.data.data);
          })
          .catch(err => {
            // window.location.href = '/error';
            console.log('무슨오류2', err);
          });
    setAlldata(true);
  }, []);
  console.log(Request);
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
                      {indicator === 'con'
                        ? Contribution.contribution_keyword
                        : Article.article_keyword}
                    </span>
                    <div className="title ell-24-view">
                      {/* {indicator === 'con'
                        ? Contribution.contribution_title.slice(0, 15) + '...'
                        : Article.article_title.slice(0, 15) + '...'} */}
                      {indicator === 'con'
                        ? Contribution.contribution_title
                        : Article.article_title}
                    </div>
                    <div className="username">
                      {indicator === 'con'
                        ? Contribution.user_name
                        : Article.article_publisher}
                    </div>
                  </div>
                  <svg
                    className="hamburger"
                    onClick={() => window.history.back()}
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
                        ? Contribution.contribution_date.slice(0, 10)
                        : Article.article_date.slice(0, 10)}
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
                      ? Request === 'Login need'
                        ? Contribution.contribution_content
                            .slice(0, 300)
                            .split(/!|\.\s|\✨/)
                            .map(line => (
                              <div key={line} className="line-spacing">
                                {line}.
                              </div>
                            ))
                        : Contribution.contribution_content
                            .split(/!|\.\s|\✨/)
                            .map(line => (
                              <div key={line} className="line-spacing">
                                {line}.
                              </div>
                            ))
                      : Article.article_content.split(/!|\.\s/).map(line => (
                          <div key={line} className="line-spacing">
                            {line}.
                          </div>
                        ))}
                  </div>
                  {indicator === 'con' ? (
                    Request === 'Login need' ? (
                      <div className="layer"></div>
                    ) : null
                  ) : (
                    <div className="layer"></div>
                  )}
                  {indicator === 'con' ? (
                    Request === 'Login need' ? (
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
                      onClickHandle={() => window.open(Article.article_url)}
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
