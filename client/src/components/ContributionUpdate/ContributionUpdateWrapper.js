import axios from 'axios';
import React, { useState, useEffect } from 'react';

const END_POINT = process.env.REACT_APP_API_URL;

function ContributionUpdateWrapper() {
  const [keyword, setKeyword] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    const getData = () => {
      axios
        .get(`${END_POINT}/magazine/contribution`, {
          withCredentials: true,
        })
        .then(res => {
          // setKeyword(res.data.data.contribution_keyword);
          setKeyword('test');
          setTitle(res.data.data.contribution_title);
          setContent(res.data.data.contribution_content);
        })
        .catch(err => {
          alert('기고 정보를 받아오는데 실패하였습니다.');
        });
    };
    getData();
  }, []);

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
        if (res.status === 200) alert('기고수정요청이 완료되었습니다.');
        else alert('기고수정요청이 실패하였습니다.');
      });
  }

  return (
    <>
      <form onSubmit={e => onSubmitHandler(e)} className="signinform">
        <input
          type="text"
          onChange={e => onKeywordHandler(e)}
          placeholder="키워드"
          defaultValue={keyword}
        />

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
    </>
  );
}

export default ContributionUpdateWrapper;
