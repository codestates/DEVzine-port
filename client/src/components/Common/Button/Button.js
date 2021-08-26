import React from 'react';

function Button(props) {
  const { subject, color, backgroundColor, border, onClickHandle } = props;

  return (
    <div
      style={{
        color,
        backgroundColor,
        border,
      }}
      className="commonbutton"
      onClick={onClickHandle}
    >
      {subject}
    </div>
  );
}

export default Button;
