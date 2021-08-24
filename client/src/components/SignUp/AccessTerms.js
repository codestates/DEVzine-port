import React, { useState } from 'react';
import AccessModal from './AccessModal';

function AcessTerms() {
  const [AlertOpen, setAlertOpen] = useState(false);

  const Data = '안녕';

  const closeModal = () => {
    setAlertOpen(false);
  };

  return (
    <div className="accesswrapper">
      이용약관 들어갑니당
      <br />
      <div
        onClick={() => setAlertOpen(true)}
        style={{
          cursor: 'pointer',
          height: '20px',
          border: '1px solid #999',
          display: 'block',
        }}
      >
        개인정보수집 및 이용 약관
        <input type="checkbox"></input>
      </div>
      <p>뉴스레터 신청 개인정보 수집 약관</p>
      <p>서비스 이용 약관</p>
      <AccessModal
        open={AlertOpen}
        close={closeModal}
        alertString={Data}
        alertBtn="확인"
      />
    </div>
  );
}

export default AcessTerms;
