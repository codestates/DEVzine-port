import React, { useState, useEffect } from 'react';
import store from '../../store/store';
import Auth from '../../hoc/auth';
import AlertModal from '../Common/AlertModal/AlertModal';
import SigninModal from '../Common/SignInModal/SignInModal';
import { customAxios } from '../../utils/customAxios';
import Button from '../Common/Button/Button';

function ContributionWrapper() {
  const [Keyword, setKeyword] = useState('');
  const [Title, setTitle] = useState('');
  const [Content, setContent] = useState('');
  const [ModalOpen, setModalOpen] = useState(false);
  const [UserName, setUserName] = useState('');
  const [AlertOpen, setAlertOpen] = useState(false);
  const [ColorChange, setColorChange] = useState(false);
  const [SignIn, setSignIn] = useState(false);

  let selectOptions = [
    '게임',
    '머신러닝',
    '모바일',
    '보안',
    '블록체인',
    '빅 데이터',
    '코딩',
    '클라우드',
    '퍼스널 컴퓨팅',
    'AI/로봇',
    '기타',
  ];

  useEffect(() => {
    const requrest = Auth(true);

    if (requrest === 'Login need') {
      setModalOpen(true);
    } else {
      setSignIn(true);
      setUserName(store.getState().user.signinSuccess[1]);
    }
  });

  function onKeywordHandler(e) {
    setKeyword(e.currentTarget.value);
  }

  function onTitleHandler(e) {
    setTitle(e.currentTarget.value);
  }

  function onContentHandler(e) {
    setContent(e.currentTarget.value);

    if (e.currentTarget.value.length >= 200) {
      setColorChange(true);
    } else {
      setColorChange(false);
    }
  }

  function onSubmitHandler(e) {
    e.preventDefault();

    if (Title.length < 8 || Content.length < 200 || Keyword === '') {
      return setAlertOpen(true);
    }

    let body = {
      contribution_title: Title,
      contribution_content: Content,
      contribution_keyword: Keyword,
    };

    return customAxios.post('/contribution', body).then(res => {
      if (res.status === 200) {
        alert('기고신청이 완료되었습니다.');
        window.location.href = '/';
      } else alert('기고신청이 실패하였습니다.');
    });
  }

  const closeModal = () => {
    setAlertOpen(false);
  };

  return (
    <>
      <div className="contributioncontainer stopdragging">
        <div className="container">
          <div className="row">
            {SignIn ? (
              <div className="col-sm-4">
                <div className="continner">
                  <div className="context">
                    {UserName}님의
                    <br />
                    얕고 넓은 지식을 기고해보세요.
                  </div>
                  <div className="contextsmall">
                    심사 후에 기고되며,
                    <br />
                    기고 관리는 마이페이지에 할 수 있어요.
                  </div>
                  <form
                    onSubmit={e => onSubmitHandler(e)}
                    className="signinform"
                  >
                    <label htmlFor="conselect">
                      키워드 <span>(필수)</span>
                    </label>
                    <select
                      className="conselect"
                      onChange={e => onKeywordHandler(e)}
                      id="conselect"
                    >
                      <option value="">선택</option>
                      {selectOptions.map((option, idx) => (
                        <option key={idx} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>

                    <label htmlFor="contitle">
                      제목 <span>(필수)</span>
                    </label>
                    <input
                      type="text"
                      onChange={e => onTitleHandler(e)}
                      placeholder="8자 이상 입력해주세요."
                      className="contitle"
                      id="contitle"
                    />

                    <label htmlFor="contextarea">
                      미리보기 내용 <span>(필수)</span>
                      <p
                        className={
                          ColorChange ? 'textlength active' : 'textlength'
                        }
                      >
                        ( {Content.length} / 200 이상 )
                      </p>
                    </label>

                    <textarea
                      cols="50"
                      rows="10"
                      onChange={e => onContentHandler(e)}
                      placeholder="200자 이상 입력해주세요."
                      className="contextarea"
                      id="contextarea"
                    ></textarea>

                    <br />
                    <button type="submit" className="contributionbtn">
                      <Button
                        subject="기고신청"
                        color="#fff"
                        backgroundColor="black"
                      />
                    </button>
                  </form>
                </div>
                <div className="alermodalbox">
                  <AlertModal
                    open={AlertOpen}
                    close={closeModal}
                    alertString={'모두 입력해야 합니다.'}
                    alertBtn="확인"
                  />
                </div>
                <div className="admin-footer" />
              </div>
            ) : null}
          </div>
        </div>
      </div>
      {ModalOpen ? (
        <SigninModal ModalOpen={ModalOpen} setModalOpen={setModalOpen} />
      ) : null}
    </>
  );
}

export default ContributionWrapper;
