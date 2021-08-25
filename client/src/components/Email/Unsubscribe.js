import React, { useEffect } from 'react';
import { customAxios } from '../../utils/customAxios';
import { useParams } from 'react-router-dom';

function Unsubscribe({}) {
  const { email } = useParams();
  function customClose() {
    window.opener = null;
    window.open('', '_self');
    window.close();
  }

  useEffect(() => {
    const body = {
      subscriber_email: email,
    };
    customAxios
      .post('/unsubscribe', body)
      .then(res => {
        return res;
      })
      .then(res => {
        customClose();
      });
  }, []);

  return <div>구독이 취소되었습니다.</div>;
}

export default Unsubscribe;
