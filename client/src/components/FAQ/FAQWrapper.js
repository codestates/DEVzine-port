import React from 'react';
import { Link } from 'react-router-dom';

function FAQWrapper() {
  return (
    <div className="faqwrapper">
      <div className="container">
        <div className="row">
          <div className="col-sm-4">
            <div className="faqwrapper-title">
              <h2>
                FAQ
                <span>
                  <div className="sm-only">
                    <br />
                  </div>
                  추가 문의사항이 있으시다면 devzineport@gmail.com 으로
                  남겨주시기 바랍니다.
                </span>
              </h2>
            </div>
          </div>
          <div className="col-sm-4 col-md-6 col-lg-3">
            <div className="faqwrapper-inner">
              <div className="faqwrapper-inner-question">
                아이폰에서는 가끔 마이페이지 접속이 안 되는데 어떻게 해결하나요?
              </div>
              <div className="faqwrapper-inner-answer">
                Safari에서 안정적으로 접속될 수 있는 방법을 알려드리겠습니다.
                아아폰 설정에서 Safari 어플을 선택 후, 크로스 사이트 추적 방지와
                모든 쿠키 차단을 해제해주세요.{' '}
                <span className="sub">
                  (초록색을 없어지게 비활성화 해주세요.)
                </span>
                <span className="double" />
                위와 같이 설정할 경우, Safari에서 원활하게 접속할 수 있습니다.
              </div>
            </div>
          </div>
          <div className="col-sm-4 col-md-6 col-lg-3">
            <div className="faqwrapper-inner">
              <div className="faqwrapper-inner-question">
                기고글 신청하면 며칠 이내에 게시되나요?
              </div>
              <div className="faqwrapper-inner-answer">
                매주 월요일에 관리자가 기고글을 확인합니다. 기고를 신청해주신
                분께서는 월요일 중에 마이페이지에서 반영사항을 확인하실 수
                있습니다.{' '}
                <Link to="/mypage">
                  <span className="mouseover">지금 마이페이지 가기</span>
                </Link>
              </div>
            </div>
          </div>
          <div className="col-sm-4 col-md-6 col-lg-3">
            <div className="faqwrapper-inner">
              <div className="faqwrapper-inner-question">
                이메일 구독을 취소하고 싶어요. 어떻게 해야 하나요?
              </div>
              <div className="faqwrapper-inner-answer">
                매일 아침에 받으시는 DEVzine 메일 최하단에 '구독 취소하기'
                링크가 있습니다. 해당 링크를 누르시면 바로 구독 취소를 하실 수
                있습니다.
                <span className="double" />
                만약 회원이시라면, 위의 방법 말고도 페이지 오른편 상단에 있는
                '마이페이지' 에 방문하셔서 직접 구독 정보를 수정하시는 방법이
                있습니다.
              </div>
            </div>
          </div>
          <div className="col-sm-4 col-md-6 col-lg-3">
            <div className="faqwrapper-inner">
              <div className="faqwrapper-inner-question">
                비회원은 기고 신청을 할 수 없나요?
              </div>
              <div className="faqwrapper-inner-answer">
                네, 현재로써는 비회원이신 분들께는 기고 신청 권한을 드리지
                않습니다. 하지만 간단한 회원 가입 절차를 밟으신 뒤에는 쉽게 기고
                신청을 하실 수 있습니다!{' '}
                <Link to="/mypage">
                  <span className="mouseover">지금 회원가입하러 가기</span>{' '}
                </Link>
                <span className="double" />
                앞으로 DEVzine 에서 질문자 님의 기고글을 보게 되길
                기대하겠습니다.
              </div>
            </div>
            <div className="faqwrapper-footer" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default FAQWrapper;
