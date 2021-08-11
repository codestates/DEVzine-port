import React from 'react';

function Footer() {
  return (
    <>
      Footer
      <br />
      <button onClick={() => (window.location.href = '/contribution')}>
        DEVzine 기고 신청하기
      </button>
      <button onClick={() => (window.location.href = '/visual')}>
        핵심 데이터 한 눈에 보기
      </button>
    </>
  );
}

export default Footer;
