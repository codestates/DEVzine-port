import React, { useState, useEffect } from 'react';
import axios from 'axios';
import store from '../../store/store';
import Auth from '../../hoc/auth';
import AlertModal from '../Common/AlertModal/AlertModal';
import SigninModal from '../Common/SignInModal/SignInModal';

const END_POINT = process.env.REACT_APP_API_URL;

function ContributionWrapper() {
  const [keyword, setKeyword] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [userName, setUserName] = useState('');
  const [alertOpen, setAlertOpen] = useState(false);

  let selectOptions = [
    '게임',
    '모바일',
    '보안',
    '블록체인',
    '빅데이터',
    '코딩',
    '클라우드',
    '퍼스널 컴퓨팅',
    'AI/로봇',
  ];

  useEffect(() => {
    const requrest = Auth(true);

    if (requrest === 'Login need') {
      setModalOpen(true);
    } else {
      setUserName(store.getState().user.signinSuccess[1]);
    }
  });

  function onKeywordHandler(e) {
    setKeyword(e.currentTarget.value);
  }

  function onTitleHandler(e) {
    setTitle(e.currentTarget.value);
  }

  function onContentHandler(e) {
    setContent(e.currentTarget.value);
  }

  function onSubmitHandler(e) {
    e.preventDefault();

    if (title === '' || content === '' || keyword === '') {
      return setAlertOpen(true);
    }

    let body = {
      contribution_title: title,
      contribution_content: content,
      contibution_keyword: keyword,
    };

    return axios
      .post(`${END_POINT}/contribution`, body, { withCredentials: true })
      .then(res => {
        if (res.status === 200) {
          alert('기고신청이 완료되었습니다.');
          // window.history.back();
        } else alert('기고신청이 실패하였습니다.');
      });
  }

  const closeModal = () => {
    setAlertOpen(false);
  };

  return (
    <>
      <div>{userName}님의 얕고 넓은 지식을 기고해보세요.</div>
      <div>
        심사 후에 기고되며,
        <br />
        기고 관리는 마이페이지에 할 수 있어요.
      </div>
      <form onSubmit={e => onSubmitHandler(e)} className="signinform">
        <select onChange={e => onKeywordHandler(e)}>
          <option value="">키워드 선택</option>
          {selectOptions.map(option => (
            <option value={option}>{option}</option>
          ))}
        </select>

        <br />
        <input
          type="text"
          onChange={e => onTitleHandler(e)}
          placeholder="제목"
        />

        <br />
        <textarea
          cols="50"
          rows="10"
          onChange={e => onContentHandler(e)}
          placeholder="내용"
          className="contextarea"
        ></textarea>

        <br />
        <button type="submit">기고 신청</button>
      </form>
      <div className="alermodalbox">
        <AlertModal
          open={alertOpen}
          close={closeModal}
          alertString={'모두 입력해야 합니다.'}
          alertBtn="확인"
        />
      </div>
      {modalOpen ? (
        <SigninModal modalOpen={modalOpen} setModalOpen={setModalOpen} />
      ) : null}
    </>
  );
}

export default ContributionWrapper;
