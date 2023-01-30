import App from "./components/App.js";
import reset from "./css/reset.css";
import main from "./css/index.css";
import arrow from "./assets/arrow.svg";
import close from "./assets/close.svg";
import add from "./assets/add.svg";

const $target = document.querySelector("#app");

new App({ $target });
