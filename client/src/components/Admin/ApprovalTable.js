import React from 'react';
import { Link } from 'react-router-dom';

function ApprovalTable({ data }) {
  const columns = ['닉네임', '제목'];
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
        {data.map(({ user_name, contribution_title }, idx) => (
          <tr key={idx}>
            <td>{user_name}</td>
            <td className="approval-title">
              <Link to={`/article/con-${idx}`}>{contribution_title}</Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default ApprovalTable;
