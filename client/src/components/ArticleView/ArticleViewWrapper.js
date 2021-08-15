import React from 'react';

function ArticleViewWrapper() {
  return (
    <>
      <div className="articlewrapper">
        <div className="container">
          <div className="row">
            <div className="co-sm-4">
              ArticleViewWrapper
              <br />
              <button onClick={() => (window.location.href = '/articlelist')}>
                목록으로
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ArticleViewWrapper;
