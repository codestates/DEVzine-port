import React from 'react';
import landing01 from '../../assets/images/landing01.svg';
import landing02 from '../../assets/images/landing02.svg';
import landing03 from '../../assets/images/landing03.svg';
import landing04 from '../../assets/images/landing04.svg';
import store from '../../store/store';

const END_POINT = process.env.REACT_APP_API_URL;

function LandingWrapper() {
  console.log('LandingWrapper :', store.getState());

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
        <button onClick={() => (window.location.href = '/subscribe')}>
          구독하기
        </button>
        <button onClick={() => (window.location.href = '/articlelist')}>
          매거진 보기
        </button>
        <div className="landingimg">
          <div className="col-sm-4 col-md-6 col-lg-7">
            <div className="landingbackground">
              <img src={landing01} alt="landing01" />
            </div>
          </div>
          {/* <div className="col-sm-4 col-md-6 col-lg-7">
            <div className="landingbackground">
              <img src={landing02} alt="landing02" />
            </div>
          </div>
          <div className="col-sm-4 col-md-6 col-lg-7">
            <div className="landingbackground">
              <img src={landing03} alt="landing03" />
            </div>
          </div>
          <div className="col-sm-4 col-md-6 col-lg-7">
            <div className="landingbackground">
              <img src={landing04} alt="landing04" />
            </div>
          </div> */}
        </div>
      </div>
    </>
  );
}

export default LandingWrapper;
