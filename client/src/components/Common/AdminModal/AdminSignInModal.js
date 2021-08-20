import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { signinAdmin } from '../../../_actions/admin_actions';
import TextInputGenderRequired from './TextInputGenderRequired';
import Button from '../Button/Button';
import Union from '../../../assets/images/Union.png';
import { Link } from 'react-router-dom';

function AdminSignInModal({ ModalOpen, setModalOpen }) {
  const dispatch = useDispatch();

  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const requiredTextInputData = [
    [Email, setEmail, '이메일 입력', 'email', '30'],
    [Password, setPassword, '비밀번호 입력', 'password', '20'],
  ];

  async function postHandler(e) {
    let body = {
      admin_id: Email,
      admin_password: Password,
    };

    console.log('SignInModal :', body);

    dispatch(signinAdmin(body)).then(res => {
      console.log(res.payload);
      if (res.payload === 'Login success') {
        window.location.href = '/admin';
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
          subject={`관리자 로그인`}
          color={`#ffffff`}
          backgroundColor={`#191A20`}
          onClickHandle={postHandler}
        />
      </div>
    </div>
  ) : null;
}

export default AdminSignInModal;
