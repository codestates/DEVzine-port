import {
  ARTICLE_DATA,
  CONTRIBUTION_DATA,
  DELETE_DATA,
} from '../_actions/types';

export default function (state = {}, action) {
  switch (action.type) {
    case ARTICLE_DATA:
      return { ...state, articleData: action.payload };
      break;
    case CONTRIBUTION_DATA:
      return { ...state, allContributionData: action.payload };
      break;
    case DELETE_DATA:
      return (state = {});
      break;
    default:
      return state;
  }
}
