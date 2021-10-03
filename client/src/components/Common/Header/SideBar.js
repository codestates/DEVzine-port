import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { signoutUser } from '../../../_actions/user_actions';
import { deleteData } from '../../../_actions/article_actions';
import SignInModal from '../SignInModal/SignInModal';
import store from '../../../store/store';
import close from '../../../assets/images/close.svg';
import AlertModal from '../AlertModal/AlertModal';
import Auth from '../../../hoc/auth';

function SideBar(props) {
  const dispatch = useDispatch();

  const [ModalOpen, setModalOpen] = useState(false);
  const [AlertOpen, setAlertOpen] = useState(false);
  const [CloseView, setCloseView] = useState(false);
  const [SidebarOut, setSidebarOut] = useState(true);

  // 로그인 확인
  useEffect(() => {
    const request = Auth(true);

    if (request !== 'Login need' && request !== 'Admin login success') {
      props.setSignIn(true);
      props.setUserName(store.getState().user.signinSuccess[1]);
    } else {
      props.setSignIn(false);
    }
  }, []);

  // 취소버튼 나오기
  setTimeout(function () {
    setCloseView(true);
  }, 350);

  // 로그아웃 클릭
  function signOutHandler() {
    dispatch(signoutUser()).then(res => {
      if (res.payload === 'Logout success') {
        props.setSignIn(false);
        props.setOpenSidebar(false);
        dispatch(deleteData());
        window.location.reload();
      } else {
        setAlertOpen(true);
      }
    });
  }

  // 모달 닫기
  function closeModal() {
    setAlertOpen(false);
  }

  return (
    <>
      <nav className="sidebar">
        <div className={SidebarOut ? 'sidebar-nav-open' : 'sidebar-nav-close'}>
          <div className="container">
            <div className="row">
              <div className="col-sm-4">
                {CloseView ? (
                  <img
                    src={close}
                    alt="close"
                    className="closebtn"
                    onClick={() => {
                      setSidebarOut(false);

                      setTimeout(function () {
                        props.setOpenSidebar(false);
                      }, 1000);
                    }}
                  />
                ) : null}
                <ul>
                  {props.UserName ? (
                    <li className="usename">{props.UserName}</li>
                  ) : (
                    <li onClick={() => setModalOpen(true)}>로그인</li>
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
                  <li onClick={() => props.setOpenSidebar(false)}>
                    <Link to="/FAQ">자주 묻는 질문</Link>
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
        <AlertModal
          open={AlertOpen}
          close={closeModal}
          alertString={'로그아웃 실패하였습니다.'}
          alertBtn="확인"
        />
        {ModalOpen ? (
          <SignInModal ModalOpen={ModalOpen} setModalOpen={setModalOpen} />
        ) : null}
      </nav>
    </>
  );
}

export default SideBar;
