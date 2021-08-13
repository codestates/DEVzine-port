import { SIGNIN_USER, SIGNUP_USER, SIGNOUT_USER, MYPAGE_USER } from './types';
import { customAxios } from '../utils/customAxios';

export async function signinUser(dataToSubmit) {
  const request = ['Login success', 'kimcoding'];
  // const request = await customAxios
  //   .post(`/user/signin`, dataToSubmit)
  //   .then(res => [res.data.message, res.data.data.user_name]);

  return {
    type: SIGNIN_USER,
    payload: request,
  };
}

export async function signupUser(dataToSubmit) {
  const request = 'User created';
  // const request = await customAxios
  //   .post(`/user/signup`, dataToSubmit)
  //   .then(res => res.data.message);

  return {
    type: SIGNUP_USER,
    payload: request,
  };
}

export async function signoutUser() {
  const request = 'Logout success';
  // const request = await customAxios
  //   .post(`/user/signout`)
  //   .then(res => res.data.message);

  return {
    type: SIGNOUT_USER,
    payload: request,
  };
}

export async function mypageUser(dataToSubmit) {
  const request = await customAxios
    .patch(`/mypage`, dataToSubmit)
    .then(res => ['Login success', 'parkcoding', 'Patch Success']);
  //! axios
  // .then(res => ['Login success', res.data.data.user_name, res.data.message]);
  // .then(res => ['Login success', 'parkcoding','Patch Success']);

  //! axios
  return {
    type: SIGNIN_USER,
    payload: request,
  };
}
