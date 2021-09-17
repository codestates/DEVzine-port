import {
  SIGNIN_USER,
  SIGNOUT_USER,
  MYPAGE_USER,
  DELETE_USER,
} from '../_actions/types';

export default function (state = {}, action) {
  switch (action.type) {
    case SIGNIN_USER:
      return { ...state, signinSuccess: action.payload };
      break;
    case SIGNOUT_USER:
      return (state = {});
      break;
    case MYPAGE_USER:
      // return { ...state, signinSuccess: action.payload };
      return { ...state, patchSuccess: action.payload };
      break;
    case DELETE_USER:
      return (state = {});
      break;
    default:
      return state;
  }
}
