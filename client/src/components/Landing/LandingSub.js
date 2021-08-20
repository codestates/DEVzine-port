import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Button from '../Common/Button/Button';
import { customAxios } from '../../utils/customAxios';
import store from '../../store/store';

function LandingSub() {
  const [Subscribers, setSubscribers] = useState('0');
  const [Count, setCount] = useState('0');
  const [ScrollY, setScrollY] = useState(0);
  const [ScrollActive, setScrollActive] = useState(false);
  const [Admin, setAdmin] = useState(false);

  useEffect(() => {
    let start = 0;
    // const end = parseInt(
    //   Subscribers.toString()
    //     .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    //     .substring(0, 3),
    // );
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
  }, [ScrollActive]);

  useEffect(async () => {
    await customAxios
      .get('/landing')
      .then(res => setSubscribers(String(res.data.data.total_subscribers)))
      .catch(err => {
        alert('회원 수를 받지 못 했습니다.');
        setSubscribers(String(5959000));
      });
  }, []);

  useEffect(() => {
    function scrollListener() {
      window.addEventListener('scroll', handleScroll);
    }
    scrollListener();
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  });

  useEffect(() => {
    if (store.getState().admin.adminSigninSuccess) {
      if (store.getState().admin.adminSigninSuccess === 'Login success') {
        setAdmin(true);
      }
    } else {
      setAdmin(false);
    }
  }, []);

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
      <div className="landinglast">
        <div className="container">
          <div className="row">
            <div className="col-sm-4">
              <div className="withuscontainer">
                <h2>{Count}명</h2>
                구독하고 있어요.
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
                      <Button
                        subject="매거진 보기"
                        color="#191A20"
                        backgroundColor="#FFDD14"
                        onClickHandle={() =>
                          (window.location.href = '/articlelist')
                        }
                      />
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
