import {
  SIGNOUT_ADMIN,
  SIGNIN_ADMIN,
  CONTRIBUTION_ADMIN,
  SEARCH_ADMIN,
  SEARCH_APP_ADMIN,
  DELETE_ADMIN_DATA,
} from './types';
import { customAxios } from '../utils/customAxios';

let fakeData = {
  data: {
    requested: {
      postRequest: [
        {
          contribution_id: 1,
          contribution_title: 'title1',
          user_name: 'name1',
          status: '승인요청',
        },
        {
          contribution_id: 2,
          contribution_title: 'title2',
          user_name: 'name2',
          status: '승인요청',
        },
      ],
      patchRequest: [
        {
          contribution_id: 3,
          contribution_title: 'title3',
          user_name: 'name3',
          status: '수정요청',
        },
        {
          contribution_id: 4,
          contribution_title: 'title4',
          user_name: 'name4',
          status: '수정요청',
        },
      ],
      deleteRequest: [
        {
          contribution_id: 5,
          contribution_title: 'title5',
          user_name: 'name5',
          status: '삭제요청',
        },
        {
          contribution_id: 6,
          contribution_title: 'title6',
          user_name: 'name6',
          status: '삭제요청',
        },
      ],
    },
    accepted: [
      {
        contribution_id: 7,
        contribution_title: 'title7',
        user_name: 'name7',
        status: '승인완료',
      },
      {
        contribution_id: 8,
        contribution_title: 'title8',
        user_name: 'name8',
        status: '승인완료',
      },
    ],
  },
  message: 'All contribution data success',
};

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
  const request = await customAxios.get(`/admin/contributionlist`).then(res => {
    // console.log(res.data.data);
    return res.data;
    // return fakeData;
  });
  // .then(res => res.data.data);

  return {
    type: CONTRIBUTION_ADMIN,
    payload: request,
  };
}

export async function SearchData(Select, Text) {
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
      console.log(res);
      if (Text === '') {
        return res;
      } else {
        return res.filter(el => el.user_name === Text);
      }
    });

  return {
    type: SEARCH_ADMIN,
    payload: request,
  };
}

export async function SearchAppData(AppText) {
  const request = await customAxios
    .get(`/admin/contributionlist`)
    .then(res => res.data)
    .then(res => res.data.accepted)
    .then(res => {
      if (AppText === '') {
        return res;
      } else {
        return res.filter(el => el.user_name === AppText);
      }
    });

  return {
    type: SEARCH_APP_ADMIN,
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
