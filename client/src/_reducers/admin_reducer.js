import {
  SIGNIN_ADMIN,
  SIGNOUT_ADMIN,
  CONTRIBUTION_ADMIN,
} from '../_actions/types';

export default function (state = {}, action) {
  switch (action.type) {
    case SIGNIN_ADMIN:
      return { ...state, adminSigninSuccess: action.payload };
      break;
    case SIGNOUT_ADMIN:
      return (state = {});
      break;
    case CONTRIBUTION_ADMIN:
      return { ...state, manageContributionData: action.payload };
      break;
    default:
      return state;
  }
}
