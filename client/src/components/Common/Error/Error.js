import React, { useState, useEffect } from 'react';

function ErrorText() {
  const [errorSecs, setErrorSecs] = useState(3);

  setTimeout(function () {
    setErrorSecs(errorSecs - 1);
  }, 1000);

  setTimeout(function () {
    window.location.href = '/';
  }, 3500);

  return (
    <div className="errorbox">
      <div className="errorText">
        <div className="errorTitle stop-dragging">
          페이지가 존재하지 않습니다.
          <p>{errorSecs}초 후에 메인으로 이동합니다.</p>
        </div>
      </div>
    </div>
  );
}

export default ErrorText;
