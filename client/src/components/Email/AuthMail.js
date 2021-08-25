import React, { useState, useEffect } from 'react';
import { customAxios } from '../../utils/customAxios';
import { useParams } from 'react-router-dom';
import AlertModal from '../Common/AlertModal/AlertModal';

function AuthMail({}) {
  const { email } = useParams();
  const [AlertOpen, setAlertOpen] = useState(false);
  const [AlertMessage, setAlertMessage] = useState('');

  function customClose() {
    window.opener = null;
    window.open('', '_self');
    window.close();
  }
  const closeModal = () => {
    setAlertOpen(false);
    customClose();
  };

  useEffect(() => {
    const body = {
      temp_email: email,
    };
    customAxios
      .post('/email/verify', body)
      .then(res => {
        setAlertMessage(`${email} 인증 확인되었습니다.`);
        setAlertOpen(true);
        return;
      })
      .catch(err => {
        setAlertMessage(`이미 인증된 이메일입니다`);
        setAlertOpen(true);
        return;
      });
  }, []);

  return (
    <>
      <AlertModal
        open={AlertOpen}
        close={closeModal}
        alertString={AlertMessage}
        alertBtn="확인"
      />
    </>
  );
}

export default AuthMail;
