export const contributions = {
  contribution_keyword: '코딩',
  contribution_title: 'Full IM 29기 17주 회고록',
  contribution_url:
    'https://medium.com/jongah-tech-blog/full-im-29%EA%B8%B0-17%EC%A3%BC-%ED%9A%8C%EA%B3%A0%EB%A1%9D-95f5e9555925',
  contribution_content: `
            저는 포토샵, 일러스트로 사이트를 디자인할 수 있고, 웹퍼블리셔로 html, css를 사용하여 구현할 수 있었어요. 
            그런데 이번에는 CRUD(create, read, update, delete)기능과 REST API를 설계해야했어요.\n
            쉽게 말하자면, 회원가입에 글을 써서 회원가입 버튼이 누르면 실제 회원가입이 되고, 
            그 정보로 로그인이 되고, 게시글을 작성하거나 댓글을 작성하고 물건을 살 수 있고 .. 등등 실제로 웹사이트에서 작동하는 것들이 이미지적으로 뿐만 아니라 구현이 되어야해요. 
            (백엔드와 소통되어 데이터를 저장하고, 저장된 데이터를 사용할 수 있어야 해요.)\n단순 리뉴얼도 아니고 기획을 하여 새로운 사이트를 만들어야 해요. 
            저는 이전 기수분들 것을 보면서 아이디어를 내봤지만 뭐가 좋고, 나쁜 것인지 잘 구분이 안되었어요. (지금 프로젝트를 하고 나니 조금 알겠어요.)
            프로젝트가 정해지고 프로젝트를 제대로 알기위해선 와이어프레임이 먼저 제대로 나와야겠다고 생각했고, 와이어프레임을 만들었어요. 
            그리고 css할 때 헤매지 않고 전체적인 통일성을 주기 위해서 ui 디자인이 필수적이란 생각에 ui디자인 또한 뒤어어 했어요.ui 디자인을 하고, 더미데이터를 만드는데 시간이 오래 걸리는 것 같아 초반에 기능 구현을 못 했어요. 그래서 ‘ui 디자인을 하는게 맞는것일까?’라는 생각을 많이 했고 중반까지만 해도 프론트엔드 진행속도가 안 나서 너무 슬펐어요.
            예상치 못 한 오류! 시간은 째각째각
            데스크탑 백라이트가 갑자기 나가면서 코드를 칠 수 없을 정도로 화면이 어두워졌어요. 그래서 급하게 수리기사님께 연락하고 중고 모니터로 교체했어요. (내 8만 5천원…)
            아주 사소하게 axios의 정보를 담는 방법을 헤매기도 하고, 데이터 주고받는 것을 어떻게 확인해야할지 몰라 고민하기도 하고, 회원일 때와 아닐 때에 보여지는 화면이 다른 것을 어떻게 구현할지, header에 위에 어떻게 고정시킬지 등 하나하나 고민하며 코드를 입력했어요.
            갈수록 많아지는 상태들과 주석. redux를 쓰면 상태관리에 편하고 새로고침해서 안 없어지고, styled components를 쓰면 편하다는 것을 알고는 있으나 적용하기까지 익숙해지기엔 시간이 오래 걸려서 이번엔 사용을 안 했어요.
            2주의 시간 길고도 짧았다.
            매일 1시쯤에 자고 어쩔땐 4시에 자기도 하고 주말에도 안 쉬고 팀들과 소통하면서 작업을 했어도 모르는게 많아서 한 번에 잘 넘어가는게 거의 없었어요. 진짜 최대한 걱정, 피해를 안 끼치고 싶어서 열심히 했으나 조금 무리였는지 시간은 덧없이 흘려가고…ㅠㅠ 백엔드분들도 프론트엔드 작업을 서포트해주시면서 적극 도와주셨어요! 우리팀 너무 좋아ㅠㅠ
            매일 공부하고 코드 작업할 게 많았고 그래서 정말 매일이 짧게 느껴졌어요. 한편으론 매일 늦게까지 코드만 치고 있으니 이 생활이 끝나지 않을 것같아서 길게도 느껴졌어요.
            그래도 막판에 전체적으로 기능이 작동될 때! 그리고 코드를 안 치고 발표 준비를 하게 될 때! 너무 감회가 새로웠어요.
            아직 우리에겐 4주 프로젝트가 남아있다.
            2주 동안 너무 고생해서 끝난 뒤에 홀로 여행갈 수 있는 본가에 갔어요ㅎㅎ 오랜만에 긴 외출이라 너무 좋고, 부모님과 친구들을 만나서 좋았어요! 이렇게 프로젝트 걱정없이, 컴퓨터 킬 필요없이 편히 쉴 수 있다는게 너무 꿈같았죠
            주말에 푹 쉬고 와서 이 글을 정리중이고 내일부터 4주 프로젝트가 다시 시작해요. 4주 프로젝트.. 2주에 겪어봤으니 미래가 어느정도 예상 가능하네요. 주말에 푹 쉬었는데 다시 걱정이 돼요. ‘주말에 쉬지말고 ‘2주 프로젝트 분석’ 포스팅을 올렸어야 했는데..’, ‘scss나 반응형 코드, 인터렉션이나 아이디어를 더 생각했어야하는데..’ 등의 하면 좋을 것들만 생각나요.
            잘 쉬고 왔으니 일단 걱정은 넣어두고, 이번의 쉼으로 완전히 재충전하였으니 내일부터 다시 힘내서 잘할 수 있을 거예요! 4주 프로젝트 화이팅!
            `,
  contribution_date: '2021-08-02',
  user_email: 'jonga6431@gmail.com',
  status: 100,
  hit: 210,
  user_name: 'jong-ah',
};

export const articles = {
  article_keyword: '보안',
  article_title:
    'Officia elit do sunt sit dolore Lorem consequat minim fugiat nisi.',
  article_url: 'https://m.boannews.com/html/index.html',
  article_content: `Irure labore laborum incididunt quis quis commodo Lorem ad voluptate eu enim. Cillum magna cillum excepteur fugiat velit sit culpa Lorem incididunt excepteur duis. Nostrud labore duis minim eu dolore eu labore do adipisicing aliqua magna ut. Ad irure quis excepteur sunt dolor ex ad culpa. Labore qui nulla reprehenderit laborum velit. Consectetur amet sit adipisicing cillum nisi sit.

Enim mollit proident laborum dolore ad dolor cupidatat et aliqua dolor in deserunt. Consequat do in eiusmod ut. Id Lorem officia nostrud mollit non dolore reprehenderit. Nulla cupidatat laborum fugiat proident in laborum proident laborum consequat veniam irure.
            `,
  article_date: '2021-08-16',
  article_publishment: 'anonymous',
  status: 100,
  hit: 997,
};
