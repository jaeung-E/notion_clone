export default function HomePage({ $target }) {
  this.render = () => {
    $target.innerHTML = `
      <div class="home-container">
        <h1>노션 클로닝 프로젝트</h1>
        <p>
          Vanilla JS로 구현한 노션 클로닝 프로젝트 입니다. <br>
          간단한 문서 편집기이며, 주요 기능은 다음과 같습니다.<br><br>
          
          <ul>
            <li>문서, 하위 문서 추가 및 삭제</li>
            <li>문서 제목, 컨텐츠 수정</li>
            <li>좌측 Sidebar의 크기 조절</li>
            <li>문서 편집 시 API 요청 횟수를 줄이기 위한 Debouncing 처리와, 편집 완료를 알려주는 시각적인 Spinner</li>
            <li>현재 선택된 문서의 하위 문서로 이동할 수 있는 링크</li>
            <li>열려있는 문서의 정보를 SessionStorage에 저장하여, 브라우저 종료 전 까지 해당 상태 유지</li>
          </ul><br><br>

          또한 편집중인 문서가 저장되기 전에 다른 문서를 클릭하면, 해당 문서를 즉시 저장하도록 구현하였습니다.
        </p>
      </div>
    `;
  };
}
