import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { signoutUser } from '../../../_actions/user_actions';
import store from '../../../store/store';
import TopTime from './TopTime';
import logo from '../../../assets/images/DEVzine.svg';
import menu from '../../../assets/images/menu_b.svg';

function Header() {
  const dispatch = useDispatch();

  const [signIn, setSignIn] = useState(false);
  const [userName, setUserName] = useState('nothing');
  const [ScrollY, setScrollY] = useState(0);
  const [ScrollActive, setScrollActive] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    if (store.getState().user.signinSuccess) {
      if (store.getState().user.signinSuccess[0] === 'Login success') {
        setSignIn(true);
        setUserName(store.getState().user.signinSuccess[1]);
      } else {
        setSignIn(false);
      }
    } else {
      setSignIn(false);
    }
  }, []);

  function signInHandler() {
    window.location.href = '/signin';
  }
  function signOutHandler() {
    dispatch(signoutUser()).then(res => {
      if (res.payload === 'Logout success') {
        setSignIn(false);
        window.location.reload();
      } else {
        alert('로그아웃 실패하였습니다.');
      }
    });
  }

  useEffect(() => {
    function scrollListener() {
      window.addEventListener('scroll', handleScroll);
    } //  window 에서 스크롤을 감시 시작
    scrollListener(); // window 에서 스크롤을 감시
    return () => {
      window.removeEventListener('scroll', handleScroll);
    }; //  window 에서 스크롤을 감시를 종료
  });

  useEffect(() => {
    function reportWindowSize() {
      setWindowWidth(window.innerWidth);
      // console.log(window.innerHeight, window.innerWidth);
    }
    window.addEventListener('resize', reportWindowSize);
    return () => window.removeEventListener('resize', reportWindowSize);
  }, []);

  function handleScroll() {
    if (ScrollY > 5) {
      setScrollY(window.pageYOffset);
      setScrollActive(true);
    } else {
      setScrollY(window.pageYOffset);
      setScrollActive(false);
    }
  }

  return (
    <div className={ScrollActive ? 'headerfix' : ''}>
      <div className="headertime">
        {windowWidth < 768 ? '' : signIn ? `${userName}님께 ` : '여러분께 '}
        새로운 소식을 전하기까지 남은 시간
        <span className="timer">
          <TopTime />
        </span>
      </div>
      <div className="headernavwrapper">
        <div className="headernav">
          <button
            onClick={() => (window.location.href = '/')}
            className="headerlogo"
          >
            <img src={logo} alt="logo" />
          </button>
          {windowWidth < 768 ? (
            <span className="headermenu">
              <img src={menu} alt={menu} />
            </span>
          ) : (
            <div className="leftbox">
              <span onClick={() => (window.location.href = '/articlelist')}>
                매거진 보기
              </span>
              |
              <span onClick={() => (window.location.href = '/subscribe')}>
                구독하기
              </span>
              |
              <span onClick={() => (window.location.href = '/mypage')}>
                마이페이지
              </span>
              {signIn ? (
                <button onClick={signOutHandler} className="headerbutton">
                  로그아웃
                </button>
              ) : (
                <button onClick={signInHandler} className="headerbutton">
                  로그인
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
