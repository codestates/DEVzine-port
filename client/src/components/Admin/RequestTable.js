import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { customAxios } from '../../utils/customAxios';

function RequestTable({ columns, data }) {
  const [StatusNumber, setStatusNumber] = useState(null);
  const [StatusCheck, setStatusCheck] = useState(false);

  const radioInputData = {
    승인요청: [
      ['승인', '110'],
      ['거부', '120'],
    ],

    수정요청: [
      ['승인', '111'],
      ['거부', '121'],
    ],

    삭제요청: [
      ['승인', '112'],
      ['거부', '122'],
    ],
  };

  function onValueChange(e) {
    setStatusNumber(e.currentTarget.value);
  }

  function onSubmitHandler(e, contribution_id) {
    e.preventDefault();

    if (StatusNumber === null) {
      return alert('승인 혹은 거부를 선택해야 합니다.');
    }

    let route;
    if (StatusNumber.slice(0, 2) === '11') {
      route = 'accept';
    } else if (StatusNumber.slice(0, 2) === '12') {
      route = 'reject';
    }

    let body = {
      contribution_id: contribution_id,
      status: StatusNumber,
    };

    console.log(body);

    return customAxios.post(`/admin/contribution/${route}`, body).then(res => {
      if (res.status === 200) {
        alert('요청이 완료되었습니다.');
        // setStatusCheck(true);
      } else alert('요청이 실패하였습니다.');
    });
  }

  return (
    <table>
      <thead>
        <tr>
          {columns.map(column => (
            <th key={column}>{column}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map(
          (
            {
              contribution_id,
              user_name,
              contribution_title,
              contribution_status,
            },
            idx,
          ) => {
            return (
              <tr key={idx}>
                <td>{user_name}</td>
                <td>
                  <Link to={`/article/con-${contribution_id}`}>
                    {contribution_title}
                  </Link>
                </td>
                <td>{contribution_status}</td>
                <td>
                  <form
                    onSubmit={e => onSubmitHandler(e, contribution_id)}
                    className="adminform"
                  >
                    {radioInputData[contribution_status].map((el, index) => {
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
                    <button
                      className={
                        StatusCheck
                          ? console.log(contribution_id)
                          : // 'adminform-btn checked'
                            'adminform-btn'
                      }
                      type="submit"
                    >
                      {StatusCheck ? '완료' : '확인'}
                    </button>
                  </form>
                </td>
              </tr>
            );
          },
        )}
      </tbody>
    </table>
  );
}

export default RequestTable;
