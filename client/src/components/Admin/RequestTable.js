import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { customAxios } from '../../utils/customAxios';
import AlertModal from '../Common/AlertModal/AlertModal';
import ArticleView from '../../pages/ArticleView';

function RequestTable({ Requested }) {
  const [AlertOpen, setAlertOpen] = useState(false);
  const [AllSelect, setAllSelect] = useState(false);
  const [PostSuc, setPostSuc] = useState(false);
  const [AcitiveBtn, setAcitiveBtn] = useState(false);
  const [PostBody, setPostBody] = useState([]);
  const [checkItems, setCheckItems] = useState([]);

  const columns = ['현황', '닉네임', '제목'];

  useEffect(() => {
    if (PostBody.length !== 0) {
      setAcitiveBtn(true);
    } else {
      setAcitiveBtn(false);
    }
  }, [PostBody, checkItems]);

  // 개별선택
  function checkHandler(checked, id, status) {
    if (checked) {
      setPostBody([...PostBody, { contribution_id: id, status: status }]);
      setCheckItems([...checkItems, id]);
    } else {
      // 체크해제
      setPostBody(PostBody.filter(o => o.contribution_id !== id));
      setCheckItems(checkItems.filter(o => o !== id));
    }
  }

  // 전체선택
  function checkAllHandler(checked) {
    if (checked) {
      const ids = [];
      const body = [];
      Requested.forEach(v => {
        ids.push(v.contribution_id);
        body.push({ contribution_id: v.contribution_id, status: v.status });
      });
      setCheckItems(ids);
      setPostBody(body);
    } else {
      setCheckItems([]);
      setPostBody([]);
    }
  }

  function onAcceptBtn() {
    if (PostBody.length === 0) {
      setAllSelect(false);
      return setAlertOpen(true);
    } else {
      setAllSelect(true);

      return customAxios
        .post(`/admin/contribution/accept`, PostBody)
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

  function onRejectBtn() {
    if (PostBody.length === 0) {
      setAllSelect(false);
      return setAlertOpen(true);
    } else {
      setAllSelect(true);

      return customAxios
        .post(`/admin/contribution/reject`, PostBody)
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
    <>
      <div className={AcitiveBtn ? 'chk-post active' : 'chk-post'}>
        <button onClick={() => onAcceptBtn()}>승인</button>
        <button onClick={() => onRejectBtn()}>거부</button>
      </div>
      <table>
        <thead>
          <tr>
            <th key="checkbox">
              <input
                type="checkbox"
                onChange={e => checkAllHandler(e.target.checked)}
                checked={checkItems.length === Requested.length ? true : false}
              />
            </th>
            {columns.map(column => (
              <th key={column}>{column}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Requested.map((el, idx) => {
            return (
              <tr key={idx}>
                <td>
                  <input
                    type="checkbox"
                    onChange={e =>
                      checkHandler(
                        e.target.checked,
                        el.contribution_id,
                        el.status,
                      )
                    }
                    checked={
                      checkItems.indexOf(el.contribution_id) >= 0 ? true : false
                    }
                  />
                </td>
                {el.status === 100 ? <td>게시요청</td> : null}
                {el.status === 101 ? <td>수정요청</td> : null}
                {el.status === 102 ? <td>삭제요청</td> : null}
                <td>{el.user_name}</td>
                <td>
                  <Link
                    to={`/article/pre-${el.contribution_id}`}
                    children={<ArticleView />}
                  >
                    {el.contribution_title}
                  </Link>
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
                : '선택해야 합니다.'
            }
            alertBtn="확인"
          />
        </tbody>
      </table>
    </>
  ) : null;
}

export default RequestTable;
