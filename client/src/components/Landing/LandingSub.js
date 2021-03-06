import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Button from '../Common/Button/Button';
import { customAxios } from '../../utils/customAxios';
import Auth from '../../hoc/auth';

function LandingSub() {
  const [Subscribers, setSubscribers] = useState('0');
  const [Count, setCount] = useState('0');
  const [MCount, setMCount] = useState('0');
  const [ScrollActive, setScrollActive] = useState(false);
  const [MScrollActive, setMScrollActive] = useState(false);
  const [Admin, setAdmin] = useState(false);
  const [ScrollPosition, setScrollPosition] = useState(0);

  // 관리자 확인
  useEffect(() => {
    const request = Auth(true);

    if (request === 'Admin login success') {
      setAdmin(true);
    } else {
      setAdmin(false);
    }
  }, []);

  // 숫자 카운트 (데스크탑)
  useEffect(() => {
    let start = 0;
    const end = parseInt(Subscribers.toString().substring(0, 3));
    if (start === end) return;

    let totalMilSecDur = parseInt(1);
    let incrementTime = (totalMilSecDur / end) * 3500;

    let timer = setInterval(() => {
      start += 1;

      setCount(
        String(start) +
          Subscribers.substring(3)
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ','),
      );
      if (start === end) {
        clearInterval(timer);
        setCount(Subscribers.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','));
      }
    }, incrementTime);

    return () => setScrollActive(false);
  }, [ScrollActive]);

  // 숫자 카운트 (모바일)
  useEffect(() => {
    let start = 0;
    const end = parseInt(Subscribers.toString().substring(0, 3));
    if (start === end) return;

    let totalMilSecDur = parseInt(1);
    let incrementTime = (totalMilSecDur / end) * 3500;

    let timer = setInterval(() => {
      start += 1;

      setMCount(
        String(start) +
          Subscribers.substring(3)
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ','),
      );
      if (start === end) {
        clearInterval(timer);
        setMCount(Subscribers.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','));
      }
    }, incrementTime);

    return () => setScrollActive(false);
  }, [MScrollActive]);

  // 숫자 정보
  useEffect(async () => {
    await customAxios
      .get('/landing')
      .then(res => setSubscribers(String(res.data.data.total_subscribers)))
      .catch(err => {
        setSubscribers(String(5959000));
      });
  }, []);

  // 스크롤 확인
  useEffect(() => {
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, [ScrollPosition]);

  // 스크롤 위치
  function onScroll() {
    setScrollPosition(window.pageYOffset);
    if (ScrollPosition > 1000) {
      setScrollActive(true);
    }

    if (ScrollPosition > 1300) {
      setMScrollActive(true);
    }
  }

  return (
    <>
      <div className="landinglast stopdragging">
        <div className="container">
          <div className="row">
            <div className="col-sm-4">
              <div className="withuscontainer">
                <h2 className="sm-hidden">{Count}명</h2>
                <h2 className="sm-only">{MCount}명</h2>
                이용하고 있어요.
                <p>많은 분들이 찾는 DEVzine과 함께 해요!</p>
                {Admin ? (
                  <div className="adminbottombtn">
                    <div>
                      <Link to="/admin">
                        <Button
                          subject="관리자 페이지 가기"
                          color="#191A20"
                          backgroundColor="#FFDD14"
                          className="btn1"
                        />
                      </Link>
                    </div>
                  </div>
                ) : (
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
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default LandingSub;
