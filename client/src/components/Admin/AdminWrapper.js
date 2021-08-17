import React from 'react';
import faker from 'faker/locale/ko';
import RequestTable from './RequestTable';
import ApprovalTable from './ApprovalTable';

faker.seed(100);

function AdminWrapper() {
  const columns = ['닉네임', '제목', '현황', '변경'];
  const columns2 = ['닉네임', '제목'];
  const status = ['승인요청', '수정요청', '삭제요청'];

  /*
승인요청 - 게시대기(100), 게시승인(110), 게시거부(120)
수정요청 - 수정대기(101), 수정승인(111), 수정거부(121)
삭제요청 - 삭제대기(102), 삭제승인(112), 삭제거부(122)
*/

  const data = Array(5)
    .fill()
    .map(() => ({
      contribution_id: Math.floor(Math.random() * 10),
      user_name: faker.name.findName(),
      contribution_title: faker.lorem.sentence(),
      contribution_status: status[Math.floor(Math.random() * status.length)],
    }));

  const data2 = Array(5)
    .fill()
    .map(() => ({
      user_name: faker.name.findName(),
      contribution_title: faker.lorem.sentence(),
    }));

  return (
    <>
      <div className="admin">
        <div className="container">
          <div className="row">
            <div className="col-sm-4">
              <div className="request">
                <h2>요청</h2>
                <div className="request-manage">
                  <RequestTable columns={columns} data={data} />
                </div>
              </div>
              <div className="approval">
                <h2>승인</h2>
                <div className="approval-manage">
                  <ApprovalTable columns={columns2} data={data2} />
                </div>
              </div>
              <div className="admin-footer" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminWrapper;
