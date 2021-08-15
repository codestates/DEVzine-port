import React from 'react';

function ArticleListWrapper() {
  return (
    <>
      <div className="artilistwrapper">
        <div className="container">
          <div className="row">
            <div className="col-sm-4">
              ArticleListWrapper
              <br />
              <div
                onClick={() => (window.location.href = '/article')}
                className="article"
              >
                기사글
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ArticleListWrapper;
