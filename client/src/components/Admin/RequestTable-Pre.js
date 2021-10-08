import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { customAxios } from '../../utils/customAxios';
import AlertModal from '../Common/AlertModal/AlertModal';
import ArticleView from '../../pages/ArticleView';

function RequestTable({ Requested }) {
  const [StatusNumber, setStatusNumber] = useState(null);
  const [AlertOpen, setAlertOpen] = useState(false);
  const [AllSelect, setAllSelect] = useState(false);
  const [PostSuc, setPostSuc] = useState(false);

  const columns = ['닉네임', '제목', '현황', '변경'];

  // 요청에 따른 라디오 버튼들
  const radioInputData = {
    100: [
      ['승인', '110'],
      ['거부', '120'],
    ],

    101: [
      ['승인', '111'],
      ['거부', '121'],
    ],

    102: [
      ['승인', '112'],
      ['거부', '122'],
    ],
  };

  // 선택한 라디오 버튼
  function onValueChange(e) {
    setStatusNumber(e.currentTarget.value);
  }

  // 요청에 관한 승인 or 거부
  function onSubmitHandler(e, contribution_id) {
    e.preventDefault();

    if (StatusNumber === null) {
      setAllSelect(false);
      setAlertOpen(true);
    } else {
      setAllSelect(true);

      let route;
      if (StatusNumber.slice(0, 2) === '11') {
        route = 'accept';
      } else if (StatusNumber.slice(0, 2) === '12') {
        route = 'reject';
      }

      let body = {
        contribution_id: contribution_id,
        status: Number(StatusNumber),
      };

      return customAxios
        .post(`/admin/contribution/${route}`, body)
        .then(res => {
          if (res.status === 200) {
            setPostSuc(true);
            setAlertOpen(true);
          } else {
            setPostSuc(false);
            setAlertOpen(true);
          }
        });
    }
  }

  // 모달 닫기
  function closeModal() {
    setAlertOpen(false);

    if (PostSuc) {
      window.location.reload();
    }
  }

  return Requested ? (
    <table>
      <thead>
        <tr>
          {columns.map(column => (
            <th key={column}>{column}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {Requested.map((el, idx) => {
          return (
            <tr key={idx}>
              <td>{el.user_name}</td>
              <td>
                <Link
                  to={`/article/pre-${el.contribution_id}`}
                  children={<ArticleView />}
                >
                  {el.contribution_title}
                </Link>
              </td>
              {el.status === 100 ? <td>게시요청</td> : null}
              {el.status === 101 ? <td>수정요청</td> : null}
              {el.status === 102 ? <td>삭제요청</td> : null}
              <td>
                <form
                  onSubmit={e => onSubmitHandler(e, el.contribution_id)}
                  className="adminform"
                >
                  {radioInputData[el.status].map((el, index) => {
                    return (
                      <div className="adminform-check" key={index}>
                        <input
                          type="radio"
                          name="adminform-check"
                          value={el[1]}
                          className="adminform-check-input"
                          onChange={e => onValueChange(e)}
                        />
                        <label
                          htmlFor={el[1]}
                          className="adminform-check-label"
                        >
                          {el[0]}
                        </label>
                      </div>
                    );
                  })}
                  <button className="adminform-btn" type="submit">
                    확인
                  </button>
                </form>
              </td>
            </tr>
          );
        })}
        <AlertModal
          open={AlertOpen}
          close={closeModal}
          alertString={
            AllSelect
              ? PostSuc
                ? '요청이 완료되었습니다.'
                : '요청이 실패하였습니다.'
              : '승인 혹은 거부를\n선택해야 합니다.'
          }
          alertBtn="확인"
        />
      </tbody>
    </table>
  ) : null;
}

export default RequestTable;
