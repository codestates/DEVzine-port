import React, { useState, useEffect } from 'react';
import { checkEmail, checkPassword } from '../../utils/validation';
import { customAxios } from '../../utils/customAxios';
import Auth from '../../hoc/auth';
import TextInputGenderRequired from './TextInputGenderRequired';
import SigninModal from '../Common/SignInModal/SignInModal';
import AlertModal from '../Common/AlertModal/AlertModal';

function PasswordWrapper() {
  const [Email_isValid, setEmail_isValid] = useState(false);
  const [Pw_isValid, setPw_isValid] = useState(false);
  const [Pw_confirm, setPw_confirm] = useState(false);

  const [Email, setEmail] = useState('');
  const [Name, setName] = useState('');
  const [Password, setPassword] = useState('');
  const [ConfirmPassword, setConfirmPassword] = useState('');
  const [ModalOpen, setModalOpen] = useState(false);
  const [AlertOpen, setAlertOpen] = useState(false);
  const [SignUpFail, setSignUpFail] = useState(false);
  const [SignUpSuccess, setSignUpSuccess] = useState(false);
  const [AllVerified, setAllVerified] = useState(false);
  const [EmailNotVerified, setEmailNotVerified] = useState(false);
  const [AlreadyExist, setAlreadyExist] = useState(false);
  const [EmailUnverified, setEmailUnverified] = useState(false);
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
      '이메일로 인증코드가 발급됩니다',
      'email',
      Email_isValid,
      '30',
    ],
    [
      '인증코드',
      'user_name',
      Name,
      setName,
      '인증코드 10자리를 입력해주세요',
      'text',
      '',
      '10',
    ],
    [
      '새 비밀번호',
      'user_password',
      Password,
      setPassword,
      '8자 이상 입력해주세요',
      'password',
      Pw_isValid,
      '20',
    ],
    [
      '새 비밀번호 확인',
      'password_confirm',
      ConfirmPassword,
      setConfirmPassword,
      '비밀번호 확인',
      'password',
      Pw_confirm,
      '20',
    ],
  ];

  async function postHandler() {
    let body = {
      user_email: Email,
      user_password: Password,
      authcode: Name,
    };

    return await customAxios
      .post(`/user/password`, body)
      .then(res => {
        setSignUpSuccess(true);
        setModalOpen(true);
      })
      .catch(err => {
        if (err.message.includes(404)) {
          setEmailUnverified(true);
        } else if (err.message.includes(401)) {
          setSignUpFail(true);
        }
      });
  }

  async function emailVerify() {
    let body = {
      user_email: Email,
    };

    await customAxios
      .post(`/email/password`, body)
      .then(res => {
        setAlertOpen(true);
      })
      .catch(err => {
        if (err.message.includes(404)) {
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
    <div className="signupcontainer">
      <div className="container">
        <div className="row">
          <div className="col-sm-4">
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
                비밀번호 재설정
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
                    ? '10분 이내로 확인해주세요.'
                    : SignUpFail
                    ? '인증코드 확인해주세요.'
                    : SignUpSuccess
                    ? '비밀번호 변경하였습니다.'
                    : AllVerified
                    ? '모든 것을 만족해야 합니다.'
                    : EmailNotVerified
                    ? '이메일 형식을 확인해주세요.'
                    : AlreadyExist
                    ? '존재하지 않는 회원입니다.'
                    : EmailUnverified
                    ? '인증코드 확인이 필요합니다.'
                    : ''
                }
                alertBtn="확인"
              />
              <div className="signupcontainer-footer" />
            </div>
          </div>
        </div>
      </div>
      {ModalOpen ? (
        <SigninModal ModalOpen={ModalOpen} setModalOpen={setModalOpen} />
      ) : null}
    </div>
  );
}

export default PasswordWrapper;
