import React from 'react';
import store from '../../../store/store';

function Footer() {
  function contributionHandler() {
    if (store.getState().user.signinSuccess) {
      if (store.getState().user.signinSuccess[0] === 'Login success') {
        window.location.href = '/contribution';
      } else {
        window.location.href = '/signin';
      }
    } else {
      window.location.href = '/signin';
    }
  }

  return (
    <>
      Footer
      <br />
      <button onClick={contributionHandler}>DEVzine 기고 신청하기</button>
      <button onClick={() => (window.location.href = '/visual')}>
        핵심 데이터 한 눈에 보기
      </button>
    </>
  );
}

export default Footer;
