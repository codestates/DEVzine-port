import React, { useState, useEffect } from 'react';
import arrow from '../../../assets/images/arrow_right_b.svg';
import footerArrow from '../../../assets/images/footerArrow.svg';

function Footer() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    function reportWindowSize() {
      setWindowWidth(window.innerWidth);
      // console.log(window.innerHeight, window.innerWidth);
    }
    window.addEventListener('resize', reportWindowSize);
    return () => window.removeEventListener('resize', reportWindowSize);
  }, []);

  return (
    <>
      <div className="footercontainer">
        <div className="footerinner">
          <div className="footerright">
            <p className="cstitle">
              고객센터
              {windowWidth < 768 ? '' : <img src={arrow} alt="arrow" />}
            </p>
            <p className="cscontact">02-1004-1004</p>
            <p className="csworktime">
              평일 09:00 ~ 18:00 (주말 & 공휴일 제외)
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
              |<span onClick={() => alert('관리자 로그인')}>관리자 로그인</span>
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
            </div>
          </div>
          {windowWidth < 768 ? (
            ''
          ) : (
            <div className="footerleft">
              <div
                onClick={() => (window.location.href = '/contribution')}
                className="footerctbbtn"
              >
                DEVzine 기고 신청하기
                <img src={footerArrow} alt="footerArrow" />
              </div>
              <div
                onClick={() => (window.location.href = '/visual')}
                className="footervslbtn"
              >
                핵심 데이터 한 눈에 보기
                <img src={footerArrow} alt="footerArrow" />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Footer;
