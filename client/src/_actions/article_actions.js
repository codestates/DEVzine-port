import {
  ARTICLE_DATA,
  ARTICLE_HIT_DATA,
  CONTRIBUTION_DATA,
  CONTRIBUTION_HIT_DATA,
  DELETE_DATA,
} from './types';
import { customAxios } from '../utils/customAxios';

export async function getArticleData() {
  const request = await customAxios
    .get(`/magazine`)
    .then(res => [res.data.articleData, res.data.contributionData]);

  return {
    type: ARTICLE_DATA,
    payload: request,
  };
}

export async function getArticleHitData() {
  const request = await customAxios
    .get(`/magazine`)
    .then(res => res.data.articleData)
    .then(res => res.sort((a, b) => b.hit - a.hit));

  return {
    type: ARTICLE_HIT_DATA,
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

export async function getContributionHitData() {
  const request = await customAxios
    .get(`/magazine/contribution/all`)
    .then(res => res.data.data)
    .then(res => res.sort((a, b) => b.hit - a.hit));

  return {
    type: CONTRIBUTION_HIT_DATA,
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
