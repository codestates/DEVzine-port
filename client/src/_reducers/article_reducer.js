import {
  ARTICLE_DATA,
  ARTICLE_HIT_DATA,
  CONTRIBUTION_DATA,
  CONTRIBUTION_HIT_DATA,
  DELETE_DATA,
} from '../_actions/types';

export default function (state = {}, action) {
  switch (action.type) {
    case ARTICLE_DATA:
      return { ...state, articleData: action.payload };
      break;
    case ARTICLE_HIT_DATA:
      return { ...state, articleHitData: action.payload };
      break;
    case CONTRIBUTION_DATA:
      return { ...state, allContributionData: action.payload };
      break;
    case CONTRIBUTION_HIT_DATA:
      return { ...state, allContributionHitData: action.payload };
      break;
    case DELETE_DATA:
      return (state = {});
      break;
    default:
      return state;
  }
}
