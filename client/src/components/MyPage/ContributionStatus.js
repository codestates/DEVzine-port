import React from 'react';
import { Link } from 'react-router-dom';
import ContributionUpdate from '../../pages/ContributionUpdate';
import { customAxios } from '../../utils/customAxios';
import { statuscodeconvert } from '../../utils/statuscodeconvert';

function ContributionStatus({ Contribution }) {
  async function deleteRequestHandler(contributionid) {
    await customAxios
      .delete(`/contribution/${contributionid}`)
      .then(res => {
        window.location.href = '/mypage';
      })
      .catch(err => err);
  }
  return (
    <div className="contributionstatuscontainer">
      <div className="subject">
        <div className="subjectwrapper">기고현황</div>
        <div className="btndesc sm-hidden">
          수정, 삭제 요청 후 관리자의 승인을 기다려 주세요
        </div>
      </div>
      <ul className="contributionstatustable">
        <li className="contributionstatuslist">
          <span className="tableheader first">제목</span>
          <span className="tableheader">수정</span>
          <span className="tableheader">삭제</span>
          <span className="tableheader last">현황</span>
        </li>

        {Contribution.length !== 0 ? (
          Contribution.map((el, idx) => {
            return (
              <li
                className="contributionstatuslist"
                key={`contributionstatuslist${idx}`}
              >
                {el.status === 110 || el.status === 111 ? (
                  <span className="tablecontent first ell-16-mypage">
                    <Link to={`/article/con-${el.contribution_id}`}>
                      {el.contribution_title}
                    </Link>
                  </span>
                ) : (
                  <span className="tablecontent first ell-16-mypage">
                    {el.contribution_title}
                  </span>
                )}
                <span className="tablecontent">
                  <Link
                    to={`/contributionupdate/${el.contribution_id}`}
                    children={<ContributionUpdate />}
                  >
                    <svg
                      className="updatebtn"
                      width="46"
                      height="46"
                      viewBox="0 0 46 46"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M5.75 33.0627V40.2502H12.9375L34.1358 19.0518L26.9483 11.8643L5.75 33.0627ZM39.6942 13.4935C40.4417 12.746 40.4417 11.5385 39.6942 10.791L35.2092 6.30599C34.4617 5.55849 33.2542 5.55849 32.5067 6.30599L28.9992 9.81349L36.1867 17.001L39.6942 13.4935Z"
                        fill="#999999"
                      />
                    </svg>
                  </Link>
                </span>
                <span className="tablecontent">
                  <svg
                    onClick={() => {
                      deleteRequestHandler(el.contribution_id);
                    }}
                    className="deletebtn"
                    width="39"
                    height="39"
                    viewBox="0 0 39 39"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M30.3993 10.8993C31.0339 10.2647 31.0339 9.2358 30.3993 8.6012C29.7647 7.96659 28.7358 7.96659 28.1012 8.6012L19.5002 17.2021L10.8993 8.6012C10.2647 7.96659 9.2358 7.96659 8.6012 8.6012C7.96659 9.2358 7.96659 10.2647 8.6012 10.8993L17.2021 19.5002L8.6012 28.1012C7.96659 28.7358 7.96659 29.7647 8.6012 30.3993C9.2358 31.0339 10.2647 31.0339 10.8993 30.3993L19.5002 21.7983L28.1012 30.3993C28.7358 31.0339 29.7647 31.0339 30.3993 30.3993C31.0339 29.7647 31.0339 28.7358 30.3993 28.1012L21.7983 19.5002L30.3993 10.8993Z"
                      fill="#999999"
                    />
                  </svg>
                </span>
                <span className="tablecontent last">
                  {statuscodeconvert(String(el.status))}
                </span>
              </li>
            );
          })
        ) : (
          <li className="contributionstatuslist">
            <span className="tablecontent first"></span>
            <span className="tablecontent"></span>
            <span className="tablecontent"></span>
            <span className="tablecontent last"></span>
          </li>
        )}
      </ul>
    </div>
  );
}

export default ContributionStatus;
