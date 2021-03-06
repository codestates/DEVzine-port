import React, { useState, useEffect } from 'react';
import { checkEmail, checkPassword } from '../../utils/validation';
import { customAxios } from '../../utils/customAxios';
import Auth from '../../hoc/auth';
import TextInputGenderRequired from './TextInputGenderRequired';
import Accordion from './Accordion';
import SigninModal from '../Common/SignInModal/SignInModal';
import AlertModal from '../Common/AlertModal/AlertModal';
import AcessTerms from './AccessTerms';

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
  const [AlertOpen, setAlertOpen] = useState(false);
  const [SignUpFail, setSignUpFail] = useState(false);
  const [SignUpSuccess, setSignUpSuccess] = useState(false);
  const [AllVerified, setAllVerified] = useState(false);
  const [EmailNotVerified, setEmailNotVerified] = useState(false);
  const [AlreadyExist, setAlreadyExist] = useState(false);
  const [EmailUnverified, setEmailUnverified] = useState(false);
  const [AllChecked, setAllChecked] = useState(false);

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
  }, [Email, Password, ConfirmPassword, AllChecked]);

  useEffect(() => {
    Auth(false);
    setEmail_isValid(true);
    setPw_isValid(true);
  }, []);

  const requiredTextInputData = [
    [
      '?????????',
      'user_email',
      Email,
      setEmail,
      '?????????',
      'email',
      Email_isValid,
      '30',
    ],
    [
      '????????????',
      'user_password',
      Password,
      setPassword,
      '8??? ?????? ??????????????????',
      'password',
      Pw_isValid,
      '20',
    ],
    [
      '???????????? ??????',
      'password_confirm',
      ConfirmPassword,
      setConfirmPassword,
      '???????????? ??????',
      'password',
      Pw_confirm,
      '20',
    ],
    ['?????????', 'user_name', Name, setName, '?????? ??????', 'text', '', '15'],
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

    return await customAxios
      .post(`/user/signup`, body)
      .then(res => {
        setSignUpSuccess(true);
        setModalOpen(true);
      })
      .catch(err => {
        if (err.message.includes(401)) {
          setEmailUnverified(true);
        } else if (err.message.includes(404)) {
          setSignUpFail(true);
        } else if (err.message.includes(409)) {
          setAlreadyExist(true);
        }
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
    if (name === '??????') {
      setAge(e.value);
    } else if (name === '??????') {
      setPosition(e.value);
    } else if (name === '??????') {
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
    await customAxios
      .post(`/email/req`, body)
      .then(res => {
        setAlertOpen(true);
      })
      .catch(err => {
        if (err.message.includes(400)) {
          setAlreadyExist(true);
        }
      });
  }

  function closeModal() {
    setAlertOpen(false);
    setSignUpFail(false);
    setSignUpSuccess(false);
    setAllVerified(false);
    setEmailNotVerified(false);
    setAlreadyExist(false);
    setEmailUnverified(false);
  }
  return (
    <>
      <div className="signupcontainer">
        <div className="container">
          <div className="row">
            <div className="col-sm-4 col-md-12 col-lg-12">
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
                      Email={Email}
                      Email_isValid={Email_isValid}
                      emailVerify={emailVerify}
                      setEmailNotVerified={setEmailNotVerified}
                    />
                  );
                })}
                <Accordion
                  radioInputHandler={radioInputHandler}
                  selectInputHandler={selectInputHandler}
                />
                <AcessTerms setAllChecked={setAllChecked} />
                <div
                  className="signupbtn"
                  onClick={e =>
                    Email &&
                    Password &&
                    ConfirmPassword &&
                    Name &&
                    Email_isValid &&
                    Pw_isValid &&
                    Pw_confirm &&
                    AllChecked
                      ? postHandler()
                      : setAllVerified(true)
                  }
                >
                  ????????????
                </div>
                <AlertModal
                  open={
                    AlertOpen ||
                    SignUpFail ||
                    SignUpSuccess ||
                    AllVerified ||
                    EmailNotVerified ||
                    AlreadyExist ||
                    EmailUnverified
                  }
                  close={closeModal}
                  alertString={
                    AlertOpen
                      ? '30??? ????????? ??????????????????.'
                      : SignUpFail
                      ? '??????????????? ?????????????????????.'
                      : SignUpSuccess
                      ? '??????????????? ?????????????????????.'
                      : AllVerified
                      ? '?????? ?????? ???????????? ?????????.'
                      : EmailNotVerified
                      ? '????????? ????????? ??????????????????.'
                      : AlreadyExist
                      ? '?????? ???????????? ???????????????.'
                      : EmailUnverified
                      ? '????????? ????????? ???????????????.'
                      : ''
                  }
                  alertBtn="??????"
                />
                <div className="signupcontainer-footer" />
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
