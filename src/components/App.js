import RootPage from "../pages/RootPage.js";
import DocumentEditPage from "../pages/DocumentEditPage.js";
import { initRouter } from "../utils/router.js";
import { getDocumentList } from "../api/getDocumentList.js";
import { updateDocument } from "../api/updateDocument.js";
import Sidebar from "./SideBar.js";
import { getStorage } from "../utils/storage.js";
import { SIDEBAR_WIDTH } from "../constants/storageKey.js";
import { getDocument } from "../api/getDocument.js";

export default function App({ $target }) {
  let timer = null;

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
  $pageWrapper.style.marginLeft = getStorage(SIDEBAR_WIDTH);
  $pageWrapper.appendChild($pageContainer);
  $appContainer.appendChild($pageWrapper);

  const rootPage = new RootPage({ $target: $pageContainer });

  const documentEditPage = new DocumentEditPage({
    $target: $pageContainer,
    initialState: {
      id: "",
      title: "",
      content: "",
      documents: [],
      isLoading: false,
    },
    onEdit: async (e) => {
      const isTitle = e.target
        .closest("div")
        .classList.contains("editor-title");
      const isContent = e.target.classList.contains("editor-content");
      const { id } = documentEditPage.state;

      if (isTitle) {
        const $documentTitle = document.querySelector(
          `li[data-id='${id}'] span`
        );
        documentEditPage.setState({
          ...documentEditPage.state,
          title: e.target.value,
        });
        $documentTitle.textContent = documentEditPage.state.title;
      }

      if (isContent) {
        documentEditPage.setState({
          ...documentEditPage.state,
          content: e.target.value,
        });
      }

      if (timer) {
        clearTimeout(timer);
      }

      documentEditPage.setState({
        ...documentEditPage.state,
        isLoading: true,
      });

      timer = setTimeout(async () => {
        const { id, title, content } = documentEditPage.state;
        await updateDocument({ id, title, content });

        sidebar.setState({
          ...sidebar.state,
          documents: await getDocumentList(),
        });
        documentEditPage.setState({
          ...documentEditPage.state,
          isLoading: false,
        });
      }, 500);
    },
  });

  this.route = async () => {
    const { pathname } = window.location;
    $pageContainer.innerHTML = "";

    if (pathname === "/") {
      rootPage.render();
    } else if (pathname.indexOf("/documents/") === 0) {
      const [, , documentId] = pathname.split("/");
      const { id, title, content, documents } = await getDocument(documentId);

      documentEditPage.render();
      documentEditPage.setState({
        ...documentEditPage.state,
        id,
        title,
        content,
        documents,
      });
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
