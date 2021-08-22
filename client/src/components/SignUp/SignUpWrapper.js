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

  const [Email, setEmail] = useState('');
  const [Name, setName] = useState('');
  const [Password, setPassword] = useState('');
  const [ConfirmPassword, setConfirmPassword] = useState('');
  const [Gender, setGender] = useState('');
  const [Age, setAge] = useState('');
  const [Position, setPosition] = useState('');
  const [Language, setLanguage] = useState([]);
  const [ModalOpen, setModalOpen] = useState(false);
  const [AlertOpen, setAlertOpen] = useState(false); //email인증 눌렀을 때 쓰는 것
  const [SignUpFail, setSignUpFail] = useState(false); //회원가입에 실패 시
  const [SignUpSuccess, setSignUpSuccess] = useState(false); //회원가입에 성공 시
  const [AllVerified, setAllVerified] = useState(false); //회원가입 조건을 충족했는지 ?

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
      .then(res => {
        setSignUpSuccess(true);
        setModalOpen(true);
      })
      .catch(err => {
        setSignUpFail(true);
      });
  }

  function radioInputHandler() {
    let checkGender = document.querySelectorAll('.radioinput');
    for (let el of checkGender) {
      if (el.checked === true) {
        setGender(el.value);
      }
    }
  }

  function selectInputHandler(e, name) {
    if (name === '나이') {
      setAge(e.value);
    } else if (name === '직무') {
      setPosition(e.value);
    } else if (name === '언어') {
      const languageArr = e.map(el => {
        return el.value;
      });
      setLanguage(languageArr);
    }
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
    setSignUpFail(false);
    setSignUpSuccess(false);
    setAllVerified(false);
  };
  return (
    <>
      <div className="signupcontainer">
        <div className="container">
          <div className="row">
            <div className="col-sm-4 col-md-12 col-lg-12">
              <div className="signupwrapper">
                <div className="textinputcontainer">
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
                </div>
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
                      : setAllVerified(true)
                  }
                >
                  회원가입
                </div>
                <div className="signupwrapper-footer" />
                <AlertModal
                  open={AlertOpen || SignUpFail || SignUpSuccess || AllVerified}
                  close={closeModal}
                  alertString={
                    AlertOpen
                      ? '30분 이내로 확인해주세요.'
                      : SignUpFail
                      ? '회원가입에 실패하였습니다.'
                      : SignUpSuccess
                      ? '회원가입에 성공하였습니다.'
                      : AllVerified
                      ? '모든 것을 만족해야 합니다.'
                      : ''
                  }
                  alertBtn="확인"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      {ModalOpen ? (
        <SigninModal ModalOpen={ModalOpen} setModalOpen={setModalOpen} />
      ) : null}
    </>
  );
}

export default SignUpWrapper;
