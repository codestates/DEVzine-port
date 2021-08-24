import React from 'react';
import { Link } from 'react-router-dom';
import landing01 from '../../assets/images/landing01.svg';
import landing02 from '../../assets/images/landing02.svg';
import landing03 from '../../assets/images/landing03.svg';
import landing04 from '../../assets/images/landing04.svg';

function LandingWrapper() {
  return (
    <>
      <div className="landingimg stopdragging">
        <div className="container">
          <div className="row">
            <div className="col-sm-4 col-md-8 col-lg-7">
              <div className="landingbackground">
                <img src={landing01} alt="landing01" />
              </div>
            </div>
            <div className="col-sm-4 col-md-4 col-lg-5">
              <div className="landingcontent">
                <h2>
                  최신 IT 뉴스를
                  <br />
                  편하게 본다
                </h2>
                <p>
                  매일 7시에 새로운 뉴스가{' '}
                  <span className="md-only">
                    <br />
                  </span>
                  추가됩니다.
                </p>
              </div>
            </div>
            <div className="col-sm-4 col-md-8 col-lg-7">
              <div className="landingbackground">
                <img src={landing02} alt="landing02" />
              </div>
            </div>
            <div className="col-sm-4 col-md-4 col-lg-5">
              <div className="landingcontent">
                <h2>
                  핵심 IT 키워드를
                  <br />
                  빠르게 확인한다
                </h2>
                <p className="sm-hidden">
                  하단{' '}
                  <Link to="/visual">
                    <span className="visuallink">핵심 데이터 한 눈에 보기</span>
                  </Link>
                  <span className="md-only">
                    <br />
                  </span>
                  에서 확인할 수 있습니다.
                </p>
                <p className="sm-only">
                  하단{' '}
                  <Link to="/visual">
                    <span className="visuallink">핵심 데이터 한 눈에 보기</span>
                  </Link>
                  에서
                  <br />
                  확인할 수 있습니다.
                </p>
              </div>
            </div>
            <div className="col-sm-4 col-md-8 col-lg-7">
              <div className="landingbackground">
                <img src={landing03} alt="landing03" />
              </div>
            </div>
            <div className="col-sm-4 col-md-4 col-lg-5">
              <div className="landingcontent">
                <h2>
                  이메일을 통해
                  <br />
                  주기적으로 받아본다
                </h2>
                <p>
                  구독신청하면 신청한{' '}
                  <span className="md-only">
                    <br />
                  </span>
                  이메일로 받아볼 수 있습니다.
                </p>
              </div>
            </div>
            <div className="col-sm-4 col-md-8 col-lg-7">
              <div className="landingbackground last">
                <img src={landing04} alt="landing04" />
              </div>
            </div>
            <div className="col-sm-4 col-md-4 col-lg-5">
              <div className="landingcontent last">
                <h2>
                  자신의 IT 글을
                  <br />
                  DEVzine에 기고한다
                </h2>
                <p>
                  하단 기고 신청하기에서{' '}
                  <span className="md-only">
                    <br />
                  </span>
                  기고 신청할 수 있습니다.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default LandingWrapper;
