import axios from 'axios';

const END_POINT = process.env.REACT_APP_API_URL;
axios.defaults.withCredentials = true; // 쿠키 데이터를 전송받기 위해

export const customAxios = axios.create({
  baseURL: `${END_POINT}`, // 기본 서버 주소 입력
});
