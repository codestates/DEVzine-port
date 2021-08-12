import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { mypageUser } from '../../_actions/user_actions';
import { checkEmail, checkPassword } from '../../utils/validation';
import Auth from '../../hoc/auth';
import SigninModal from '../Common/SignInModal/SignInModal';
import TextInputGenderRequired from './TextInputGenderRequired';
import Accordion from './Accordion';

const END_POINT = process.env.REACT_APP_API_URL;

function MyPageWrapper() {
  const dispatch = useDispatch();

  const [email_isValid, setEmail_isValid] = useState(false);
  const [pw_isValid, setPw_isValid] = useState(false);
  const [pw_confirm, setPw_confirm] = useState(false);

  const [Email, setEmail] = useState('');
  const [Name, setName] = useState('');
  const [Password, setPassword] = useState('');
  const [ConfirmPassword, setConfirmPassword] = useState('');
  const [Gender, setGender] = useState('');
  const [Age, setAge] = useState('');
  const [Position, setPosition] = useState('');
  const [Language, setLanguage] = useState([]);

  const [modalOpen, setModalOpen] = useState(false);

  const bcrypt = require('bcryptjs');

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

    const getUserData = () => {
      setEmail_isValid(true);
      setPw_isValid(true);
      axios
        .get(`${END_POINT}/mypage/`, {
          withCredentials: true,
        })
        .then(res => {
          setEmail(res.data.data.user)
          setName(res.data.data.user)
          setPassword(res.data.data.user)
          setConfirmPassword(res.data.data.user)
          setGender(res.data.data.user_info.user_gender)
          setAge(res.data.data.user_info.user_age)
          setPosition(res.data.data.user_info.user_position)
          setLanguage(res.data.data.user_info.user_language)
        })
        .catch(err => {
          alert('회원 정보를 받아오는데 실패하였습니다.');
        });
    };
    getUserData();
  }, []);

  useEffect(() => {
    const requrest = Auth(true);

    if (requrest === 'Login need') {
      setModalOpen(true);
    }
  });

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
    ],
    ['닉네임', 'user_name', Name, setName, '유저 이름', 'text', '', '20'],
  ];

  async function patchHandler() {
    selectInputHandler(); //회원가입 시 화면에 있는 선택사항들을 body에 저장하기 위함

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

    const user_password = await bcrypt.hashSync(Password, 10);

    let body = {
      user_email: Email,
      user_password: user_password,
      user_name: Name,
      user_info: {
        user_gender: Gender,
        user_age: Age,
        user_position: Position,
        user_language: Language,
      },
    };

    console.log('MyPageWrapper :', body);

    dispatch(mypageUser(body)).then(res => {
      if (res.payload[2] === 'Patch Success') {
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
            />
          );
        })}
        <Accordion
          radioInputHandler={radioInputHandler}
          selectInputHandler={selectInputHandler}
        />
        <div
          className="signupbtn"
          onClick={
            e =>
              Email &&
              Password &&
              ConfirmPassword &&
              Name &&
              email_isValid &&
              pw_isValid &&
              pw_confirm
                ? patchHandler()
                : alert('모든 것을 만족해야 합니다.')
            // postHandler()
          }
        >
          정보수정
        </div>
      </div>
      {modalOpen ? <SigninModal/> : null}
    </div>
  );
}

export default MyPageWrapper;
