import { getStorage, updateStorage } from "../utils/storage.js";
import { push } from "../utils/router.js";
import { OPEN_DOCUMENT_LIST } from "../constants/storageKey.js";
import { getDocumentList } from "../api/getDocumentList.js";
import { createDocument } from "../api/createDocument.js";
import { deleteDocument } from "../api/deleteDocument.js";

export default function DocumentList({ $target, initialState }) {
  const $list = document.createElement("div");
  $list.classList.add("document-list");
  $target.appendChild($list);

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  const parseHTML = (documentList) => {
    const { selectedId } = this.state;

    return documentList
      .map((document) => {
        const { id, title, documents } = document;
        const isOpened =
          getStorage(OPEN_DOCUMENT_LIST, []).indexOf(String(id)) >= 0;

        return `
        <li class="root-document" data-id="${id}">
          <div class="button-container ${
            id === Number(selectedId) ? "selected" : ""
          }">
            <button class="open-button button"type="button">${
              isOpened ? "▼" : "▶"
            }</button>
            <span class="document-title">${title}</span>
            <div class="button-box">
              <button class="remove-button button "type="button">✖</button>
              <button class="add-child-button button "type="button">✚</button>
            </div>
          </div>
          ${
            documents.length > 0
              ? `<ul class="child ${isOpened ? "" : "hidden"}">
                ${parseHTML(documents)}
              </ul>`
              : `<ul class="child ${isOpened ? "" : "hidden"}">
                하위 페이지가 없습니다.
              </ul>`
          }
        </li>`;
      })
      .join("");
  };

  this.render = () => {
    $list.innerHTML = `
    ${parseHTML(this.state.documents)}
    <button class='add-root-button button' type='button'>새로운 페이지 추가</button>
    `;
  };

  const addEvent = () => {
    $list.addEventListener("click", async (e) => {
      const $root = e.target.closest(".root-document");
      const $ul = $root ? $root.querySelector("ul") : "";
      const openList = getStorage(OPEN_DOCUMENT_LIST, []);
      const targetClassList = e.target.classList;

      if (e.target.className === "document-title") {
        push(`/documents/${$root.dataset.id}`);
      }

      if (targetClassList.contains("open-button")) {
        openEvent({ $root, $ul, openList, e });
      }

      if (targetClassList.contains("add-child-button")) {
        addChildEvent({ $root });

        if ($ul.classList.contains("hidden")) {
          openEvent({ $root, $ul, openList, e });
        }
      }

      if (targetClassList.contains("remove-button")) {
        removeEvent({ $root, openList });
      }

      if (targetClassList.contains("add-root-button")) {
        addRootEvent();
      }
    });
  };

  addEvent();

  const openEvent = ({ $root, $ul, openList, e }) => {
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

  const addChildEvent = async ({ $root }) => {
    const { id } = await createDocument($root.dataset.id);

    this.setState({ documents: await getDocumentList(), selectedId: id });
    push(`/documents/${id}`);
  };

  const removeEvent = async ({ $root, openList }) => {
    const { id } = $root.dataset;
    const idIndex = openList.indexOf(id);
    await deleteDocument(id);

    if (idIndex >= 0) {
      openList.splice(idIndex, 1);
      updateStorage(OPEN_DOCUMENT_LIST, openList);
    }

    this.setState({ documents: await getDocumentList(), selectedId: 0 });
    push(`/`);
  };

  const addRootEvent = async () => {
    const { id } = await createDocument();

    this.setState({ documents: await getDocumentList(), selectedId: id });
    push(`/documents/${id}`);
  };

  this.render();
}
