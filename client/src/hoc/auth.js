import React, { useEffect } from 'react';
import store from '../store/store';

export default function (option) {
  //null    =>  아무나 출입이 가능한 페이지
  //true    =>  로그인한 유저만 출입이 가능한 페이지
  //false   =>  로그인한 유저는 출입 불가능한 페이지
  if (store.getState().user.signinSuccess === undefined) {
    // 로그인 하지 않은 상태
    if (option) {
      window.location.href = '/signin';
    }
  } else {
    // 로그인 한 상태
    if (store.getState().user.signinSuccess[0] === 'Login success') {
      if (option === false) {
        window.location.href = `/`;
      }
    }
  }
}