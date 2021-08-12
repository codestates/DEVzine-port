import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { signoutUser } from '../../../_actions/user_actions';
import store from '../../../store/store';
import TopTime from './TopTime';
import SignInModal from '../SignInModal/SignInModal'

function Header() {
  const dispatch = useDispatch();

  const [signIn, setSignIn] = useState(false);
  const [userName, setUserName] = useState('nothing');
  const [modalOpen, setModalOpen] = useState(false);

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
    setModalOpen(true)
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

  return (
    <div className="headerfix">
      <div className="headertime">
        {signIn ? `${userName}님` : '여러분'}께 새로운 소식을 전하기까지 남은
        시간
        <span className="timer">
          <TopTime />
        </span>
      </div>
      <div className="row">
        <div className="col-sm-6 col-md-12 col-lg-12">
          <div className="headernav">
            <button
              onClick={() => (window.location.href = '/')}
              className="headerlogo"
            >
              로고
            </button>
            <button onClick={() => (window.location.href = '/articlelist')}>
              매거진 보기
            </button>
            <button onClick={() => (window.location.href = '/subscribe')}>
              구독하기
            </button>
            <button onClick={() => (window.location.href = '/mypage')}>
              마이페이지
            </button>
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
        </div>
      </div>
      {modalOpen ? <SignInModal modalOpen={ modalOpen} setModalOpen={setModalOpen} /> : null}
    </div>
  );
}

export default Header;
