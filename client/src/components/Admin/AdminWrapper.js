import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getContributionAdmin } from '../../_actions/admin_actions';
import faker from 'faker/locale/ko';
import RequestTable from './RequestTable';
import ApprovalTable from './ApprovalTable';
import AdminSignInModal from '../Common/AdminModal/AdminSignInModal';
import store from '../../store/store';

faker.seed(100);

function AdminWrapper() {
  const dispatch = useDispatch();

  const [PostRequest, setPostRequest] = useState(null);
  const [PatchRequest, setPatchRequest] = useState(null);
  const [DeleteRequest, setDeleteRequest] = useState(null);
  const [Accepted, setAccepted] = useState(null);
  const [AllData, setAllData] = useState(false);
  const [ModalOpen, setModalOpen] = useState(false);
  const [Admin, setAdmin] = useState(false);

  const columns = ['닉네임', '제목', '현황', '변경'];
  const columns2 = ['닉네임', '제목'];
  const status = ['승인요청', '수정요청', '삭제요청'];

  /*
승인요청 - 게시대기(100), 게시승인(110), 게시거부(120)
수정요청 - 수정대기(101), 수정승인(111), 수정거부(121)
삭제요청 - 삭제대기(102), 삭제승인(112), 삭제거부(122)
*/

  const data = Array(6)
    .fill()
    .map(() => ({
      contribution_id: Math.floor(Math.random() * 10),
      user_name: faker.name.findName(),
      contribution_title: faker.lorem.sentence(),
      contribution_status: status[Math.floor(Math.random() * status.length)],
    }));

  const data2 = Array(6)
    .fill()
    .map(() => ({
      user_name: faker.name.findName(),
      contribution_title: faker.lorem.sentence(),
    }));

  useEffect(() => {
    if (store.getState().admin.adminSigninSuccess) {
      if (store.getState().admin.adminSigninSuccess === 'Login success') {
        setModalOpen(false);
        setAdmin(true);
      } else {
        setModalOpen(true);
        setAdmin(false);
      }
    }
  });

  useEffect(() => {
    dispatch(getContributionAdmin)
      .then(res => {
        console.log(res.payload);
        setPostRequest(res.payload[0]);
        setPatchRequest(res.payload[1]);
        setDeleteRequest(res.payload[2]);
        setAccepted(res.payload[3]);
        setAllData(true);
      })
      .catch(err => alert('관리데이터 받아오는데 실패하였습니다.'));
  }, []);

  return (
    <>
      <div className="admin">
        <div className="container">
          <div className="row">
            {Admin ? (
              <div className="col-sm-4">
                <div className="request">
                  <h2>
                    요청
                    <span className="request-sub">
                      승인, 수정, 삭제 요청을 확인할 수 있고, 승인하거나 거부할
                      수 있습니다.
                    </span>
                  </h2>
                  <div className="request-manage">
                    <RequestTable columns={columns} data={data} />
                  </div>
                </div>
                <div className="approval">
                  <h2>
                    승인
                    <span className="approval-sub">
                      승인 처리된 소식을 볼 수 있으며, 이 소식들은 추천 소식으로
                      보여집니다.
                    </span>
                  </h2>
                  <div className="approval-manage">
                    <ApprovalTable columns={columns2} data={data2} />
                  </div>
                </div>
                <div className="admin-footer" />
              </div>
            ) : null}
          </div>
        </div>
        {ModalOpen ? (
          <AdminSignInModal ModalOpen={ModalOpen} setModalOpen={setModalOpen} />
        ) : null}
      </div>
    </>
  );
}

export default AdminWrapper;
