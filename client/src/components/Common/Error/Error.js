import React, { useState } from 'react';

function ErrorText() {
  const [ErrorSecs, setErrorSecs] = useState(3);

  setTimeout(function () {
    setErrorSecs(ErrorSecs - 1);
  }, 1000);

  setTimeout(function () {
    window.location.href = '/';
  }, 3500);

  return (
    <div className="errorbox stopdragging">
      <div className="errortext">
        <div className="errortitle stop-dragging">
          페이지가 존재하지 않습니다.
          <p>{ErrorSecs}초 후에 메인으로 이동합니다.</p>
        </div>
      </div>
    </div>
  );
}

export default ErrorText;
