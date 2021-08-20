import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { customAxios } from '../../utils/customAxios';

function RequestTable({ Requested }) {
  const [StatusNumber, setStatusNumber] = useState(null);

  console.log(Requested);
  const columns = ['닉네임', '제목', '현황', '변경'];
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
      } else alert('요청이 실패하였습니다.');
    });
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
                <Link to={`/article/con-${el.contribution_id}`}>
                  {el.contribution_title}
                </Link>
              </td>
              {el.status === 100 ? <td>승인요청</td> : null}
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
      </tbody>
    </table>
  ) : null;
}

export default RequestTable;
