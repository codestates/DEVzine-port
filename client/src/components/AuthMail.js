import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { customAxios } from '../utils/customAxios';

function AuthMail({ }) {

  function customClose() {
    window.opener=null;
    window.open('','_self');
    window.close();
  }
  
  useEffect(() => {
    const body = {
      temp_email: useParams().email,
    }
    customAxios.post('/email/verify', body).then(res => {
      console.log(res);
      return res;
    }).then(res => {
      customClose();
      // window.close();
    });;

  }, []);
  
  return (
    <div>
      이메일 인증 확인되었습니다.{useParams().email}
    </div>
  );
}

export default AuthMail;
