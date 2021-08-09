import axios from 'axios';
import { SIGNIN_USER, SIGNUP_USER, SIGNOUT_USER } from './types';

const END_POINT = process.env.REACT_APP_API_URL;

export function signinUser(dataToSubmit) {
  const request = axios
    .post(`${END_POINT}/users/signin`, dataToSubmit)
    .then(res => res.data.message);
  //! axios
  // .then(res => res.data.message);
  // .then(res => 'Login success');

  return {
    type: SIGNIN_USER,
    payload: request,
  };
}

export function signupUser(dataToSubmit) {
  const request = axios
    .post(`${END_POINT}/users/signup`, dataToSubmit)
    .then(res => res.data.message);
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
    .post(`${END_POINT}/users/signout`)
    .then(res => res.data.message);
  //! axios
  // .then(res => res.data.message);
  // .then(res => 'Logout success');

  return {
    type: SIGNOUT_USER,
    payload: request,
  };
}
