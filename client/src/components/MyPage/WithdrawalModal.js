import React from 'react';

function WithdrawalModal(props) {
  const { open, close, setYesOrNo, alertString, yesBtn, noBtn, withdrawal } =
    props;

  return (
    <div>
      <div className="modalcontainer stopdragging">
        {open ? (
          <div className="modalbackdrop">
            <div className="modalview">
              <div className="desc">
                {alertString.split('\n').map(line => (
                  <span key={line}>
                    {line}
                    <br />
                  </span>
                ))}
                <div className="btnwrapper">
                  <button
                    className="yesornobtn"
                    onClick={e => {
                      setYesOrNo(true);
                      withdrawal();
                    }}
                  >
                    {yesBtn}
                  </button>
                  <button className="yesornobtn" onClick={close}>
                    {noBtn}
                  </button>
                </div>
                <div className="pluscheck">
                  탈퇴 시, 작성하신 기고글 외의
                  <br />
                  개인 정보(이메일, 아이디, 비번 등) 삭제됩니다.
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default WithdrawalModal;
