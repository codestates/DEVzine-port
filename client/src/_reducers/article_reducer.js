import { ARTICLE_DATA, CONTRIBUTION_DATA } from '../_actions/types';

export default function (state = {}, action) {
  switch (action.type) {
    case ARTICLE_DATA:
      return { ...state, articleData: action.payload };
      break;
    // case ARTICLE_DATA:
    //   return Object.assign({}, state, {
    //     articleData: action.payload,
    //   });
    //   break;
    case CONTRIBUTION_DATA:
      return { ...state, allContributionData: action.payload };
      break;

    default:
      return state;
  }
}
