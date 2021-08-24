// user_actions
// 로그인, 로그아웃(state 초기화), 마이페이지, 회원탈퇴(state 초기화)
export const SIGNIN_USER = 'signin_user';
export const SIGNOUT_USER = 'signout_user';
export const MYPAGE_USER = 'mypage_user';
export const DELETE_USER = 'delete_admin';

// article_actions
// 기사 정보, 검색된 기사, 기고 정보, 검색된 기고, state 초기화
export const ARTICLE_DATA = 'article_data';
export const ARTICLE_FILTER = 'article_filter';
export const CONTRIBUTION_DATA = 'contribution_data';
export const CONTRIBUTION_FILTER = 'contribution_filter';
export const DELETE_DATA = 'delete_data';

// admin_actions
// 관리자 로그인, 관리자 로그아웃, 기고현황 정보, 검색된 요청, 검색된 승인, state 초기화
export const SIGNIN_ADMIN = 'signin_admin';
export const SIGNOUT_ADMIN = 'signout_admin';
export const CONTRIBUTION_ADMIN = 'contribution_admin';
export const SEARCH_ADMIN = 'search_admin';
export const SEARCH_APP_ADMIN = 'search_app_admin';
export const DELETE_ADMIN_DATA = 'delete_data';
