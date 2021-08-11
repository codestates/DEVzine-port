import React from 'react';

function AlertModal(props) {
  const { open, close, alertString, alertBtn } = props;

  return (
    <div className={open ? 'openmodal modal' : 'modal'}>
      <div className="modalcontainer">
        {open === true ? (
          <div className="modalbackdrop">
            <div className="modalview">
              <div className="desc">
                {alertString}
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
