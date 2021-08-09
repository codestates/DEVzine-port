import React from 'react';

function ArticleListWrapper() {
  return (
    <>
      ArticleListWrapper
      <br />
      <div
        onClick={() => (window.location.href = '/article')}
        className="article"
      >
        기사글
      </div>
    </>
  );
}

export default ArticleListWrapper;
