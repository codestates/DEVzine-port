import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { signinUser } from '../../../_actions/user_actions';
import TextInputGenderRequired from './TextInputGenderRequired';
import Button from '../Button/Button';
import Union from '../../../assets/images/Union.png';
import { Link } from 'react-router-dom';

function SigninModal({ ModalOpen, setModalOpen }) {
  const dispatch = useDispatch();

  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const requiredTextInputData = [
    [Email, setEmail, '이메일 입력', 'email', '30'],
    [Password, setPassword, '비밀번호 입력', 'password', '20'],
  ];

  async function postHandler(e) {
    let body = {
      user_email: Email,
      user_password: Password,
    };

    console.log('SignInModal :', body);

    dispatch(signinUser(body)).then(res => {
      if (res.payload[0] === 'Login success') {
        window.location.reload();
      } else {
        alert('로그인 실패하였습니다.');
      }
    });
  }

  return ModalOpen ? (
    <div className="signincontainer">
      <div className="signinwrapper">
        <div className="signinheader">DEVzine</div>
        <Link to="/">
          <div
            className="backbtn"
            onClick={() => setModalOpen(false)}
            style={{ backgroundImage: `url(${Union})` }}
          ></div>
        </Link>
        {requiredTextInputData.map((el, idx) => {
          return (
            <TextInputGenderRequired
              key={`SignInTextInputGender${idx}`}
              stateName={el[0]}
              stateFunc={el[1]}
              placeholder={el[2]}
              type={el[3]}
              maxLength={el[4]}
            />
          );
        })}
        <Button
          subject={`로그인`}
          color={`#ffffff`}
          backgroundColor={`#191A20`}
          onClickHandle={postHandler}
        />
        <div className="leadsignup">아직 회원이 아니신가요?</div>
        <Link to="/signup">
          <Button
            subject={`회원가입`}
            color={`#191A20`}
            backgroundColor={`#FFDD14`}
            onClickHandle={() => setModalOpen(false)}
          />
        </Link>
      </div>
    </div>
  ) : null;
}

export default SigninModal;
