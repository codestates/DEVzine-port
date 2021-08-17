import React, { useEffect } from 'react';
import { customAxios } from '../utils/customAxios';
import { useParams } from 'react-router-dom';

function AuthMail({ match }) {
  const { email } = useParams();

  function customClose() {
    window.opener=null;
    window.open('','_self');
    window.close();
  }
  
  useEffect(() => {
    const body = {
      temp_email: email,
    }
    customAxios.post('/email/verify', body).then(res => {
      console.log(res);
      return res;
    }).then(res => {
      customClose();
    });;

  }, []);
  
  return (
    <div>
      이메일 인증 확인되었습니다.{email}
    </div>
  );
}

export default AuthMail;
