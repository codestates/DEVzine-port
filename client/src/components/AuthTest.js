import React, { useState, useEffect } from 'react';
import { customAxios } from '../utils/customAxios';

function AuthTest({ }) {
  const [state, setState] = useState('');
  useEffect(() => {
    customAxios.get('/authtest').then(res => {
      console.log(res);
      return ;
    });

  }, []);
  
  return (
    <div>
      ㅎㅇ
      {state}
    </div>
  );
}

export default AuthTest;
