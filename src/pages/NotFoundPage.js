import { push } from "../utils/router.js";

export default function NotFoundPage({ $target }) {
  this.render = () => {
    $target.innerHTML = `
      <div class='not-found-container'>
        <div>&#x1F625</div>
        <h1>존재하지 않는 페이지 입니다!</h1>
        <button class='home-button'>Home</button>
      </div>
    `;

    document.querySelector(".home-button").addEventListener("click", () => {
      push("/");
    });
  };
}
