import React from 'react';
import RequestRadio from './RequestRadio';

function RequestTable({ columns, data }) {
  const radioInputData = [
    ['승인', '100'],
    ['거부', '101'],
    ['대기', '102'],
  ];

  function radioInputHandler() {
    let checkGender = document.querySelectorAll('.radioinput');
    for (let el of checkGender) {
      if (el.name === 'gender') {
        el.checked === true ? setGender(el.value) : null;
      } else if (el.name === 'subscribed') {
        el.checked === true ? setScribed(el.value) : null;
      }
    }
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
        {data.map(({ user_name, contribution_title, contribution_status }) => (
          <tr key={user_name + contribution_title + contribution_status}>
            <td>{user_name}</td>
            <td>{contribution_title}</td>
            <td>{contribution_status}</td>
            <td>
              {radioInputData.map((el, i) => {
                return (
                  <RequestRadio
                    key={i}
                    value={el[0]}
                    name={el[1]}
                    radioInputHandler={radioInputHandler}
                    stateName={'대기'}
                  />
                );
              })}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default RequestTable;
