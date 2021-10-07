import React from 'react';
import { Link } from 'react-router-dom';

function ApprovalTable({ data }) {
  const columns = ['닉네임', '제목'];

  return (
    <table className="approval-table">
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
              contribution_title,
              contribution_url,
              user_name,
            },
            idx,
          ) => (
            <tr key={idx}>
              <td>{user_name}</td>
              <td className="approval-title">
                <Link to={`/article/con-${contribution_id}`}>
                  {contribution_title}
                </Link>
              </td>
            </tr>
          ),
        )}
      </tbody>
    </table>
  );
}

export default ApprovalTable;
