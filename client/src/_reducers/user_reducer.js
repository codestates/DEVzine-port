import { SIGNIN_USER, SIGNUP_USER, SIGNOUT_USER } from '../_actions/types';

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
    default:
      return state;
  }
}
