import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Auth from '../../hoc/auth';
import AlertModal from '../Common/AlertModal/AlertModal';
import { customAxios } from '../../utils/customAxios';
import SigninModal from '../Common/SignInModal/SignInModal';
import Button from '../Common/Button/Button';

function ContributionUpdateWrapper({ id }) {
  const [Keyword, setKeyword] = useState('게임');
  const [Title, setTitle] = useState('nothing');
  const [Content, setContent] = useState('nothing');
  const [ModalOpen, setModalOpen] = useState(false);
  const [ColorChange, setColorChange] = useState(false);
  const [AllDate, setAllDate] = useState(false);
  const [AlertOpen, setAlertOpen] = useState(false);
  const [AllSelect, setAllSelect] = useState(false);
  const [PostSuc, setPostSuc] = useState(false);

  let requrest = Auth(true);
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

  // TODO: 안된다. 확인필요
  useEffect(async () => {
    const requestGet = await customAxios
      .get(`/contribution/update/${id}`)
      .then(res => res.data.data)
      .catch(err => {
        // alert('기고 정보를 받아오는데 실패하였습니다.');
        requrest = Auth(true);

        // window.location.href = '/error';
      });
    if (requestGet !== undefined) {
      setKeyword(requestGet.contribution_keyword);
      setTitle(requestGet.contribution_title);
      setContent(requestGet.contribution_content);
    }

    if (Keyword !== '' && Title !== '' && Content !== '') {
      setAllDate(true);
    }
  }, []);

  useEffect(() => {
    if (requrest === 'Login need') {
      setModalOpen(true);
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
      setAllSelect(false);
      setAlertOpen(true);
    } else {
      setAllSelect(true);

      let body = {
        contribution_title: Title,
        contribution_content: Content,
        contribution_keyword: Keyword,
      };

      return customAxios.patch(`/contribution/${id}`, body).then(res => {
        if (res.status === 200) {
          // alert('기고수정요청이 완료되었습니다.');
          setPostSuc(true);
          setAlertOpen(true);
        } else {
          // alert('기고수정요청이 실패하였습니다.');
          setPostSuc(false);
          setAlertOpen(true);
        }
      });
    }
  }

  const closeModal = () => {
    setAlertOpen(false);

    if (PostSuc) {
      window.history.back();
    }
  };

  return AllDate ? (
    <>
      <div className="contributioncontainer stopdragging">
        <div className="container">
          <div className="row">
            {requrest === 'Login need' ? null : (
              <div className="col-sm-4">
                <div className="continner">
                  <form
                    onSubmit={e => onSubmitHandler(e)}
                    className="signinform"
                  >
                    <label htmlFor="conselect">
                      키워드 <span>(필수)</span>
                    </label>
                    <select
                      onChange={e => onKeywordHandler(e)}
                      value={Keyword}
                      className="conselect"
                      id="conselect"
                    >
                      <option value="" className="optionslect">
                        선택
                      </option>
                      {selectOptions.map((option, idx) => (
                        <option key={idx} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>

                    <br />
                    <label htmlFor="contitle">
                      제목 <span>(필수)</span>
                    </label>
                    <input
                      type="text"
                      onChange={e => onTitleHandler(e)}
                      placeholder="제목"
                      defaultValue={Title}
                      placeholder="8자 이상 입력해주세요."
                      className="contitle"
                      id="contitle"
                    />

                    <br />
                    <label htmlFor="contextarea">
                      내용 <span>(필수)</span>
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
                      defaultValue={Content}
                      id="contextarea"
                    ></textarea>

                    <br />
                    <button type="submit" className="contributionbtn">
                      <Button
                        subject="기고수정"
                        color="#fff"
                        backgroundColor="#191a20"
                      />
                    </button>
                  </form>
                  <div className="contextsmall">
                    수정 완료 후엔 심사가 다시 시작해요.
                  </div>
                  <div className="updatecancelbtn">
                    <Link to="/mypage">
                      <Button
                        subject="이전으로"
                        color="#191a20"
                        backgroundColor="#d9d9d9"
                      />
                    </Link>
                  </div>
                </div>
                <AlertModal
                  open={AlertOpen}
                  close={closeModal}
                  alertString={
                    AllSelect
                      ? PostSuc
                        ? '수정신청이 완료되었습니다.'
                        : '수정신청이 실패하였습니다.'
                      : '모두 입력해야 합니다.'
                  }
                  alertBtn="확인"
                />
                <div className="common-footer" />
              </div>
            )}
          </div>
        </div>
      </div>
      {ModalOpen ? (
        <SigninModal ModalOpen={ModalOpen} setModalOpen={setModalOpen} />
      ) : null}
    </>
  ) : null;
}

export default ContributionUpdateWrapper;
