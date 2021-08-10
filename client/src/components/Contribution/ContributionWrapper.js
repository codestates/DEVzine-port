import React, { useState } from 'react';
import store from '../../store/store';

function ContributionWrapper() {
  const [keyword, setKeyword] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  let user_name = store.getState().user.signinSuccess[1];

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

    let body = {
      contribution_title: title,
      contribution_content: content,
      contibution_keyword: keyword,
    };

    return axios
      .post(`${END_POINT}/contribution`, body, { withCredentials: true })
      .then(res => {
        if (res.status === 200) alert('기고신청이 완료되었습니다.');
        else alert('기고신청이 실패하였습니다.');
      });
  }

  return (
    <>
      <div>{user_name}님의 얕고 넓은 지식을 기고해보세요.</div>
      <div>
        심사 후에 기고되며,
        <br />
        기고 관리는 마이페이지에 할 수 있어요.
      </div>
      <form onSubmit={e => onSubmitHandler(e)} className="signinform">
        <input
          type="text"
          onChange={e => onKeywordHandler(e)}
          placeholder="키워드"
        />

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
          nChange={e => onContentHandler(e)}
          placeholder="내용"
          className="contextarea"
        ></textarea>

        <br />
        <button type="submit">기고 신청</button>
      </form>
    </>
  );
}

export default ContributionWrapper;
