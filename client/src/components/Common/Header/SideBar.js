import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { signoutUser } from '../../../_actions/user_actions';
import SignInModal from '../SignInModal/SignInModal';
import store from '../../../store/store';
import close from '../../../assets/images/close.svg';

function SideBar(props) {
  const dispatch = useDispatch();

  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    if (store.getState().user.signinSuccess) {
      if (store.getState().user.signinSuccess[0] === 'Login success') {
        props.setSignIn(true);
        props.setUserName(store.getState().user.signinSuccess[1]);
      } else {
        props.setSignIn(false);
      }
    } else {
      props.setSignIn(false);
    }
  }, []);

  function signInHandler() {
    setModalOpen(true);
  }

  function signOutHandler() {
    dispatch(signoutUser()).then(res => {
      if (res.payload === 'Logout success') {
        props.setSignIn(false);
        props.setOpenSidebar(false);
        window.location.reload();
      } else {
        alert('로그아웃 실패하였습니다.');
      }
    });
  }

  return (
    <>
      <nav class="sidebar">
        <div className="sidebar-nav">
          <div className="container">
            <div className="row">
              <div className="col-sm-4">
                <img
                  src={close}
                  alt="close"
                  className="closebtn"
                  onClick={() => props.setOpenSidebar(false)}
                />
                <ul>
                  {props.userName ? (
                    <li className="usename">{props.UserName}</li>
                  ) : (
                    <li onClick={signInHandler}>로그인</li>
                  )}
                  <li onClick={() => props.setOpenSidebar(false)}>
                    <Link to="/mypage">마이페이지</Link>
                  </li>
                  <li onClick={() => props.setOpenSidebar(false)}>
                    <Link to="/articlelist">매거진보기</Link>
                  </li>
                  <li onClick={() => props.setOpenSidebar(false)}>
                    <Link to="/visual">핵심데이터</Link>
                  </li>
                  <li onClick={() => props.setOpenSidebar(false)}>
                    <Link to="/contribution">기고하기</Link>
                  </li>
                  <li onClick={() => props.setOpenSidebar(false)}>
                    <Link to="/subscribe">구독하기</Link>
                  </li>
                  {props.SignIn ? (
                    <li className="signout" onClick={signOutHandler}>
                      로그아웃
                    </li>
                  ) : null}
                </ul>
              </div>
            </div>
          </div>
        </div>
        {modalOpen ? (
          <SignInModal modalOpen={modalOpen} setModalOpen={setModalOpen} />
        ) : null}
      </nav>
    </>
  );
}

export default SideBar;
