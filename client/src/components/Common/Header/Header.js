import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { signoutUser } from '../../../_actions/user_actions';
import store from '../../../store/store';
import TopTime from './TopTime';
import SignInModal from '../SignInModal/SignInModal';
import logo from '../../../assets/images/DEVzine.svg';
import menu from '../../../assets/images/menu_b.svg';
import SideBar from './SideBar';

function Header() {
  const dispatch = useDispatch();

  const [signIn, setSignIn] = useState(false);
  const [userName, setUserName] = useState('nothing');
  const [modalOpen, setModalOpen] = useState(false);
  // const [ScrollY, setScrollY] = useState(0);
  // const [ScrollActive, setScrollActive] = useState(false);
  const [Open, setOpen] = useState(false);

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
    setModalOpen(true);
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

  // useEffect(() => {
  //   function scrollListener() {
  //     window.addEventListener('scroll', handleScroll);
  //   } //  window 에서 스크롤을 감시 시작
  //   scrollListener(); // window 에서 스크롤을 감시
  //   return () => {
  //     window.removeEventListener('scroll', handleScroll);
  //   }; //  window 에서 스크롤을 감시를 종료
  // });

  // function handleScroll() {
  //   if (ScrollY > 5) {
  //     setScrollY(window.pageYOffset);
  //     setScrollActive(true);
  //   } else {
  //     setScrollY(window.pageYOffset);
  //     setScrollActive(false);
  //   }
  // }

  return (
    <>
      <header className="headerfix">
        <div className="headertime">
          <span className="sm-hidden">
            {signIn ? `${userName}님께 ` : '여러분께 '}
          </span>
          새로운 소식을 전하기까지 남은 시간
          <span className="timer">
            <TopTime />
          </span>
        </div>

        <div className="headernavwrapper">
          <div className="container">
            <div className="row">
              <div className="col-sm-4">
                <div className="headernav">
                  <Link to="/">
                    <img src={logo} alt="DEVzine" className="headernav-logo" />
                  </Link>
                  <div className="sm-only">
                    {Open ? (
                      <SideBar />
                    ) : (
                      <span
                        className="headernav-menu"
                        onClick={() => setOpen(true)}
                      >
                        <img src={menu} alt="menu" />
                      </span>
                    )}
                  </div>
                  <div className="rightbox sm-hidden">
                    <ul className="navlist">
                      <li>
                        <Link to="/articlelist">매거진 보기</Link>
                      </li>
                      <li>
                        <Link to="/subscribe">구독하기</Link>
                      </li>
                      <li>
                        <Link to="/mypage">마이페이지</Link>
                      </li>
                    </ul>
                    {signIn ? (
                      <button
                        onClick={signOutHandler}
                        className="rightbox-button"
                      >
                        로그아웃
                      </button>
                    ) : (
                      <button
                        onClick={signInHandler}
                        className="rightbox-button"
                      >
                        로그인
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {modalOpen ? (
          <SignInModal modalOpen={modalOpen} setModalOpen={setModalOpen} />
        ) : null}
      </header>
    </>
  );
}

export default Header;
