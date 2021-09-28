import React, { useState, useEffect } from 'react';
import store from '../../store/store';
import { checkEmail } from '../../utils/validation';
import AlertModal from '../Common/AlertModal/AlertModal';
import Button from '../Common/Button/Button';
import { customAxios } from '../../utils/customAxios';
import Auth from '../../hoc/auth';

function SubscriptionWrapper() {
  const [SignIn, setSignIn] = useState(false);
  const [UserEmail, setUserEmail] = useState(null);
  const [Email, setEmail] = useState(null);
  const [Email_isValid, setEmail_isValid] = useState(true);
  const [AlertOpen, setAlertOpen] = useState(false);
  const [BlackInput, setBlackInput] = useState(false);
  const [EmailSubSuc, setEmailSubSuc] = useState(false);
  const [Subscribed, setSubscribed] = useState(false);

  // 로그인 여부
  useEffect(() => {
    const request = Auth(true);

    if (request !== 'Login need' && request !== 'Admin login success') {
      setSignIn(true);
      // TODO: store.getState().user.signinSuccess[2] === 'Patch success' 여서 서버 쪽에 계속 Patch Success 로 들어옴, store 에는 현재 이메일이 보관되어 있지 않은듯
      // TODO: setUserEmail(store.getState().user.signinSuccess[2]);
      console.log(store.getState().user.signinSuccess[2]);
    } else {
      setSignIn(false);
    }
  }, []);

  // 이메일 입력
  function onEmailHandler(e) {
    setEmail(e.currentTarget.value);

    if (!checkEmail(Email)) {
      setEmail_isValid(false);
    } else {
      setEmail_isValid(true);
    }
  }

  // 비회원 구독 신청
  function onSubmitHandler(e) {
    e.preventDefault();

    if (Email === '' || !checkEmail(Email)) {
      setBlackInput(true);
      return setAlertOpen(true);
    }

    setBlackInput(false);

    let body = { user_email: Email };

    return customAxios
      .post('/subscribe', body)
      .then(res => {
        if (res.status === 200) {
          setEmailSubSuc(true);
          setAlertOpen(true);
        } else {
          setEmailSubSuc(false);
          setAlertOpen(true);
        }
      })
      .catch(err => setAlertOpen(true));
  }

  // 회원 구독 신청
  function subscriptionHandler() {
    // TODO: body 내용 수정
    // let body = { user_email: UserEmail };
    let body = { user_email: store.getState().user.signinSuccess[2] };
    console.log(body);

    return customAxios
      .post('/subscribe', body)
      .then(res => {
        if (res.status === 200) {
          setEmailSubSuc(true);
          setAlertOpen(true);
        } else {
          setEmailSubSuc(false);
          setAlertOpen(true);
        }
      })
      .catch(err => {
        setSubscribed(true);
        setAlertOpen(true);
      });
  }

  // 모달 닫기
  function closeModal() {
    setAlertOpen(false);

    if (BlackInput === false && EmailSubSuc === true) {
      window.location.href = '/';
    }
  }

  return (
    <>
      <div className="subscriptioncontainer stopdragging">
        <div className="container">
          <div className="row">
            <div className="col-sm-4">
              <div className="subinnner">
                <div className="subtext">
                  트렌디한 IT 지식을 메일로 받아보세요
                </div>
                <div className="subtextsmall">월~토요일 오전 7시 발송</div>
                {SignIn ? (
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
                    <form
                      onSubmit={e => onSubmitHandler(e)}
                      className="signinform"
                    >
                      <div className="emailalerttext">
                        {Email_isValid
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
                          onClickHandle={() =>
                            (window.location.href = '/signup')
                          }
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <AlertModal
              open={AlertOpen}
              close={closeModal}
              alertString={
                BlackInput
                  ? '이메일을 작성해야 합니다.'
                  : EmailSubSuc
                  ? '구독신청이 완료되었습니다.'
                  : Subscribed
                  ? '현재 구독 중입니다.'
                  : '현재 구독 중인 이메일입니다.'
              }
              alertBtn="확인"
            />
          </div>
        </div>
        <div className="common-footer" />
      </div>
    </>
  );
}

export default SubscriptionWrapper;
