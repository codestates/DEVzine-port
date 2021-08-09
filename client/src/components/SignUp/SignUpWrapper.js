import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { signupUser } from '../../_actions/user_actions';

function SignUpWrapper() {
  const dispatch = useDispatch();

  const [Email, setEmail] = useState('');
  const [Name, setName] = useState('');
  const [Password, setPassword] = useState('');
  const [ConfirmPassword, setConfirmPassword] = useState('');

  function onEmailHandler(e) {
    setEmail(e.currentTarget.value);
  }

  function onNameHandler(e) {
    setName(e.currentTarget.value);
  }

  function onPasswordHandler(e) {
    setPassword(e.currentTarget.value);
  }

  function onConfirmPasswordHandler(e) {
    setConfirmPassword(e.currentTarget.value);
  }

  function onSubmitHandler(e) {
    e.preventDefault();

    if (Password !== ConfirmPassword) {
      return alert('비밀번호와 비밀번호 확인은 같아야 합니다.');
    }

    let body = {
      user_email: Email,
      user_password: Password,
      user_name: Name,
      user_info: {
        user_gender: 'female',
        user_age: '20대',
        user_position: '프론트엔드',
        user_language: 'javascript',
      },
    };

    console.log('SignUpWrapper :', body);

    dispatch(signupUser(body)).then(res => {
      if (res.payload === 'User created') {
        window.location.href = '/signin';
      } else {
        alert('회원가입 실패하였습니다.');
      }
    });
  }

  return (
    <>
      <form onSubmit={e => onSubmitHandler(e)} className="signupform">
        <label htmlFor="email">이메일</label>
        <input
          type="email"
          id="email"
          value={Email}
          onChange={e => onEmailHandler(e)}
          placeholder="이메일"
        />

        <br />
        <label htmlFor="password">비밀번호</label>
        <input
          type="password"
          id="password"
          value={Password}
          onChange={e => onPasswordHandler(e)}
          placeholder="비밀번호"
        />

        <br />
        <label htmlFor="confirmpassword">비밀번호 확인</label>
        <input
          type="password"
          id="confirmpassword"
          value={ConfirmPassword}
          onChange={e => onConfirmPasswordHandler(e)}
          placeholder="비밀번호 확인"
        />

        <br />
        <label htmlFor="username">닉네임</label>
        <input
          type="text"
          id="username"
          value={Name}
          onChange={e => onNameHandler(e)}
          placeholder="닉네임"
        />

        <br />
        <button type="submit">회원가입</button>
      </form>
    </>
  );
}

export default SignUpWrapper;
