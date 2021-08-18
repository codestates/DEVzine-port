import {
  SIGNIN_USER,
  SIGNUP_USER,
  SIGNOUT_USER,
  MYPAGE_USER,
  SIGNIN_ADMIN,
  DELETE_USER,
} from './types';
import { customAxios } from '../utils/customAxios';

export async function signinUser(dataToSubmit) {
  const request = await customAxios
    .post(`/user/signin`, dataToSubmit)
    .then(res => [res.data.message, res.data.data.user_name]);

  return {
    type: SIGNIN_USER,
    payload: request,
  };
}

export async function signupUser(dataToSubmit) {
  const request = await customAxios
    .post(`/user/signup`, dataToSubmit)
    .then(res => res.data.message);

  return {
    type: SIGNUP_USER,
    payload: request,
  };
}

export async function signoutUser() {
  const request = await customAxios
    .post(`/user/signout`)
    .then(res => res.data.message);

  return {
    type: SIGNOUT_USER,
    payload: request,
  };
}

export async function mypageUser(dataToSubmit) {
  const request = await customAxios
    .patch(`/mypage`, dataToSubmit)
    .then(res => ['Login success', res.data.data.user_name, res.data.message]);

  return {
    type: SIGNIN_USER,
    payload: request,
  };
}

export async function signinAdmin(dataToSubmit) {
  const request = 'Login success';
  // TODO: axios 연결 뒤 주석 해제
  // const request = await customAxios
  //   .post(`/admin/signin`, dataToSubmit)
  //   .then(res => res.data.message);

  return {
    type: SIGNIN_ADMIN,
    payload: request,
  };
}

export async function deleteUser() {
  const request = await customAxios
    .delete(`/user/delete`)
    .then(res => res.data.message);

  return {
    type: SIGNOUT_USER,
    payload: request,
  };
}
