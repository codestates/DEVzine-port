import { ARTICLE_DATA, CONTRIBUTION_DATA, DELETE_DATA } from './types';
import { customAxios } from '../utils/customAxios';

export async function getArticleData() {
  const request = await customAxios.get(`/magazine`).then(res => {
    console.log(res.data);
    return [res.data.articleData, res.data.contributionData];
  });

  return {
    type: ARTICLE_DATA,
    payload: request,
  };
}

export async function getContributionData() {
  const request = await customAxios
    .get(`/magazine/contribution/all`)
    .then(res => res.data.data);

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
