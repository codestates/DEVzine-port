import React, { useState, useEffect } from 'react';
import { customAxios } from '../../utils/customAxios';
import { contributions } from '../../assets/datas/ArticleViewData/data';

function ArticleViewWrapper() {
  //props로 id 넣어줘야함
  const id = 1;
  const [Contribution, setContribution] = useState({});
  const [Alldata, setAlldata] = useState(false);

  useEffect(async () => {
    await setContribution(contributions); //axios연결시 지우기

    const getRequest = await customAxios
      .get(`/magazine/contribution/${id}`)
      .then(res => {
        return res.data.data;
      })
      .catch(err => console.log(err));
    // setContribution(getRequest);
    setAlldata(true);
  }, []);

  return Alldata ? (
    <>
      <div className="articlecontainer">
        <div className="container">
          <div className="row">
            <div className="col-sm-4">
              <div className="articleviewwrapper">
                <div className="header">
                  <div className="headerleft">
                    <div className="keyword">
                      {Contribution.contribution_keyword}
                    </div>
                    <div className="title">
                      {Contribution.contribution_title}
                    </div>
                  </div>
                  <svg
                    className="hamburger"
                    onClick={() => window.history.back()}
                    // onClick={() => (window.location.href = '/articlelist')}
                    width="37"
                    height="37"
                    viewBox="0 0 37 37"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M5.78125 25.4375H31.2188M5.78125 11.5625H31.2188H5.78125ZM5.78125 18.5H31.2188H5.78125Z"
                      stroke="#999999"
                      strokeWidth="2"
                      strokeMiterlimit="10"
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="datawrapper">
                    게시{' '}
                    <span className="data">
                      {Contribution.contribution_date}
                    </span>
                    조회 <span className="data">{Contribution.hit}</span>
                  </div>
                </div>
                <div className="body">
                  <div className="contents">
                    {Contribution.contribution_content.slice(0, 200) + '...'}
                  </div>
                  <div className="layer"></div>
                  <div className="viewallbtn"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  ) : null;
}

export default ArticleViewWrapper;
