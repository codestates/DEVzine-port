import React from 'react';

function TextInputGenderRequired({
  inputname,
  detailString,
  stateName,
  stateFunc,
  placeholder,
  type,
  isValid,
  maxLength,
  isMutable,
}) {
  //inputname은 이메일 같은거, detailString은 state에 문자열한거, stateName은 state, stateFunc은 set함수
  return (
    <div className="inputsmallcontainer">
      <div className="subjectwrapper">
        {inputname}
        <span className="required">(필수)</span>
      </div>
      <input
        type={type}
        placeholder={placeholder}
        className="inputsmall"
        value={stateName}
        onChange={e => stateFunc(isMutable ? e.target.value : stateName)}
        maxLength={maxLength}
      />

      {isValid !== false || isValid === '' ? null : detailString ===
        'user_email' ? (
        <p className="isvalidindicator">
          이메일 형식에 맞게 다시 작성해 주십시오.
        </p>
      ) : detailString === 'user_password' ? (
        <p className="isvalidindicator">
          비밀번호는 숫자와 영문자 조합으로 8~20자리를 사용해야 합니다.
        </p>
      ) : (
        <p className="isvalidindicator">비밀번호와 일치하지 않습니다.</p>
      )}
    </div>
  );
}

export default TextInputGenderRequired;
