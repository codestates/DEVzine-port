import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getContributionAdmin } from '../../_actions/admin_actions';
import { searchData } from '../../_actions/admin_actions';
import { searchAppData } from '../../_actions/admin_actions';
import RequestTable from './RequestTable';
import ApprovalTable from './ApprovalTable';
import AdminSignInModal from '../Common/AdminModal/AdminSignInModal';
import AlertModal from '../Common/AlertModal/AlertModal';
import Auth from '../../hoc/auth';

function AdminWrapper() {
  const dispatch = useDispatch();

  const [Requested, setRequested] = useState(null);
  const [Accepted, setAccepted] = useState(null);
  const [AllData, setAllData] = useState(false);
  const [Select, setSelect] = useState('');
  const [Text, setText] = useState('');
  const [AppText, setAppText] = useState('');
  const [ModalOpen, setModalOpen] = useState(false);
  const [Admin, setAdmin] = useState(false);
  const [AlertOpen, setAlertOpen] = useState(false);

  /*
  게시요청 - 게시대기(100), 게시승인(110), 게시거부(120)
  수정요청 - 수정대기(101), 수정승인(111), 수정거부(121)
  삭제요청 - 삭제대기(102), 삭제승인(112), 삭제거부(122)
  */

  // 옵션들
  let selectOptions = [
    ['게시요청', 'postRequest'],
    ['수정요청', 'patchRequest'],
    ['삭제요청', 'deleteRequest'],
  ];

  // admin 로그인 여부 확인
  useEffect(() => {
    const request = Auth(true);

    if (request === 'Login need') {
      setAllData(true);
      setAdmin(false);
      setModalOpen(true);
    } else {
      setAdmin(true);
      setModalOpen(false);
    }
  });

  // 기고현황 정보
  useEffect(() => {
    dispatch(getContributionAdmin())
      .then(res => {
        setRequested([
          ...res.payload.data.requested.postRequest,
          ...res.payload.data.requested.patchRequest,
          ...res.payload.data.requested.deleteRequest,
        ]);
        setAccepted(res.payload.data.accepted);
        setAllData(true);
      })
      .catch(err => {
        setAllData(false);
      });
  }, []);

  // 옵션 선택
  function onSelectHandler(e) {
    setSelect(e.currentTarget.value);
  }

  // 요청 닉네임 검색
  function onTextHandler(e) {
    setText(e.currentTarget.value);
  }

  // 승인 닉네임 검색
  function onAppTextHandler(e) {
    setAppText(e.currentTarget.value);
  }

  // 검색된 요청
  function onSubmitHandler(e) {
    e.preventDefault();

    dispatch(searchData(Select, Text))
      .then(res => setRequested(res.payload))
      .catch(err => {
        setAlertOpen(true);
      });
  }

  // 검색된 승인
  function onApprovalHandler(e) {
    e.preventDefault();

    dispatch(searchAppData(AppText))
      .then(res => {
        setAccepted(res.payload);
      })
      .catch(err => {
        setAlertOpen(true);
      });
  }

  // 모달 닫기
  function closeModal() {
    setAlertOpen(false);
  }

  return AllData ? (
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
                      게시, 수정, 삭제 요청을 확인할 수 있고, 승인하거나 거부할
                      수 있습니다.
                    </span>
                  </h2>
                  <div>
                    <form
                      onSubmit={e => onSubmitHandler(e)}
                      className="request-form"
                    >
                      <select
                        className="request-select"
                        onChange={e => onSelectHandler(e)}
                        id="request-select"
                      >
                        <option value="">모든요청</option>
                        {selectOptions.map((el, idx) => (
                          <option key={idx} value={el[1]}>
                            {el[0]}
                          </option>
                        ))}
                      </select>
                      <input
                        type="text"
                        className="request-text"
                        placeholder="닉네임을 검색하세요."
                        onChange={e => onTextHandler(e)}
                      />
                      <button type="submit" className="request-search">
                        검색
                      </button>
                    </form>
                  </div>
                  <div className="request-manage">
                    <RequestTable Requested={Requested} />
                  </div>
                </div>
                <div className="approval">
                  <h2>
                    게시
                    <span className="approval-sub">
                      게시된 소식을 볼 수 있으며, 이 소식들은 추천 소식으로
                      보여집니다.
                    </span>
                  </h2>
                  <div>
                    <form
                      onSubmit={e => onApprovalHandler(e)}
                      className="approval-form"
                    >
                      <input
                        type="text"
                        className="approval-text"
                        placeholder="닉네임을 검색하세요."
                        onChange={e => onAppTextHandler(e)}
                      />
                      <button type="submit" className="approval-search">
                        검색
                      </button>
                    </form>
                  </div>
                  <div className="approval-manage">
                    <ApprovalTable data={Accepted} />
                  </div>
                </div>
                <div className="admin-footer" />
              </div>
            ) : null}
          </div>
          <AlertModal
            open={AlertOpen}
            close={closeModal}
            alertString={'검색한 결과를 받아오는데\n실패하였습니다.'}
            alertBtn="확인"
          />
        </div>
        {ModalOpen ? (
          <>
            <AdminSignInModal
              ModalOpen={ModalOpen}
              setModalOpen={setModalOpen}
            />
          </>
        ) : null}
      </div>
    </>
  ) : null;
}

export default AdminWrapper;
