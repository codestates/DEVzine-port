import axios from 'axios';

const END_POINT = process.env.REACT_APP_API_URL;

export const customAxios = axios.create({
  baseURL: END_POINT, // 기본 서버 주소 입력
  withCredentials: true,
  credential: 'include',
  headers: {
    'Content-Type': 'application/json',
  },
});
