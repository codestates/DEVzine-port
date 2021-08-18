import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { mypageUser } from '../../_actions/user_actions';
import {
  checkEmail,
  checkPassword,
  checkHashedPassword,
} from '../../utils/validation';
import Auth from '../../hoc/auth';
import { debounce } from 'lodash';
import SigninModal from '../Common/SignInModal/SignInModal';
import TextInputGenderRequired from './TextInputGenderRequired';
import OptContents from './OptContents';
import Button from '../Common/Button/Button';
import { customAxios } from '../../utils/customAxios';

const END_POINT = process.env.REACT_APP_API_URL;

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
      // 유저가 비밀번호를 변경할 경우
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
      setScribed(false); //아래것과 위에것 어떠한 것이 작동하는지 알아보기
      // res.data.data.user.subscribed === true
      //   ? setScribed('구독')
      //   : setScribed('구독안함');
      setContribution([]);
      setAllData(true);
    } else {
      setEmail_isValid(true);
      setPw_isValid(true);
      await axios
        .get(`${END_POINT}/mypage/`, {
          withCredentials: true,
        })
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
          ); //아래것과 위에것 어떠한 것이 작동하는지 알아보기
          // res.data.data.user.subscribed === true
          //   ? setScribed('구독')
          //   : setScribed('구독안함');
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
    selectInputHandler(); //회원가입 시 화면에 있는 선택사항들을 body에 저장하기 위함

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

    console.log('MyPageWrapper :', body);

    dispatch(mypageUser(body)).then(res => {
      if (res.payload[2] === 'Patch success') {
        alert('정보수정하였습니다.');
        // window.location.href = '/mypage';
      } else {
        alert('정보수정을 실패하였습니다.');
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

  async function withdrawal() {
    await customAxios
      .delete('/user/delete')
      .then(res => alert('회원탈퇴 성공', res))
      .catch(err => alert('회원탈퇴 에러', err));
  }

  return allData ? (
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
              : alert('모든 것을 만족해야 합니다.')
          }
        >
          정보수정
        </div>
        <Button
          subject={`회원 탈퇴`}
          color={`#999999`}
          backgroundColor={`#ffffff`}
          border={`1px solid #d9d9d9`}
          onClickHandle={() => withdrawal()}
        />
      </div>
      {ModalOpen ? (
        <SigninModal ModalOpen={ModalOpen} setModalOpen={setModalOpen} />
      ) : null}
    </div>
  ) : null;
}

export default MyPageWrapper;
