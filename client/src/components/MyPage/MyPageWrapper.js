import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { mypageUser } from '../../_actions/user_actions';
import Auth from '../../hoc/auth';
import SigninModal from '../Common/SignInModal/SignInModal';

const END_POINT = process.env.REACT_APP_API_URL;

function MyPageWrapper() {
  const dispatch = useDispatch();

  const [userName, setUserName] = useState('');
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const getData = () => {
      axios
        .get(`${END_POINT}/mypage`, {
          withCredentials: true,
        })
        .then(res => {
          // setUserName(res.data.data.user_name);
          setUserName('test');
        })
        .catch(err => {
          alert('회원 정보를 받아오는데 실패하였습니다.');
        });
    };
    getData();
  }, []);

  useEffect(() => {
    const requrest = Auth(true);

    if (requrest === 'Login need') {
      setModalOpen(true);
    }
  });

  function onUserNameHandler(e) {
    setUserName(e.currentTarget.value);
  }

  function onSubmitHandler(e) {
    e.preventDefault();

    let body = {
      user_name: userName,
    };

    console.log('MyPageWrapper :', body);

    dispatch(mypageUser(body)).then(res => {
      if (res.payload[2] === 'Patch Success') {
        alert('정보수정하였습니다.');
        window.location.href = '/mypage';
      } else {
        alert('정보수정을 실패하였습니다.');
      }
    });
  }

  return (
    <>
      <form onSubmit={e => onSubmitHandler(e)} className="signinform">
        <input
          type="text"
          onChange={e => onUserNameHandler(e)}
          placeholder="닉네임"
          defaultValue={userName}
        />

        <br />
        <button type="submit">정보수정</button>
      </form>
      <br />
      <button onClick={() => (window.location.href = '/contributionupdate')}>
        기고 수정하기
      </button>
      {modalOpen ? (
        <SigninModal modalOpen={modalOpen} setModalOpen={setModalOpen} />
      ) : null}
    </>
  );
}

export default MyPageWrapper;
