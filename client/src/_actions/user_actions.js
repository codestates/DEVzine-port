import axios from 'axios';
import { SIGNIN_USER, SIGNUP_USER, SIGNOUT_USER, MYPAGE_USER } from './types';

const END_POINT = process.env.REACT_APP_API_URL;

export function signinUser(dataToSubmit) {
  const request = axios
    .post(`${END_POINT}/user/signin`, dataToSubmit, {
      withCredentials: true,
    })
    .then(res => ['Login success', 'kimcoding']);
  //! axios
  // .then(res => [res.data,message, res.data.data.user_name]);
  // .then(res => ['Login success', 'kimcoding']);

  //! axios
  return {
    type: SIGNIN_USER,
    payload: request,
    // payload: {
    //   message: request[0],
    //   user_name: request[1],
    // },
  };
}

export function signupUser(dataToSubmit) {
  const request = axios
    .post(`${END_POINT}/user/signup`, dataToSubmit, {
      withCredentials: true,
    })
    .then(res => 'User created');
  //! axios
  // .then(res => res.data.message);
  // .then(res => 'User created');

  return {
    type: SIGNUP_USER,
    payload: request,
  };
}

export function signoutUser() {
  const request = axios
    .post(`${END_POINT}/user/signout`, {
      withCredentials: true,
    })
    .then(res => 'Logout success');
  //! axios
  // .then(res => res.data.message);
  // .then(res => 'Logout success');

  return {
    type: SIGNOUT_USER,
    payload: request,
  };
}

export function mypageUser(dataToSubmit) {
  const request = axios
    .patch(`${END_POINT}/mypage`, dataToSubmit, {
      withCredentials: true,
    })
    .then(res => ['Login success', 'parkcoding', 'Patch Success']);
  //! axios
  // .then(res => [res.data,message, res.data.data.user_name]);
  // .then(res => ['Login success', 'parkcoding']);

  //! axios
  return {
    type: SIGNIN_USER,
    payload: request,
    // payload: {
    //   message: request[0],
    //   user_name: request[1],
    // },
  };
}
