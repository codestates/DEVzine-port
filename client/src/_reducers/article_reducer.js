import {
  ARTICLE_DATA,
  ARTICLE_FILTER,
  CONTRIBUTION_DATA,
  CONTRIBUTION_FILTER,
  DELETE_DATA,
} from '../_actions/types';

export default function (state = {}, action) {
  switch (action.type) {
    case ARTICLE_DATA:
      return { ...state, articleData: action.payload };
      break;
    case ARTICLE_FILTER:
      return { ...state, articleData: action.payload };
      break;
    case CONTRIBUTION_DATA:
      return { ...state, allContributionData: action.payload };
      break;
    case CONTRIBUTION_FILTER:
      return { ...state, allContributionData: action.payload };
      break;
    case DELETE_DATA:
      return (state = {});
      break;
    default:
      return state;
  }
}
