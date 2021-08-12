import React, { useState, useEffect } from 'react';
import axios from 'axios';
import store from '../../store/store';
import { checkEmail } from '../../utils/validation';
import AlertModal from '../Common/AlertModal/AlertModal';
import Button from '../Common/Button/Button';

const END_POINT = process.env.REACT_APP_API_URL;

function SubscriptionWrapper() {
  const [signIn, setSignIn] = useState(false);
  const [Email, setEmail] = useState('');
  const [email_isValid, setEmail_isValid] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    if (store.getState().user.signinSuccess) {
      if (store.getState().user.signinSuccess[0] === 'Login success') {
        setSignIn(true);
      } else {
        setSignIn(false);
      }
    } else {
      setSignIn(false);
    }
  }, []);

  function onEmailHandler(e) {
    setEmail(e.currentTarget.value);

    if (!checkEmail(Email)) {
      setEmail_isValid(false);
    } else {
      setEmail_isValid(true);
    }
  }

  function onSubmitHandler(e) {
    e.preventDefault();

    if (Email === '' || !checkEmail(Email)) {
      return setModalOpen(true);
    }

    let body = { user_email: Email };

    return axios
      .post(`${END_POINT}/subscribe`, body, { withCredentials: true })
      .then(res => {
        if (res.status === 200) alert('구독신청이 완료되었습니다.');
        else alert('구독신청이 실패하였습니다.');
      });
  }

  function subscriptionHandler() {
    return axios
      .post(`${END_POINT}/subscribe`, { withCredentials: true })
      .then(res => {
        if (res.status === 200) alert('구독신청이 완료되었습니다.');
        else alert('구독신청이 실패하였습니다.');
      });
  }

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div className="subscriptioncontainer">
      <div className="subinnner">
        <div className="subtext">
          개발하는 당신을 위한 얕고 넓은 지식을 <br />
          메일로 받아보세요.
        </div>
        <div className="subtextsmall">월~토요일 매일 오전 7시 발송</div>
        {signIn ? (
          <div>
            <div className="subpostbtn">
              <Button
                subject="구독하기"
                color="#fff"
                backgroundColor="black"
                onClickHandle={subscriptionHandler}
              />
            </div>
            <div className="subtextsmall2">
              가입하신 메일로 소식을 보내드려요.
            </div>
          </div>
        ) : (
          <div className="nonesubinner">
            <form onSubmit={e => onSubmitHandler(e)} className="signinform">
              <div className="emailalerttext">
                {email_isValid
                  ? ''
                  : '이메일 형식에 맞게 다시 작성해 주십시오.'}
              </div>
              <input
                type="email"
                onChange={e => onEmailHandler(e)}
                placeholder="이메일 입력"
                className="emailinput"
              />

              <br />
              <button type="submit" className="subemailbtn">
                <Button
                  subject="구독하기"
                  color="#fff"
                  backgroundColor="black"
                  onClickHandle={() => (window.location.href = '/signup')}
                />
              </button>
            </form>
            <div className="subjoinbox">
              <div className="subtextsmall1">Tip.</div>
              <div className="subtextsmall2">
                회원가입하면 구독 관리가 편리해요.
              </div>
              <div className="subjoinbtn">
                <Button
                  subject="회원가입하기"
                  color="#191a20"
                  backgroundColor="#ffdd14"
                  onClickHandle={() => (window.location.href = '/signup')}
                />
              </div>
            </div>
          </div>
        )}
        <div className="alermodalbox">
          <AlertModal
            open={modalOpen}
            close={closeModal}
            alertString={'이메일을 작성해야 합니다.'}
            alertBtn="확인"
          />
        </div>
      </div>
    </div>
  );
}

export default SubscriptionWrapper;
