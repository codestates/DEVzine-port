import React from 'react';

function AccessModal(props) {
  const { open, close, alertString, alertBtn } = props;

  return (
    <div>
      <div className="acc-modalcontainer stopdragging">
        {open ? (
          <div className="modalbackdrop">
            <div className="modalview">
              <div className="desc">
                {alertString.split('\n').map((line, idx) => (
                  <span key={idx}>
                    {line}
                    <br />
                  </span>
                ))}
              </div>
              <button className="closebtn" onClick={close}>
                {alertBtn}
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default AccessModal;
