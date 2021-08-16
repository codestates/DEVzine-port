import React from 'react';
import { Link } from 'react-router-dom';
import Pencil from '../../assets/images/Pencil.png';
import Union from '../../assets/images/Union(black).png';
import { customAxios } from '../../utils/customAxios';
import { statuscodeconvert } from '../../utils/statuscodeconvert';
import axios from 'axios';

// const END_POINT = process.env.REACT_APP_API_URL;

function ContributionStatus({ Contribution }) {
  async function deleteRequestHandler(contributionid) {
    // console.log(contributionid);
    // return axios
    //   .delete(`${END_POINT}/contribution/${contributionid}`, {
    //     withCredentials: true,
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //   })
    //   .then((window.location.href = '/mypage'))//삭제요청을 보내면 서버에서 status를 바꾼 뒤 다시 현황을 표시해야하므로 새로고침이 필요.
    //   .catch(err => console.log(err));
    const requestDelete = await customAxios
      .delete(`/contribution/${contributionid}`)
      .then(res => {
        console.log(res);
        window.location.href = '/mypage';
      })
      .catch(err => console.log(err));
    return requestDelete;
  }
  return (
    <div className="contributionstatuscontainer">
      <div className="subjectwrapper">기고현황</div>
      <ul className="contributionstatustable">
        <li className="contributionstatuslist">
          <span className="tableheader first">제목</span>
          <span className="tableheader">
            <div
              className="updatebtn"
              style={{ backgroundImage: `url(${Pencil})` }}
            ></div>
          </span>
          <span className="tableheader">
            <div
              className="deletebtn"
              style={{ backgroundImage: `url(${Union})` }}
            ></div>
          </span>
          <span className="tableheader last">현황</span>
        </li>

        {Contribution.length !== 0 ? (
          Contribution.map((el, idx) => {
            return (
              <li
                className="contributionstatuslist"
                key={`contributionstatuslist${idx}`}
              >
                <span className="tablecontent first">
                  {el.contribution_title.slice(0, 16) + '...'}
                </span>
                <span className="tablecontent">
                  <Link
                    to={`/contributionupdate/${el.contribution_id}`}
                    children={<contribution />}
                  >
                    <div
                      className="updatebtn"
                      style={{ backgroundImage: `url(${Pencil})` }}
                    ></div>
                  </Link>
                </span>
                <span className="tablecontent">
                  <div
                    className="deletebtn"
                    onClick={() => deleteRequestHandler(el.contribution_id)}
                    style={{ backgroundImage: `url(${Union})` }}
                  ></div>
                </span>
                <span className="tablecontent last">
                  {statuscodeconvert(String(el.status))}
                  {el.status === 10 ? (
                    <a href={el.contribution_url}>URL</a>
                  ) : null}
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
