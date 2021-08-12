import React from 'react';

function Navbar() {
  return (
    <div className="navbarbox">
      Navbar<div onClick={() => (window.location.href = '/')}>돌아가기</div>
    </div>
  );
}

export default Navbar;
