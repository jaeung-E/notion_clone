import DocumentList from "./DocumentList";
import SidebarTitle from "./SideBarTitle";
import { updateStorage } from "../utils/storage.js";
import { push } from "../utils/router.js";
import { OPEN_DOCUMENT_LIST } from "../constants/storageKey.js";
import { getDocumentList } from "../api/getDocumentList.js";
import { createDocument } from "../api/createDocument.js";
import { deleteDocument } from "../api/deleteDocument.js";

export default function Sidebar({ $target, initialState }) {
  const $sidebar = document.createElement("div");
  $sidebar.classList.add("sidebar");
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
    onAddRoot: async () => {
      const { id } = await createDocument();

      this.setState({ documents: await getDocumentList(), selectedId: id });
      push(`/documents/${id}`);
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
  });

  const handleOpen = ({ $root, openList, e }) => {
    const $ul = $root.querySelector("ul");

    if ($ul.classList.contains("hidden")) {
      e.target.innerHTML = "▼";
      updateStorage(OPEN_DOCUMENT_LIST, [...openList, $root.dataset.id]);
    } else {
      e.target.innerHTML = "▶";
      openList.splice(openList.indexOf($root.dataset.id), 1);
      updateStorage(OPEN_DOCUMENT_LIST, openList);
    }

    $ul.classList.toggle("hidden");
  };
}
