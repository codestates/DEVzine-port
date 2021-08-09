import React from 'react';

function ArticleViewWrapper() {
  return (
    <>
      ArticleViewWrapper
      <br />
      <button onClick={() => (window.location.href = '/articlelist')}>
        목록으로
      </button>
    </>
  );
}

export default ArticleViewWrapper;
