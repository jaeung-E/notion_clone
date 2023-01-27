import RootPage from "../pages/RootPage.js";
import DocumentEditPage from "../pages/DocumentEditPage.js";
import { initRouter } from "../utils/router.js";
import DocumentList from "../components/DocumentList.js";
import { getDocumentList } from "../api/getDocumentList.js";
import { updateDocument } from "../api/updateDocument.js";
import Sidebar from "./SideBar.js";

export default function App({ $target }) {
  const $appContainer = document.createElement("div");
  $appContainer.classList.add("app-container");
  $target.appendChild($appContainer);

  const sidebar = new Sidebar({
    $target: $appContainer,
    initialState: {
      documents: [],
      selectedId: 0,
    },
  });

  const $pageWrapper = document.createElement("div");
  const $pageContainer = document.createElement("div");
  $pageWrapper.classList.add("page-wrapper");
  $pageContainer.classList.add("page-container");
  $pageWrapper.appendChild($pageContainer);
  $appContainer.appendChild($pageWrapper);

  const rootPage = new RootPage({ $target: $pageContainer });

  const documentEditPage = new DocumentEditPage({
    $target: $pageContainer,
    initialState: {
      documentId: 0,
    },
    onEdit: async ({ id, title, content }) => {
      await updateDocument({ id, title, content });
      sidebar.setState({
        ...sidebar.state,
        documents: await getDocumentList(),
      });
    },
  });

  this.route = async () => {
    const { pathname } = window.location;
    $pageContainer.innerHTML = "";

    if (pathname === "/") {
      rootPage.render();
    } else if (pathname.indexOf("/documents/") === 0) {
      const [, , documentId] = pathname.split("/");
      documentEditPage.setState({ documentId: documentId });
      sidebar.setState({ ...sidebar.state, selectedId: documentId });
    }
  };

  this.route();
  initRouter(() => this.route());
  (async () => {
    sidebar.setState({
      ...sidebar.state,
      documents: await getDocumentList(),
    });
  })();
}
