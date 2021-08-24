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
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default WithdrawalModal;
