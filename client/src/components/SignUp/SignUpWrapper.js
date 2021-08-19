import React, { useState, useEffect } from 'react';
import { checkEmail, checkPassword } from '../../utils/validation';
import { customAxios } from '../../utils/customAxios';
import Auth from '../../hoc/auth';
import TextInputGenderRequired from './TextInputGenderRequired';
import Accordion from './Accordion';
import SigninModal from '../Common/SignInModal/SignInModal';
import AlertModal from '../Common/AlertModal/AlertModal';

function SignUpWrapper() {
  const [Email_isValid, setEmail_isValid] = useState(false);
  const [Pw_isValid, setPw_isValid] = useState(false);
  const [Pw_confirm, setPw_confirm] = useState(false);
  const [AlertOpen, setAlertOpen] = useState(false);

  const [Email, setEmail] = useState('');
  const [Name, setName] = useState('');
  const [Password, setPassword] = useState('');
  const [ConfirmPassword, setConfirmPassword] = useState('');
  const [Gender, setGender] = useState('');
  const [Age, setAge] = useState('');
  const [Position, setPosition] = useState('');
  const [Language, setLanguage] = useState([]);
  const [ModalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    if (checkEmail(Email)) {
      setEmail_isValid(true);
    } else {
      setEmail_isValid(false);
    }

    if (checkPassword(Password)) {
      setPw_isValid(true);
    } else {
      setPw_isValid(false);
    }
    if (Password === ConfirmPassword) {
      setPw_confirm(true);
    } else {
      setPw_confirm(false);
    }
  }, [Email, Password, ConfirmPassword]);

  useEffect(() => {
    Auth(false);
    setEmail_isValid(true);
    setPw_isValid(true);
  }, []);
  const requiredTextInputData = [
    [
      '이메일',
      'user_email',
      Email,
      setEmail,
      '이메일',
      'email',
      Email_isValid,
      '30',
    ],
    [
      '비밀번호',
      'user_password',
      Password,
      setPassword,
      '8자 이상 입력해주세요',
      'password',
      Pw_isValid,
      '20',
    ],
    [
      '비밀번호 확인',
      'password_confirm',
      ConfirmPassword,
      setConfirmPassword,
      '비밀번호 확인',
      'password',
      Pw_confirm,
      '20',
    ],
    ['닉네임', 'user_name', Name, setName, '유저 이름', 'text', '', '15'],
  ];

  async function postHandler() {
    selectInputHandler();

    let multiArr = [];

    let multiValues = document.querySelectorAll('.basicmulti div:nth-child(3)');
    if (multiValues.length - 1 !== 0 && multiValues[multiValues.length - 1]) {
      for (let el of multiValues[multiValues.length - 1].childNodes) {
        multiArr.push(el.attributes[2].value);
      }
      setLanguage(multiArr);
    } else {
      setLanguage([]);
    }

    let body = {
      user_email: Email,
      user_password: Password,
      user_name: Name,
      user_info: {
        user_gender: Gender,
        user_age: Age,
        user_position: Position,
        user_language: Language,
      },
    };

    console.log('SignUpWrapper :', body);

    return await customAxios
      .post(`/user/signup`, body)
      .then(res => setModalOpen(true))
      .catch(err => alert('회원가입 실패하였습니다.'));
  }

  function radioInputHandler() {
    let checkGender = document.querySelectorAll('.radioinput');
    for (let el of checkGender) {
      if (el.checked === true) {
        setGender(el.value);
      }
    }
  }

  function selectInputHandler() {
    let singleValues = document.querySelectorAll(
      '.basicsingle input:nth-child(3)',
    );
    let singleArr = [];

    for (let el of singleValues) {
      singleArr.push(el.value);
    }

    setAge(singleArr[0]);
    setPosition(singleArr[1]);
  }

  async function emailVerify() {
    let body = {
      user_email: Email,
    };
    setAlertOpen(true);
    const request = await customAxios.post(`/email/req`, body).then(res => {
      console.log(res);
      return res;
    });
    return request;
  }

  const closeModal = () => {
    setAlertOpen(false);
  };
  return (
    <div className="signupcontainer">
      <div className="signupwrapper">
        {requiredTextInputData.map((el, idx) => {
          return (
            <TextInputGenderRequired
              key={`TextInputGenderRequired${idx}`}
              inputname={el[0]}
              detailString={el[1]}
              stateName={el[2]}
              stateFunc={el[3]}
              placeholder={el[4]}
              type={el[5]}
              isValid={el[6]}
              maxLength={el[7]}
              emailVerify={emailVerify}
            />
          );
        })}
        <Accordion
          radioInputHandler={radioInputHandler}
          selectInputHandler={selectInputHandler}
        />
        <div
          className="signupbtn"
          onClick={e =>
            Email &&
            Password &&
            ConfirmPassword &&
            Name &&
            Email_isValid &&
            Pw_isValid &&
            Pw_confirm
              ? postHandler()
              : alert('모든 것을 만족해야 합니다.')
          }
        >
          회원가입
        </div>
      </div>
      {ModalOpen ? (
        <SigninModal ModalOpen={ModalOpen} setModalOpen={setModalOpen} />
      ) : null}
      <AlertModal
        open={AlertOpen}
        close={closeModal}
        alertString={'30분 이내로 확인해주세요.'}
        alertBtn="확인"
      />
    </div>
  );
}

export default SignUpWrapper;
