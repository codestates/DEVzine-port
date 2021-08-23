import {
  SIGNOUT_ADMIN,
  SIGNIN_ADMIN,
  CONTRIBUTION_ADMIN,
  SEARCH_ADMIN,
  SEARCH_APP_ADMIN,
  DELETE_ADMIN_DATA,
} from './types';
import { customAxios } from '../utils/customAxios';

export async function signoutAdmin() {
  // const request = 'Logout success';
  const request = await customAxios.post(`/user/signout`);

  return {
    type: SIGNOUT_ADMIN,
    payload: request.data.message,
  };
}

export async function signinAdmin(dataToSubmit) {
  // const request = 'Login success';
  // TODO: axios 연결 뒤 주석 해제
  const request = await customAxios
    .post(`/admin/signin`, dataToSubmit)
    .then(res => res.data.message);

  return {
    type: SIGNIN_ADMIN,
    payload: request,
  };
}

export async function getContributionAdmin() {
  const request = await customAxios
    .get(`/admin/contributionlist`)
    .then(res => res.data);

  return {
    type: CONTRIBUTION_ADMIN,
    payload: request,
  };
}

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
        return res.filter(el => el.user_name.indexOf(Text) !== -1);
      }
    });

  return {
    type: SEARCH_ADMIN,
    payload: request,
  };
}

export async function searchAppData(AppText) {
  const request = await customAxios
    .get(`/admin/contributionlist`)
    .then(res => res.data)
    .then(res => res.data.accepted)
    .then(res => {
      if (AppText === '') {
        return res;
      } else {
        return res.filter(el => el.user_name.indexOf(AppText) !== -1);
      }
    });

  return {
    type: SEARCH_APP_ADMIN,
    payload: request,
  };
}

export async function deleteAdminData() {
  const request = 'Delete admin data';

  return {
    type: DELETE_ADMIN_DATA,
    payload: request,
  };
}
