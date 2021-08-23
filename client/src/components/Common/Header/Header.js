import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { signoutUser } from '../../../_actions/user_actions';
import { deleteData } from '../../../_actions/article_actions';
import { signoutAdmin } from '../../../_actions/admin_actions';
import { deleteAdminData } from '../../../_actions/admin_actions';
import store from '../../../store/store';
import TopTime from './TopTime';
import SignInModal from '../SignInModal/SignInModal';
import logo from '../../../assets/images/DEVzine.svg';
import menu from '../../../assets/images/menu_b.svg';
import SideBar from './SideBar';
import AlertModal from '../AlertModal/AlertModal';

function Header() {
  const dispatch = useDispatch();

  const [SignIn, setSignIn] = useState(false);
  const [UserName, setUserName] = useState(null);
  const [ModalOpen, setModalOpen] = useState(false);
  const [OpenSidebar, setOpenSidebar] = useState(false);
  const [Admin, setAdmin] = useState(false);
  const [Date, setDate] = useState('');
  const [AlertOpen, setAlertOpen] = useState(false);

  useEffect(() => {
    if (store.getState().user.signinSuccess) {
      if (store.getState().user.signinSuccess[0] === 'Login success') {
        setSignIn(true);
        setUserName(store.getState().user.signinSuccess[1]);
      }
    } else {
      setSignIn(false);
    }

    if (store.getState().admin.adminSigninSuccess) {
      if (store.getState().admin.adminSigninSuccess === 'Login success') {
        setAdmin(true);
      }
    } else {
      setAdmin(false);
    }
  }, []);

  useEffect(() => {
    const week = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
    const nowDate = week[new window.Date().getDay()];
    setDate(nowDate);
    // console.log('요일', nowDate);
  }, []);

  function signInHandler() {
    setModalOpen(true);
  }

  function signOutHandler() {
    if (SignIn) {
      dispatch(signoutUser()).then(res => {
        if (res.payload === 'Logout success') {
          setSignIn(false);
          dispatch(deleteData());
          window.location.reload();
        } else {
          // alert('로그아웃 실패하였습니다.');
          setAlertOpen(true);
        }
      });
    }

    if (Admin) {
      dispatch(signoutAdmin()).then(res => {
        if (res.payload === 'Logout success') {
          setAdmin(false);
          dispatch(deleteAdminData());
          window.location.href = '/';
        } else {
          // alert('로그아웃 실패하였습니다.');
          setAlertOpen(true);
        }
      });
    }
  }

  const closeModal = () => {
    setAlertOpen(false);
  };

  return Date ? (
    <>
      <header className="headerfix stopdragging">
        <div className="headertime">
          <span className="sm-hidden">
            {SignIn
              ? Admin
                ? ''
                : `${UserName}님께 `
              : Admin
              ? ''
              : '여러분께 '}
          </span>
          {Date === 'SUN' ? (
            Admin ? (
              <span>
                일요일엔 본능적으로 쉬고, 그 외에는 이성적으로 업무합니다.
              </span>
            ) : (
              <span>전달할 새로운 소식을 차곡차곡 모으는 중입니다</span>
            )
          ) : (
            <span>
              {Admin
                ? '새로운 소식을 만들기까지 남은 시간'
                : '새로운 소식을 전하기까지 남은 시간'}
              <span className="timer">
                <TopTime />
              </span>
            </span>
          )}
        </div>

        <div className="headernavwrapper">
          <div className="container">
            <div className="row">
              <div className="col-sm-4">
                <div className="headernav">
                  {Admin ? (
                    <img
                      src={logo}
                      alt="DEVzine"
                      className="headernav-logo-admin"
                    />
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
                        OpenSidebar={OpenSidebar}
                        SignIn={SignIn}
                        UserName={UserName}
                        setSignIn={setSignIn}
                        setUserName={setUserName}
                      />
                    ) : (
                      <span className="headernav-menu">
                        <img
                          src={menu}
                          alt="menu"
                          onClick={() => setOpenSidebar(true)}
                        />
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
                    {SignIn || Admin ? (
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
        <AlertModal
          open={AlertOpen}
          close={closeModal}
          alertString={'로그인 실패하였습니다.'}
          alertBtn="확인"
        />
        {ModalOpen ? (
          <SignInModal ModalOpen={ModalOpen} setModalOpen={setModalOpen} />
        ) : null}
      </header>
    </>
  ) : null;
}

export default Header;
