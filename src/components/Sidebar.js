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

export default function Sidebar({
  $target,
  initialState,
  onClickDocument,
  onOpen,
}) {
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
    onOpen,
    onAddChild: async ($root) => {
      const { id } = await createDocument($root.dataset.id);
      const $ul = $root.querySelector("ul");

      this.setState({ documents: await getDocumentList(), selectedId: id });
      if ($ul.classList.contains("hidden")) onOpen($root);
      push(`/documents/${id}`);
    },
    onRemove: async ($root) => {
      const { id } = $root.dataset;
      const openList = getStorage(OPEN_DOCUMENT_LIST, []);
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
    content: `<div>
      <img src='/assets/add.svg' />
      <span>새 페이지</span>
    </div>`,
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
}
