import React, { useState, useEffect } from 'react';
import axios from 'axios';
import landing01 from '../../assets/images/landing01.svg';
import landing02 from '../../assets/images/landing02.svg';
import landing03 from '../../assets/images/landing03.svg';
import landing04 from '../../assets/images/landing04.svg';

const END_POINT = process.env.REACT_APP_API_URL;

function LandingWrapper() {
  const [subscribers, setSubscribers] = useState('0');

  useEffect(() => {
    axios
      .get(`${END_POINT}/landing`, { withCredentials: true })
      .then(res => setSubscribers(res.data.data.total_subscribers))
      .catch(err => {
        alert('회원 수 정보를 받아오는데 실패하였습니다.');
      });
  }, []);

  return (
    <>
      <div className="container">
        <div className="landingimg">
          <div className="row">
            <div className="col-sm-4 col-md-8 col-lg-7">
              <div className="landingbackground">
                <img src={landing01} alt="landing01" />
              </div>
            </div>
            <div className="col-sm-4 col-md-4 col-lg-5">
              <div className="landingContent">
                <h2>
                  최신 IT 뉴스를
                  <br />
                  편하게 본다
                </h2>
                <p>매일 7시에 새로운 뉴스가 추가됩니다.</p>
              </div>
            </div>
            <div className="col-sm-4 col-md-8 col-lg-7">
              <div className="landingbackground">
                <img src={landing02} alt="landing02" />
              </div>
            </div>
            <div className="col-sm-4 col-md-4 col-lg-5">
              <div className="landingContent">
                <h2>
                  핵심 IT 키워드를
                  <br />
                  빠르게 확인한다
                </h2>
                <p>하단 핵심 데이터 한 눈에 보기에서 확인할 수 있습니다.</p>
              </div>
            </div>
            <div className="col-sm-4 col-md-8 col-lg-7">
              <div className="landingbackground">
                <img src={landing03} alt="landing03" />
              </div>
            </div>
            <div className="col-sm-4 col-md-4 col-lg-5">
              <div className="landingContent">
                <h2>
                  이메일을 통해
                  <br />
                  매일 받아본다
                </h2>
                <p>구독신청하면 신청한 이메일로 받아볼 수 있습니다.</p>
              </div>
            </div>
            <div className="col-sm-4 col-md-8 col-lg-7">
              <div className="landingbackground">
                <img src={landing04} alt="landing04" />
              </div>
            </div>
            <div className="col-sm-4 col-md-4 col-lg-5">
              <div className="landingContent">
                <h2>
                  자신의 IT 글을
                  <br />
                  DEVzine에 기고한다.
                </h2>
                <p>하단 기고 신청하기에서 기고 신청할 수 있습니다.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="withUsContainer">
        <h2>{subscribers}명</h2>
        구독하고 있어요.
        <br />
        많은 분들이 찾는 DEVzine과 함께 해요!
        <div>
          <button onClick={() => (window.location.href = '/subscribe')}>
            구독하기
          </button>
          <button onClick={() => (window.location.href = '/articlelist')}>
            매거진 보기
          </button>
        </div>
      </div>
    </>
  );
}

export default LandingWrapper;
