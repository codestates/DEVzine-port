import React from 'react';

function Button(props) {
  const { subject, color, backgroundColor, onClickHandle } = props;

  return (
    <div
      style={{
        color,
        backgroundColor,
      }}
      className="commonButton"
      onClick={onClickHandle}
    >
      {subject}
    </div>
  );
}

export default Button;
