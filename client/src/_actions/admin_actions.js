import {
  SIGNOUT_ADMIN,
  SIGNIN_ADMIN,
  CONTRIBUTION_ADMIN,
  DELETE_ADMIN_DATA,
} from './types';
import { customAxios } from '../utils/customAxios';

export async function signoutAdmin() {
  const request = await customAxios
    .post(`/user/signout`)
    .then(res => res.data.message);

  return {
    type: SIGNOUT_ADMIN,
    payload: request,
  };
}

export async function signinAdmin(dataToSubmit) {
  const request = 'Login success';
  // TODO: axios 연결 뒤 주석 해제
  // const request = await customAxios
  //   .post(`/admin/signin`, dataToSubmit)
  //   .then(res => res.data.message);

  return {
    type: SIGNIN_ADMIN,
    payload: request,
  };
}

export async function getContributionAdmin() {
  const request = await customAxios
    .get(`/admin/contributionlist`)
    .then(res => res.data.data);

  return {
    type: CONTRIBUTION_ADMIN,
    payload: request,
  };
}

export async function DeleteAdminData() {
  const request = 'Delete admin data';

  return {
    type: DELETE_ADMIN_DATA,
    payload: request,
  };
}
