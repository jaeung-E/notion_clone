import DocumentList from "./DocumentList";
import SidebarTitle from "./SideBarTitle";
import { getStorage, updateStorage } from "../utils/storage.js";
import { push } from "../utils/router.js";
import { OPEN_DOCUMENT_LIST, SIDEBAR_WIDTH } from "../constants/storageKey.js";
import { getDocumentList } from "../api/getDocumentList.js";
import { createDocument } from "../api/createDocument.js";
import { deleteDocument } from "../api/deleteDocument.js";
import Button from "./Button";
import Resizer from "./Resizer";

export default function Sidebar({ $target, initialState, onClickDocument }) {
  const $sidebar = document.createElement("div");
  $sidebar.classList.add("sidebar");
  $sidebar.style.width = getStorage(SIDEBAR_WIDTH);
  $target.appendChild($sidebar);

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    documentList.setState({ ...this.state });
  };

  const sidebarTitle = new SidebarTitle({ $target: $sidebar });

  const documentList = new DocumentList({
    $target: $sidebar,
    initialState: {
      documents: this.state.documents,
      selectedId: this.state.selectedId,
    },
    onOpen: ({ $root, openList, e }) => {
      handleOpen({ $root, openList, e });
    },
    onAddChild: async ({ $root, openList, e }) => {
      const { id } = await createDocument($root.dataset.id);
      const $ul = $root.querySelector("ul");

      this.setState({ documents: await getDocumentList(), selectedId: id });
      if ($ul.classList.contains("hidden")) handleOpen({ $root, openList, e });
      push(`/documents/${id}`);
    },
    onRemove: async ({ $root, openList }) => {
      const { id } = $root.dataset;
      const idIndex = openList.indexOf(id);
      await deleteDocument(id);

      if (idIndex >= 0) {
        openList.splice(idIndex, 1);
        updateStorage(OPEN_DOCUMENT_LIST, openList);
      }

      this.setState({ documents: await getDocumentList(), selectedId: 0 });
      push(`/`);
    },
    onClickDocument,
  });

  const addRootButton = new Button({
    $target: $sidebar,
    content: "새 페이지",
    classes: ["add-root-button"],
    onClick: async () => {
      const { id } = await createDocument();

      this.setState({ documents: await getDocumentList(), selectedId: id });
      push(`/documents/${id}`);
    },
  });

  const resizer = new Resizer({
    $target: $sidebar,
    $resizeElement: $sidebar,
  });

  const handleOpen = ({ $root, openList, e }) => {
    const $ul = $root.querySelector("ul");

    if ($ul.classList.contains("hidden")) {
      updateStorage(OPEN_DOCUMENT_LIST, [...openList, $root.dataset.id]);
    } else {
      openList.splice(openList.indexOf($root.dataset.id), 1);
      updateStorage(OPEN_DOCUMENT_LIST, openList);
    }

    e.target.classList.toggle("open");
    $ul.classList.toggle("hidden");
  };
}
