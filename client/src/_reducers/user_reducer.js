import {
  SIGNIN_USER,
  SIGNUP_USER,
  SIGNOUT_USER,
  MYPAGE_USER,
  DELETE_USER,
  SIGNIN_ADMIN,
} from '../_actions/types';

export default function (state = {}, action) {
  switch (action.type) {
    case SIGNIN_USER:
      return { ...state, signinSuccess: action.payload };
      break;
    case SIGNUP_USER:
      return { ...state, signupSuccess: action.payload };
      break;
    case SIGNOUT_USER:
      return (state = {});
      break;
    case MYPAGE_USER:
      return { ...state, signinSuccess: action.payload };
      break;
    case DELETE_USER:
      return (state = {});
      break;
    case SIGNIN_ADMIN:
      return { ...state, adminSigninSuccess: action.payload };
      break;
    default:
      return state;
  }
}
