import { ARTICLE_DATA, CONTRIBUTION_DATA, DELETE_DATA } from './types';
import { customAxios } from '../utils/customAxios';

export async function getArticleData() {
  // const request = 'article data';
  const request = await customAxios
    .get(`/magazine`)
    .then(res => res.data.articleData);

  return {
    type: ARTICLE_DATA,
    payload: request,
  };
}

export async function getContributionData() {
  const request = await customAxios
    .get(`/magazine/contribution/all`)
    .then(res => '이것도 들어가나2');
  // .then(res => res.data.data);

  return {
    type: CONTRIBUTION_DATA,
    payload: request,
  };
}

export async function DeleteData() {
  const request = 'Delete data';

  return {
    type: DELETE_DATA,
    payload: request,
  };
}
