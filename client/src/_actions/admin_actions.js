import {
  SIGNOUT_ADMIN,
  SIGNIN_ADMIN,
  CONTRIBUTION_ADMIN,
  SEARCH_ADMIN,
  SEARCH_APP_ADMIN,
  DELETE_ADMIN_DATA,
} from './types';
import { customAxios } from '../utils/customAxios';

// 관리자 로그아웃
export async function signoutAdmin() {
  const request = await customAxios.post(`/user/signout`);

  return {
    type: SIGNOUT_ADMIN,
    payload: request.data.message,
  };
}

// 관리자 로그인
export async function signinAdmin(dataToSubmit) {
  const request = await customAxios
    .post(`/admin/signin`, dataToSubmit)
    .then(res => res.data.message);

  return {
    type: SIGNIN_ADMIN,
    payload: request,
  };
}

// 기고현황 정보
export async function getContributionAdmin() {
  const request = await customAxios
    .get(`/admin/contributionlist`)
    .then(res => res.data);

  return {
    type: CONTRIBUTION_ADMIN,
    payload: request,
  };
}

// 검색된 요청
export async function searchData(Select, Text) {
  const request = await customAxios
    .get(`/admin/contributionlist`)
    .then(res => res.data)
    .then(res => {
      if (Select === '') {
        return [
          ...res.data.requested.postRequest,
          ...res.data.requested.patchRequest,
          ...res.data.requested.deleteRequest,
        ];
      } else {
        return res.data.requested[Select];
      }
    })
    .then(res => {
      if (Text === '') {
        return res;
      } else {
        return res.filter(
          el => el.user_name.toLowerCase().indexOf(Text.toLowerCase()) !== -1,
        );
      }
    });

  return {
    type: SEARCH_ADMIN,
    payload: request,
  };
}

// 검색된 승인
export async function searchAppData(AppText) {
  const request = await customAxios
    .get(`/admin/contributionlist`)
    .then(res => res.data)
    .then(res => res.data.accepted)
    .then(res => {
      if (AppText === '') {
        return res;
      } else {
        return res.filter(
          el =>
            el.user_name.toLowerCase().indexOf(AppText.toLowerCase()) !== -1,
        );
      }
    });

  return {
    type: SEARCH_APP_ADMIN,
    payload: request,
  };
}

// state 초기화
export async function deleteAdminData() {
  const request = 'Delete admin data';

  return {
    type: DELETE_ADMIN_DATA,
    payload: request,
  };
}
