
![ㄹㅇ로고](https://github.com/codestates-seb/seb44_main_020/assets/64067205/dcfa15c6-273e-4cd5-9827-d433a4239699)
<b>안녕하세요. <br>

MoovDa는 영화에 대한 평가와 리뷰를 자유롭게 공유하는 곳입니다.  <br>다른 사용자들의 의견을 듣고, 자신만의 영화 리스트를 만들어보세요. <br><br>

MoovDa에서는 영화 제목, 감독, 배우, 장르 등 다양한 정보를 활용하여 원하는 
영화를 정확히 검색할 수 있습니다. <br> 이를 통해 당신이 가장 마음에 드는 작품을 발견할 수 있을 거예요!  <br> <br> 

다양한 영화들을 살펴보고, 다른 사용자들과 의견을 공유하여 영화에 대한 새로운 관점을 얻어보세요.  <br>
좋아하는 영화, 추천하고 싶은 작품, 특별한 감동을 준 영화 등 다양한 주제로 이야기를 나누면서 즐거운 시간 보내시기 바랍니다.</b> <br> <br> 

### [Go To MoovDa | Project Result](https://github.com/codestates-seb/seb44_main_020) <br>
### [Go To Wiki | Project Record](https://github.com/codestates-seb/seb44_main_020/wiki) <br><br><br>


## MoovDa Page View <br>

- <b>Main Page</b>

![ezgif com-video-to-gif (1)](https://github.com/codestates-seb/seb44_main_020/assets/64067205/2ff34663-0d0f-45c2-bbde-85c5a8efd630) <br>





- <b>Movie Search Page</b>
- <b>Movie Detail Page</b>
- <b>Member Detail Page</b>
- <b>Question Page</b>
- <b>Answer Page</b>

<br><br><br>

## Team MoovDa <br>

### Frontend <br>

- <b>전수빈</b> <br>
회고 및 소감 작성해주세요.

<details>
<summary>전수빈 Worklog📜</summary>


<br>

 <b>Position</b> : Frontend

 <b>Stack</b> : Typescript, ReactJS, NextJS, Redux Toolkit, Styled Components

 <b>Works</b> : 

1. 



</details>
<br>

- <b>안현지</b> <br>
`소중한 경험 자산`
한 달 채 안되는 기간동안 프로젝트를 진행하면서 정말 다양한 상황들을 마주했습니다. 일정이 짧아 한정된 시간 안에 프로젝트 기획과 디자인, 개발까지 완성하는 것은 결코 쉬운 일이 아니었습니다. 이번 프로젝트를 통해 팀원 간 소통의 중요성을 다시 한 번 깨달았습니다. 지속적인 커뮤니케이션과 피드백을 하면서 최선의 결과를 도출하기 위해 노력했습니다. 또한 팀원 모두가 팀 내의 진행 상황을 파악해가며 다 함께 페이스를 맞추는 것이 중요한 일임을 느꼈습니다. 프로젝트 중간중간 어려움과 절망도 있었지만 결국 해결해내는 모습을 보면서 이 또한 유의미한 경험으로 받아들일 수 있었습니다. 
<details>
<summary>안현지 Worklog📜</summary>

<br>

 <b>Position</b> : Frontend

 <b>Stack</b> : Typescript, ReactJS, NextJS, Redux Toolkit, Styled Components

 <b>Works</b> : 

1. 페이지 UI 구성 및 피그마 이용해 프로토타입 구현
    * 메인 페이지
    * 질문 리스트 페이지
    * 질문 상세 페이지 

2. MainPoster 컴포넌트
    * props를 전달하여 조건부 렌더링
      * default : 영화 포스터 + 제목
      * 본영화 섹션에서 사용될 때, 별점 노출
      * 볼영화 섹션에서 사용될 때, (마이페이지의 삭제 버튼을 누르면) 삭제 아이콘 노출
    * styled-components의 ThemeProvider 적용 
      *  컴포넌트의 크기를 유동적으로 조정하여 여러 페이지에서 재사용할 수 있도록 함
    * 볼영화 삭제 기능 구현

3. MainPage
    * 자동 재생되는 캐러셀 슬라이더 구현
      * react-slick 라이브러리 사용 (centermode 적용)
    * 영화 포스터 조회 기능 구현

4. MyPage
    * UI 디자인 재구성
    * 로그인한 본인의 마이페이지인 경우와 타 사용자의 프로필을 클릭하여 방문하는 경우를 구분하여 조건부 렌더링
       * 로그인한 사용자 본인의 페이지인 경우에만 볼 영화의 편집 버튼을 노출 <br>
         -> 클릭하면 메인 포스터 컴포넌트의 삭제 아이콘 노출
       * 로그인한 사용자 본인의 페이지인 경우에만 계정 관리 영역 노출
    * 볼 영화, 본 영화 리스트
        * react-slick 사용하여 캐러셀 슬라이더 구현 
        * 캐러셀 드래그 시 클릭 이벤트(영화 상세페이지로 이동) 실행되는 것 방지
    * 회원 정보 조회, 회원 삭제 기능 구현

5. MovieDetail Page
    * 영화 상세 정보 조회
    * UI 디자인 재구성
    * 코멘트
        * 모달 팝업
        * 별점 구현
        * 코멘트 CRUD
            * 코멘트 추가 시 본 영화 리스트 추가
            * 코멘트 삭제 시 본 영화 리스트 삭제
        * 리스트 페이지네이션 적용
        * 코멘트 좋아요 구현
            * 좋아요 아이콘 클릭 시 리렌더링 전 까지는 클라이언트 측에서 UI 임시 반영(좋아요 수 변경, 좋아요 상태에 따른 아이콘 색 변경)
    * 볼 영화 리스트 추가, 기능 구현
6. Footer
    * footer UI 수정
</details>
<br>

- <b>강예현</b> <br>
회고 및 소감 작성해주세요.

<details>
<summary>강예현 Worklog📜</summary>

<br>

 <b>Position</b> : Frontend

 <b>Stack</b> : 

 <b>Works</b> : 

1. 

</details>

<br>

### Backend <br>


- <b>김연우</b> <br>
`직접 해보니 알겠다.` 기획부터 API 명세서, ERD, 개발 그리고 배포까지 모든 과정을 처음부터 끝까지 팀과 직접 했습니다. 이전에는 어느 정도 가이드가 있었거나,
텍스트로만 받아들이던 것들을 직접 해보니 "아 이렇게 하는 것이 이래서 중요하구나!" 를 몸소 깨달았습니다. 프로젝트를 시작하면 기능 구현 즉, 코드만 주구장창 작성할 줄 알았습니다.
현실은 그렇지 않았습니다. 초기에 기획 단계에서 왜 충분히 시간을 투자해야 하는지, 프로젝트 처음부터 끝까지 문서화가 왜 중요한지 깨달았습니다. 개발자에 대해 얘기할 때 소통이라는 키워드가
빠지지 않는데, 이전에는 크게 와닿지 않았으나, 프로젝트를 진행하면서 프론트엔드 팀원들과 백엔드 팀원들 모두 소통할 일이 정말 많았고 의견 차이도 종종 있어서 서로 소통하며 해결한 경우도 있습니다.
아쉬운 점이 있다면, 코드 리뷰입니다. 내가 원하는 기능은 동작하는데 이 코드가 좋은 코드인지에 대한 고민이 항상 있었고 마땅히 물어볼 사람이나 여유가 없었습니다. 이 부분에 있어서 공부가 필요할 것 같습니다.
짧다면 짧고, 길다면 긴 기간동안 좋은 팀원들과 함께 프로젝트를 진행하여 정말 많은 것을 배웠습니다.
 

<details>
<summary>김연우 Worklog📜</summary>

<br>

 <b>Position</b> : Backend

 <b>Stack</b> : Spring Boot, Spring Data JPA, EC2, RDS, MySQL, QueryDSL

 <b>Works</b> : 

1. Movie

    * OPEN API 이용하여 영화 데이터 DB 저장
    * 영화 데이터 이용하여 영화 상세 페이지 구현
    * 장르, 나라, 연령, 별점 필터를 이용한 영화 검색 기능 구현(QueryDSL)
    * 메인 페이지 구현, GET 요청시 랜덤으로 영화 10개 응답    

2. Comment

   * 코멘트와 별점 기능 구현
   * 토큰을 이용하여 인증된 멤버만 수정, 삭제 가능

3. Watch

   * 보고 싶은 영화 기능 구현
   * 코멘트 작성 시 본 영화에 추가
   * Mypage에서 볼 영화, 본 영화 리스트 기능 구현

4. Deployment

   * AWS EC2, RDS(MySQL) 세팅
   * 로드밸런서를 이용하여 Scale-out 적용 <[Go To Notion | Record](https://heathered-creek-b2a.notion.site/AWS-Load-Balancer-d1ae72550d6a4248971d141fe56e2a64?pvs=4)>

5. Documentation
   
    * Git Wiki 작성 <[Go To Wiki | Record](https://github.com/codestates-seb/seb44_main_020/wiki)>
    * README 작성

</details>
<br>

- <b>정민우</b> <br>
`협업의 중요성` 살아오면서 이렇게 다른 사람들과 제대로 협업을 했다고 느낀 것은 처음이었던 것 같습니다. 대학생 때도 프로젝트를 진행했었지만 그 때는 github를 이용하지 않아 개발자로 협업을 한다는 느낌이 많이 없었습니다. 하지만 코드스테이츠에서 여러 기술과 스택을 배우고, 좋은 팀원분들을 만나 좋은 협업 경험이 되었습니다. 
아쉬운 점은 제가 다른 팀원들에 비해 부족함이 많아서 팀원분들과 멘토분에게 이것 저것 많이 물어보고 구글링하며 작업을 해서 제가 만든 기능이 많지 않다는 것입니다.
그래도 session인증도 이해도 버거웠던 제가 oauth와 jwt 로그인 기능을 어느정도 완성했다는 것에 많이 보람을 느끼며 다음에 또 이런 기회가 찾아온다면 더 잘 코딩할 자신이 생겼습니다.  

<details>
<summary>정민우 Worklog📜</summary>

<br>

 <b>Position</b> : Backend

 <b>Stack</b> :  Java, Spring Boot, Spring Data JPA, mySQL, Spring Security

 <b>Works</b> : 

1. Member
	* 로그인 후 DB에 멤버 정보 저장

2. JWT 토큰
	* JWT ACCESS TOKEN 발행
	* JWT REFRESH TOKEN 발행

3. 구글 OAuth 2.0
	* OAuth 2.0 로그인 시 JWT 토큰에 구글 memberId와 이름 저장
 	* 로그인 성공 시 URI에 JWT 토큰을 넣은 후 메인 홈페이지로 리다이렉트
 	* 로그아웃 기능 구현

</details>
<br>

- <b>김민성</b> <br>
`남의 것을 내 것으로 바꾸는 것도 능력이다.` 이번 메인 프로젝트를 2주 정도 진행하면서 정말 많은 것을 배우고 느꼈습니다.
저희가 초반에 설계하고 기획한대로 매끄럽게 진행되지는 않았지만 한 사람이 작업하는것이 아닌 여러 사람이 모여 협업을
하는 과정이기 때문에 불가피한 일이라 생각합니다. 오히려 그 과정에서 클라이언트와 원활하게 소통하는 방법을 자연스럽게 배울 수 있었다고 생각합니다.
프로그래머로서 소통은 없어서는 안 될 중요한 능력이라고 알고 있고 이번 프로젝트에서 그 능력을 향상시키는 좋은 밑거름이 된 것 같다고 생각합니다.
질문과 답변 기능을 구현하면서 페이지네이션 기능을 구현함에 있어서 어려움을 느끼고 있었는데 페이지네이션 예시를 찾아 보고 다른 사람들의 레퍼런스 코드
들을 보면서 "이 사람은 이런식으로 코드를 작성해서 페이지네이션을 구현했구나." , "이 사람은 저 사람과 비슷한데 뭔가 더 코드가 깔끔하고 가시성이 있네"
등을 느꼈습니다. 그런식으로 비교하면서 저희 프로젝트에 방향과 맞는 코드를 구현했고 프로젝트를 완성시켰습니다.
단순 기능 구현 목적이 아닌 우리 프로젝트에 방향이나 효율성 등에 맞는 코드들을 구현하려고 노력했습니다.
메인 프로젝트 첫 시작 때는 "내가 구현을 잘할 수 있을까.." 라는 불안함이나 걱정이 앞섰지만, Sprint3 회고를 작성하고 있는 지금은 내가 몰랐던 새로운 코드들을 접할수 있다는 두근거림과 기대로 프로젝트를 맞이할 수 있을 것 같다는 생각이 듭니다.
이번 프로젝트를 계기로 코딩에 대한 두려움을 없애고 자신감 있게 코드를 작성할 수 있을 것 같습니다.

<details>
<summary>김민성 Worklog📜</summary>

<br>

 <b>Position</b> : Backend

 <b>Stack</b> : Java, mySQL, AWS, Spring Boot JPA

 <b>Works</b> : 

1. 질문 CRUD 기능 구현
	* 질문 전체 조회 (게시판 리스트)
   		* 답변 수와 조회 수 기능 구현
		* 작성 최신 순으로 정렬
		* 페이지네이션 기능 구현
	* 질문 상세 조회
		* 질문에 대한 답변 정보를 나타내는 기능 구현
		* 답변 정보 페이지네이션 기능 구현
		* 답변 작성 최신 순으로 정렬
	* 질문 작성
		* 질문 작성 유효성 검사
	* 질문 수정 / 삭제
		* AccessToken 비교해서 질문을 작성한 유저인지 확인하는 기능 구현
		* 질문 수정 유효성 검사
		* 예외 코드 작성

2. 답변 CRUD 기능 구현
	* 답변 작성
		* 답변 작성 유효성 검사
	* 답변 수정 / 삭제
		* AccessToken 비교해서 답변을 작성한 유저인지 확인하는 기능 구현 
		* 답변 수정 유효성 검사
		* 예외 코드 작성 


</details>
 
