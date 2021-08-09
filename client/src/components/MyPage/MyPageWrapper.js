import React from 'react';

function MyPageWrapper() {
  return (
    <>
      MyPageWrapper
      <br />
      <button onClick={() => (window.location.href = '/contribution/update')}>
        기고 수정하기
      </button>
    </>
  );
}

export default MyPageWrapper;
