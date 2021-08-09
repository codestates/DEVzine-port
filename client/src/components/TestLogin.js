import React, { useState } from 'react';
import axios from 'axios';

const END_POINT = 'https://devzine-port-server.com';

function TestLogin({ }) {
  const [signInInfo, setSignInInfo] = useState({
    user_email: '',
    user_password: '',
  });

  function onChangeHandler(e, property) {
    const copied = Object.assign({}, signInInfo);
    copied[property] = e.target.value;
    setSignInInfo(copied);
  }

  function postHandler() {
    return axios
      .post(`${END_POINT}/testlogin`, signInInfo, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res);
      })
  }
  
  return (
    <div>
			<div>
				<input
					type='email'
					placeholder='type email'
					onChange={e => onChangeHandler(e, 'user_email')}
				/>
				<input
					type='password'
					placeholder='type password'
					onChange={e => onChangeHandler(e, 'user_password')}
				/>
				<div onClick={postHandler}>
					Login
				</div>
			</div>
    </div>
  );
}

export default TestLogin;
