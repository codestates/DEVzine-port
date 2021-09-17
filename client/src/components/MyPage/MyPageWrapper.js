import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { mypageUser } from '../../_actions/user_actions';
import { deleteUser } from '../../_actions/user_actions';
import {
  checkEmail,
  checkPassword,
  checkHashedPassword,
} from '../../utils/validation';
import Auth from '../../hoc/auth';
import { debounce } from 'lodash';
import SigninModal from '../Common/SignInModal/SignInModal';
import AlertModal from '../Common/AlertModal/AlertModal';
import WithdrawalModal from './WithdrawalModal';
import TextInputGenderRequired from './TextInputGenderRequired';
import OptContents from './OptContents';
import Button from '../Common/Button/Button';
import { customAxios } from '../../utils/customAxios';

function MyPageWrapper() {
  const dispatch = useDispatch();

  const [email_isValid, setEmail_isValid] = useState(false);
  const [pw_isValid, setPw_isValid] = useState(false);
  const [pw_confirm, setPw_confirm] = useState(false);

  const [Email, setEmail] = useState('');
  const [Name, setName] = useState('');
  const [Password, setPassword] = useState(null);
  const [ConfirmPassword, setConfirmPassword] = useState('');
  const [hashedPassword, setHashedPassword] = useState('');
  const [Gender, setGender] = useState('선택안함');
  const [Scribed, setScribed] = useState('');
  const [Age, setAge] = useState('');
  const [Position, setPosition] = useState('');
  const [Language, setLanguage] = useState([]);
  const [Contribution, setContribution] = useState([]);

  const [ModalOpen, setModalOpen] = useState(false);
  const [AlertOpen, setAlertOpen] = useState(false);
  const [AlreadyExist, setAlreadyExist] = useState(false);
  const [AllVerified, setAllVerified] = useState(false);
  const [IsEditedSuccess, setIsEditedSuccess] = useState(false);
  const [IsEditedFail, setIsEditedFail] = useState(false);
  const [SuccessWithdrawal, setSuccessWithdrawal] = useState(false);
  const [FailWithdrawal, setFailWithdrawal] = useState(false);
  const [WithdrawalQuestion, setWithdrawalQuestion] = useState(false);
  const [YesOrNo, setYesOrNo] = useState(false);
  const [allData, setAllData] = useState(false);

  useEffect(() => {
    if (checkEmail(Email)) {
      setEmail_isValid(true);
    } else {
      setEmail_isValid(false);
    }
    debouncePasswordValidation();
  }, [Email, Password, ConfirmPassword]);

  const debouncePasswordValidation = debounce(() => {
    if (Password !== 'defaultpassword') {
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
    } else {
      if (checkHashedPassword(ConfirmPassword, hashedPassword)) {
        setPw_isValid(true);
        setPw_confirm(true);
      } else {
        setPw_isValid(true);
        setPw_confirm(false);
      }
    }
  }, 800);

  useEffect(async () => {
    const requrest = Auth(true);

    if (requrest === 'Login need') {
      setModalOpen(true);
      setEmail('');
      setPassword('defaultpassword');
      setName('');
      setHashedPassword('');
      setGender('');
      setAge('');
      setPosition('');
      setLanguage([]);
      setScribed(false);
      setContribution([]);
      setAllData(true);
    } else {
      setEmail_isValid(true);
      setPw_isValid(true);
      await customAxios
        .get(`/mypage`)
        .then(res => {
          setEmail(res.data.data.user.user_email);
          setPassword('defaultpassword');
          setName(res.data.data.user.user_name);
          setHashedPassword(res.data.data.user.user_password);
          setGender(res.data.data.user.user_info.user_gender);
          setAge(res.data.data.user.user_info.user_age);
          setPosition(res.data.data.user.user_info.user_position);
          setLanguage(res.data.data.user.user_info.user_language);
          setScribed(
            res.data.data.user.subscribed === true ? '구독' : '구독안함',
          );
          setContribution(res.data.data.contributions);
        })
        .catch(err => {
          alert('회원 정보를 받아오는데 실패하였습니다.');
        });
      setAllData(true);
    }
  }, []);

  const requiredTextInputData = [
    [
      '이메일',
      'user_email',
      Email,
      setEmail,
      '이메일',
      'email',
      email_isValid,
      '30',
      false,
    ],
    [
      '비밀번호',
      'user_password',
      Password,
      setPassword,
      '8자 이상 입력해주세요',
      'password',
      pw_isValid,
      '20',
      true,
    ],
    [
      '비밀번호 확인',
      'password_confirm',
      ConfirmPassword,
      setConfirmPassword,
      '비밀번호 확인',
      'password',
      pw_confirm,
      '20',
      true,
    ],
    ['닉네임', 'user_name', Name, setName, '유저 이름', 'text', '', '15', true],
  ];

  async function patchHandler() {
    selectInputHandler();

    let body = {
      user_email: Email,
      user_password: ConfirmPassword,
      user_name: Name,
      user_info: {
        user_gender: Gender,
        user_age: Age,
        user_position: Position,
        user_language: Language,
      },
      subscribed: Scribed,
    };

    dispatch(mypageUser(body))
      .then(res => {
        if (res.payload[0] === 'Patch success') {
          setIsEditedSuccess(true);
        }
      })
      .catch(err => {
        if (err.message.includes(409)) {
          setAlreadyExist(true);
        } else {
          setIsEditedFail(true);
        }
      });
  }

  function radioInputHandler() {
    let checkGender = document.querySelectorAll('.radioinput');
    for (let el of checkGender) {
      if (el.name === 'gender') {
        el.checked === true ? setGender(el.value) : null;
      } else if (el.name === 'subscribed') {
        el.checked === true ? setScribed(el.value) : null;
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

  function withdrawal() {
    if (YesOrNo) {
      return dispatch(deleteUser())
        .then(result => (window.location.href = '/'))
        .catch(err => {
          setFailWithdrawal(true);
        });
    }
  }

  function openWithdrawalModal() {
    if (pw_confirm) {
      return setWithdrawalQuestion(true);
    } else {
      return setAlertOpen(true);
    }
  }

  function closeModal() {
    setAlertOpen(false);
    setAlreadyExist(false);
    setAllVerified(false);
    setIsEditedFail(false);
    setSuccessWithdrawal(false);
    setFailWithdrawal(false);
    setWithdrawalQuestion(false);
    if (IsEditedSuccess) {
      setIsEditedSuccess(false);
      window.location.reload();
    }
  }

  return allData ? (
    <div className="signupcontainer">
      {Auth(true) === 'Login need' ? null : (
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
                      isMutable={el[8]}
                    />
                  );
                })}
                <OptContents
                  Gender={Gender}
                  Scribed={Scribed}
                  Age={Age}
                  Position={Position}
                  Language={Language}
                  radioInputHandler={radioInputHandler}
                  selectInputHandler={selectInputHandler}
                  Contribution={Contribution}
                />
                <div
                  className="signupbtn"
                  onClick={e =>
                    Email &&
                    Password &&
                    ConfirmPassword &&
                    Name &&
                    email_isValid &&
                    pw_isValid &&
                    pw_confirm
                      ? patchHandler()
                      : setAllVerified(true)
                  }
                  style={{ margin: '0' }}
                >
                  정보수정
                </div>
                <Button
                  subject={`회원 탈퇴`}
                  color={`#999999`}
                  backgroundColor={`#ffffff`}
                  border={`1px solid #d9d9d9`}
                  onClickHandle={() => openWithdrawalModal()}
                />
                <AlertModal
                  open={
                    AlertOpen ||
                    AlreadyExist ||
                    AllVerified ||
                    IsEditedSuccess ||
                    IsEditedFail ||
                    SuccessWithdrawal ||
                    FailWithdrawal
                  }
                  close={closeModal}
                  alertString={
                    AlertOpen
                      ? '비밀번호를 확인해 주세요.'
                      : AlreadyExist
                      ? '이미 존재하는 회원입니다.'
                      : AllVerified
                      ? '모든 것을 만족해야 합니다.'
                      : IsEditedSuccess
                      ? '정보 수정 완료하였습니다.'
                      : SuccessWithdrawal
                      ? '회원 탈퇴에 성공하였습니다.'
                      : FailWithdrawal
                      ? '회원 탈퇴에 실패하였습니다.'
                      : IsEditedFail
                      ? '정보 수정 실패하였습니다.'
                      : ''
                  }
                  alertBtn="확인"
                />
                <WithdrawalModal
                  open={WithdrawalQuestion}
                  close={closeModal}
                  setYesOrNo={setYesOrNo}
                  withdrawal={withdrawal}
                  alertString={
                    WithdrawalQuestion ? '정말 회원탈퇴 하시겠습니까?' : ''
                  }
                  yesBtn="네"
                  noBtn="아니오"
                />
                <div className="common-footer" />
              </div>
            </div>
          </div>
        </div>
      )}
      {ModalOpen ? (
        <SigninModal ModalOpen={ModalOpen} setModalOpen={setModalOpen} />
      ) : null}
    </div>
  ) : null;
}

export default MyPageWrapper;
