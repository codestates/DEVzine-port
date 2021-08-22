import React from 'react';

function AlertModal(props) {
  const { open, close, alertString, alertBtn } = props;

  return (
    <div>
      <div className="modalcontainer">
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
                <button className="closebtn" onClick={close}>
                  {alertBtn}
                </button>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default AlertModal;
