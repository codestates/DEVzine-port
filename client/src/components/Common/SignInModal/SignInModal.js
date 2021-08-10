import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { signinUser } from '../../../_actions/user_actions';

function SigninModal() {
  const dispatch = useDispatch();

  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');

  function onEmailHandler(e) {
    setEmail(e.currentTarget.value);
  }

  function onPasswordHandler(e) {
    setPassword(e.currentTarget.value);
  }

  function onSubmitHandler(e) {
    e.preventDefault();

    let body = {
      user_email: Email,
      user_password: Password,
    };

    console.log('SignInModal :', body);

    dispatch(signinUser(body)).then(res => {
      if (res.payload[0] === 'Login success') {
        window.location.href = '/';
      } else {
        alert('로그인 실패하였습니다.');
      }
    });
  }

  function signUpHandler() {
    window.location.href = '/signup';
  }

  return (
    <>
      <form onSubmit={e => onSubmitHandler(e)} className="signinform">
        <input
          type="email"
          onChange={e => onEmailHandler(e)}
          placeholder="이메일"
        />

        <br />
        <input
          type="password"
          onChange={e => onPasswordHandler(e)}
          placeholder="비밀번호"
        />

        <br />
        <button type="submit">로그인</button>
      </form>
      <button onClick={signUpHandler}>회원가입</button>
    </>
  );
}

export default SigninModal;
