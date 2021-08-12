import React, { useState, useEffect } from 'react';
import Auth from '../../hoc/auth';
import AlertModal from '../Common/AlertModal/AlertModal';
import { customAxios } from '../../utils/customAxios';
import SigninModal from '../Common/SignInModal/SignInModal';

function ContributionUpdateWrapper() {
  const [keyword, setKeyword] = useState('게임');
  const [title, setTitle] = useState('nothing');
  const [content, setContent] = useState('nothing');
  const [modalOpen, setModalOpen] = useState(false);
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

  useEffect(async () => {
    const requestGet = await customAxios
      .get('/magazine/contribution')
      .then(res => res.data.data.contribution_keyword)
      .catch(err => alert('기고 정보를 받아오는데 실패하였습니다.'));

    setKeyword(requestGet);
    // setKeyword(requestGet.contribution_keyword);
    // setTitle(requestGet.contribution_title);
    // setContent(requestGet.contribution_content);
  }, []);

  useEffect(() => {
    const requrest = Auth(true);

    if (requrest === 'Login need') {
      setModalOpen(true);
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

    return customAxios.post('/contribution', body).then(res => {
      if (res.status === 200) {
        alert('기고수정요청이 완료되었습니다.');
        // window.location.href = '/mypage';
      } else alert('기고수정요청이 실패하였습니다.');
    });
  }

  const closeModal = () => {
    setAlertOpen(false);
  };

  return (
    <>
      <form onSubmit={e => onSubmitHandler(e)} className="signinform">
        <select onChange={e => onKeywordHandler(e)} value={keyword}>
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
          defaultValue={title}
        />

        <br />
        <textarea
          cols="50"
          rows="10"
          nChange={e => onContentHandler(e)}
          placeholder="내용"
          className="contextarea"
          defaultValue={content}
        ></textarea>

        <br />
        <button type="submit">기고 수정</button>
        <button onClick={() => (window.location.href = '/mypage')}>
          목록으로
        </button>
      </form>
      <div>수정 완료 후엔 심사가 다시 시작해요.</div>
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

export default ContributionUpdateWrapper;
