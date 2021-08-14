import React from 'react';

function ContributionStatus() {
  return (
    <div className="contributionstatuscontainer">
      <div className="subjectwrapper">기고현황</div>
      <ul className="contributionstatustable">
        <span className="tableheader first">제목</span>
        <span className="tableheader">수정</span>
        <span className="tableheader">삭제</span>
        <span className="tableheader last">현황</span>
        <li>
          <p></p>
          <span></span>
          <span></span>
          <span></span>
        </li>
      </ul>
    </div>
  );
}

export default ContributionStatus;
