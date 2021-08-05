import React from 'react';

function LandingContent() {
  console.log(process.env.REACT_APP_API_URL);
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-sm-4 col-md-6 col-lg-4">
            <div style={{ backgroundColor: 'red' }}>Cloumn1</div>
          </div>
          <div className="col-sm-4 col-md-6 col-lg-4">
            <div style={{ backgroundColor: 'blue' }}>Cloumn2</div>
          </div>
          <div className="col-sm-4 col-md-6 col-lg-4">
            <div style={{ backgroundColor: 'green' }}>Cloumn3</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default LandingContent;
