import React, { useState, useEffect } from 'react';
import { customAxios } from '../utils/customAxios';

function AuthTest({ }) {
  const [state, setState] = useState('');
  useEffect(() => {
    customAxios.get('/authtest').then(res => {
      console.log(res);
			setState(res.data);
      return res;
    });

  }, []);
  
  return (
    <div>
      {state}
    </div>
  );
}

export default AuthTest;
