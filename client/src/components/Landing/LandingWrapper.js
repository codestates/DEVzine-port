import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { customAxios } from '../../utils/customAxios';
import Button from '../Common/Button/Button';
import landing01 from '../../assets/images/landing01.svg';
import landing02 from '../../assets/images/landing02.svg';
import landing03 from '../../assets/images/landing03.svg';
import landing04 from '../../assets/images/landing04.svg';

function LandingWrapper() {
  const [subscribers, setSubscribers] = useState('200000');
  const [count, setCount] = useState('0');
  const [ScrollY, setScrollY] = useState(0);
  const [ScrollActive, setScrollActive] = useState(false);

  // useEffect(async () => {
  //   const requestGet = await customAxios
  //     .get('/landing')
  //     .then(res => res.data.data.setSubscribers);
  //   .catch(err => alert('회원 수 정보를 받아오는데 실패하였습니다.'));
  //   setSubscribers(requestGet);
  // }, []);

  useEffect(() => {
    let start = 0;
    const end = parseInt(subscribers.substring(0, 3));
    if (start === end) return;

    let totalMilSecDur = parseInt(1);
    let incrementTime = (totalMilSecDur / end) * 3500;

    let timer = setInterval(() => {
      start += 1;
      setCount(String(start) + ',' + subscribers.substring(3));
      if (start === end) clearInterval(timer);
    }, incrementTime);
  }, [ScrollActive]);

  useEffect(() => {
    function scrollListener() {
      window.addEventListener('scroll', handleScroll);
    } //  window 에서 스크롤을 감시 시작
    scrollListener(); // window 에서 스크롤을 감시
    return () => {
      window.removeEventListener('scroll', handleScroll);
    }; //  window 에서 스크롤을 감시를 종료
  });

  function handleScroll() {
    if (ScrollY > window.innerHeight) {
      setScrollY(window.pageYOffset);
      setScrollActive(true);
    } else {
      setScrollY(window.pageYOffset);
      setScrollActive(false);
    }
  }

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
              <div className="landingcontent">
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
              <div className="landingcontent">
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
              <div className="landingcontent">
                <h2>
                  이메일을 통해
                  <br />
                  주기적으로 받아본다
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
              <div className="landingcontent">
                <h2>
                  자신의 IT 글을
                  <br />
                  DEVzine에 기고한다
                </h2>
                <p>하단 기고 신청하기에서 기고 신청할 수 있습니다.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="withuscontainer">
        <h2>{count}명</h2>
        구독하고 있어요.
        <p>많은 분들이 찾는 DEVzine과 함께 해요!</p>
        <div className="landingbottombtn">
          <div>
            <Link to="/subscribe">
              <Button
                subject="구독하기"
                color="#191A20"
                backgroundColor="#FFDD14"
                className="btn1"
              />
            </Link>
          </div>
          <div>
            <Link to="/articlelist">
              <Button
                subject="매거진 보기"
                color="#191A20"
                backgroundColor="#FFDD14"
              />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default LandingWrapper;
