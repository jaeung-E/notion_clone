export default function NotFoundPage({ $target }) {
  this.render = () => {
    $target.innerHTML = `
      <h1>존재하지 않는 페이지 입니다!</h1>
    `;
  };
}
