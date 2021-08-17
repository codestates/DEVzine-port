import React from 'react';

function ApprovalTable({ columns, data }) {
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
              <a
                href={`/article/con-${idx}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {contribution_title}
              </a>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default ApprovalTable;
