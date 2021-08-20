import {
  ARTICLE_DATA,
  ARTICLE_HIT_DATA,
  ARTICLE_FILTER,
  CONTRIBUTION_DATA,
  CONTRIBUTION_HIT_DATA,
  CONTRIBUTION_FILTER,
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

// filter가 다 된다면 Hit없애도 된다.
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

export async function filterArticleData(body) {
  const request = await customAxios
    .get(`/magazine/`)
    .then(res => res.data.articleData)
    .then(res => {
      if (body.CurrentKeyword === '전체' || body.CurrentKeyword === '') {
        return res;
      } else {
        console.log(body.CurrentKeyword);
        return res.filter(el => el.article_keyword === body.CurrentKeyword);
      }
    })
    .then(res => {
      if (body.CurrentTitle === '') {
        return res;
      } else {
        console.log(body.CurrentTitle);
        return res.filter(el => el.article_title === body.CurrentTitle);
      }
    })
    .then(res => {
      if (body.CurrentOrder === '최신순') {
        return res;
      } else {
        return res.sort((a, b) => b.hit - a.hit);
      }
    });

  return {
    type: ARTICLE_FILTER,
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

// filter가 다 된다면 Hit없애도 된다.
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
