import RootPage from "../pages/RootPage.js";
import DocumentEditPage from "../pages/DocumentEditPage.js";
import { initRouter } from "../utils/router.js";
import DocumentList from "../components/DocumentList.js";
import { getDocumentList } from "../api/getDocumentList.js";

export default function App({ $target }) {
  const $appContainer = document.createElement("div");
  $appContainer.classList.add("app-container");
  $target.appendChild($appContainer);

  const documentList = new DocumentList({
    $target: $appContainer,
    initialState: [],
  });

  const $pageContainer = document.createElement("div");
  $pageContainer.classList.add("page-container");
  $appContainer.appendChild($pageContainer);

  const rootPage = new RootPage({ $target: $pageContainer });

  const documentEditPage = new DocumentEditPage({
    $target: $pageContainer,
    initialState: {
      documentId: 0,
      document: {
        title: "",
        content: "",
      },
    },
  });

  this.route = async () => {
    const { pathname } = window.location;
    $pageContainer.innerHTML = "";
    documentList.setState(await getDocumentList());

    if (pathname === "/") {
      rootPage.render();
    } else if (pathname.indexOf("/documents/") === 0) {
      const [, , documentId] = pathname.split("/");
      documentEditPage.setState({ documentId: documentId });
    }
  };

  this.route();
  initRouter(() => this.route());
}
