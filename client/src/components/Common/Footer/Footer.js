import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import arrow from '../../../assets/images/arrow_right_b.svg';
import footerArrow from '../../../assets/images/footerArrow.svg';
import AdminSignInModal from '../AdminModal/AdminSignInModal';
import Auth from '../../../hoc/auth';

function Footer() {
  const [ModalOpen, setModalOpen] = useState(false);
  const [Admin, setAdmin] = useState(false);

  // 관리자 확인
  useEffect(() => {
    let request = Auth(true);

    if (request === 'Admin login success') {
      setAdmin(true);
    } else {
      setAdmin(false);
    }
  }, []);

  return (
    <>
      <footer>
        <div className="footercontainer stopdragging">
          <div className="container">
            <div className="row">
              <div className="col-sm-4">
                <div className="footerinner">
                  <div className="footerright">
                    <p className="cstitle">
                      고객센터
                      <span className="sm-hidden">
                        <img src={arrow} alt="arrow" />
                      </span>
                    </p>
                    <p className="cscontact">02-5959-5959</p>
                    <p className="csworktime">
                      평일 및 토요일 09:00 ~ 18:00 (일요일 & 공휴일 제외)
                    </p>
                    <div className="okteam1">
                      회사명 : 200ok | 서비스 소개 :
                      <a
                        href="https://github.com/codestates/DEVzine-port"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ cursor: 'pointer' }}
                      >
                        DEVzine:port Github
                      </a>
                      <span className="lg-only">|</span>
                      <span className="sm-only">
                        <br />
                      </span>
                      <span
                        className="lg-only"
                        onClick={() => setModalOpen(true)}
                      >
                        관리자 로그인
                      </span>
                    </div>
                    <div className="okteam2">
                      공동 대표 및 연락처 :
                      <a
                        href="https://github.com/vodkamitlime"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ cursor: 'pointer' }}
                      >
                        강하은 Github
                      </a>
                      ,
                      <a
                        href="https://github.com/hyoogu"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ cursor: 'pointer' }}
                      >
                        권효승 Github
                      </a>
                      ,
                      <span className="sm-only">
                        <br />
                      </span>
                      <span className="line-height">
                        <a
                          href="https://github.com/bmaner"
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ cursor: 'pointer' }}
                        >
                          박성현 Github
                        </a>
                        ,
                        <a
                          href="https://github.com/jong-ah"
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ cursor: 'pointer' }}
                        >
                          박종아 Github
                        </a>
                      </span>
                    </div>
                  </div>
                  {Admin ? null : (
                    <div className="footerleft sm-hidden">
                      <div className="footerctbbtn">
                        <Link to="/contribution">
                          DEVzine 기고 신청하기
                          <img src={footerArrow} alt="footerArrow" />
                        </Link>
                      </div>
                      <div className="footervslbtn">
                        <Link to="/visual">
                          핵심 데이터 한 눈에 보기
                          <img src={footerArrow} alt="footerArrow" />
                        </Link>
                      </div>
                      <div className="footefaqbtn">
                        <Link to="/FAQ">
                          자주 묻는 질문 (FAQ)
                          <img src={footerArrow} alt="footerArrow" />
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        {ModalOpen ? (
          <AdminSignInModal ModalOpen={ModalOpen} setModalOpen={setModalOpen} />
        ) : null}
      </footer>
    </>
  );
}

export default Footer;
