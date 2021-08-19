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

  const [SignIn, setSignIn] = useState(false);
  const [UserName, setUserName] = useState(null);
  const [ModalOpen, setModalOpen] = useState(false);
  const [OpenSidebar, setOpenSidebar] = useState(false);
  const [Admin, setAdmin] = useState(false);

  useEffect(() => {
    if (store.getState().user.signinSuccess) {
      if (store.getState().user.signinSuccess[0] === 'Login success') {
        setSignIn(true);
        setUserName(store.getState().user.signinSuccess[1]);
      }
    } else if (store.getState().user.adminSigninSuccess) {
      if (store.getState().user.adminSigninSuccess[0] === 'Login success') {
        setSignIn(true);
        setAdmin(true);
      }
    } else {
      setSignIn(false);
      setAdmin(false);
    }
  }, []);

  function signInHandler() {
    setModalOpen(true);
  }

  function signOutHandler() {
    dispatch(signoutUser()).then(res => {
      if (res.payload === 'Logout success') {
        setSignIn(false);
        setAdmin(false);
        window.location.reload();
      } else {
        alert('로그아웃 실패하였습니다.');
      }
    });
  }

  return (
    <>
      <header className="headerfix">
        <div className="headertime">
          <span className="sm-hidden">
            {SignIn ? (Admin ? '' : `${UserName}님께 `) : '여러분께 '}
          </span>
          {Admin
            ? '새로운 소식을 만들기까지 남은 시간'
            : '새로운 소식을 전하기까지 남은 시간'}
          <span className="timer">
            <TopTime />
          </span>
        </div>

        <div className="headernavwrapper">
          <div className="container">
            <div className="row">
              <div className="col-sm-4">
                <div className="headernav">
                  {Admin ? (
                    <img src={logo} alt="DEVzine" className="headernav-logo" />
                  ) : (
                    <Link to="/">
                      <img
                        src={logo}
                        alt="DEVzine"
                        className="headernav-logo"
                      />
                    </Link>
                  )}
                  <div className="sm-only">
                    {OpenSidebar ? (
                      <SideBar
                        setOpenSidebar={setOpenSidebar}
                        SignIn={SignIn}
                        UserName={UserName}
                        setSignIn={setSignIn}
                        setUserName={setUserName}
                      />
                    ) : (
                      <span
                        className="headernav-menu"
                        onClick={() => setOpenSidebar(true)}
                      >
                        <img src={menu} alt="menu" />
                      </span>
                    )}
                  </div>
                  <div className="rightbox sm-hidden">
                    {Admin ? null : (
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
                    )}
                    {SignIn ? (
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
        {ModalOpen ? (
          <SignInModal ModalOpen={ModalOpen} setModalOpen={setModalOpen} />
        ) : null}
      </header>
    </>
  );
}

export default Header;
