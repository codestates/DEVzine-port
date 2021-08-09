import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { signoutUser } from '../../../_actions/user_actions';
import store from '../../../store/store';

function Header() {
  const dispatch = useDispatch();

  const [signIn, setSignIn] = useState(false);

  useEffect(() => {
    if (store.getState().user.signinSuccess !== undefined) {
      setSignIn(true);
    } else return setSignIn(false);
  });

  function signInHandler() {
    window.location.href = '/signin';
  }
  function signOutHandler() {
    dispatch(signoutUser()).then(res => {
      if (res.payload === 'Logout success') {
        setSignIn(false);
        history.go(0);
      } else {
        alert('로그아웃 실패하였습니다.');
      }
    });
  }

  function mypageHandler() {
    if (signIn) window.location.href = '/mypage';
    else window.location.href = '/signin';
  }

  return (
    <>
      Header
      <div>
        <button
          onClick={() => (window.location.href = '/')}
          className="headerlogo"
        >
          로고
        </button>
        <button onClick={() => (window.location.href = '/subscribe')}>
          구독하기
        </button>
        <button onClick={mypageHandler}>마이페이지</button>
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
    </>
  );
}

export default Header;
