import React, { useState, useEffect } from 'react';
import AccessModal from './AccessModal';
import { AccessTermsData } from '../../assets/datas/SignUpData/data';

function AcessTerms({ setAllChecked }) {
  const [AlertOpen, setAlertOpen] = useState(false);
  const [AlertString, setAlertString] = useState(false);
  const [checkedInputs, setCheckedInputs] = useState([]);

  function SigninPopup(data) {
    setAlertString(data);
    setAlertOpen(true);
  }

  useEffect(() => {
    setAllChecked(checkedInputs.length === 3);
  }, [checkedInputs]);

  const changeHandler = (checked, id) => {
    if (checked) {
      setCheckedInputs([...checkedInputs, id]);
    } else {
      setCheckedInputs(checkedInputs.filter(el => el !== id));
    }
  };

  const closeModal = () => {
    setAlertOpen(false);
  };

  return (
    <div className="accesswrapper">
      <p>
        이용약관동의<span className="accesswrapper-required">(필수)</span>
      </p>
      <br />
      {AccessTermsData.map((el, idx) => {
        return (
          <div key={idx} className="accessdata">
            <input
              type="checkbox"
              name="accessdata"
              value="accept"
              className="accessdata-ckb"
              id={`check${idx}`}
              onChange={e => {
                changeHandler(e.currentTarget.checked, `check${idx}`);
              }}
              checked={checkedInputs.includes(`check${idx}`) ? true : false}
            />
            {el[0]}(필수)
            <span
              onClick={() => SigninPopup(el[1])}
              className="accessdata-view"
            >
              <span className="sm-hidden">약관 보기</span>
              <span className="sm-only">보기</span>
            </span>
          </div>
        );
      })}
      <AccessModal
        open={AlertOpen}
        close={closeModal}
        alertString={AlertString}
        alertBtn="확인"
      />
    </div>
  );
}

export default AcessTerms;
