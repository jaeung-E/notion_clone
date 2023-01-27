import { OPEN_DOCUMENT_LIST } from "../constants/storageKey";
import { push } from "../utils/router";
import { getStorage } from "../utils/storage";

export default function DocumentList({
  $target,
  initialState,
  onOpen,
  onAddRoot,
  onAddChild,
  onRemove,
}) {
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

  $list.addEventListener("click", (e) => {
    const $root = e.target.closest(".root-document");
    const openList = getStorage(OPEN_DOCUMENT_LIST, []);
    const targetClassList = e.target.classList;

    if (e.target.className === "document-title") {
      push(`/documents/${$root.dataset.id}`);
    }

    if (targetClassList.contains("open-button")) {
      onOpen({ $root, openList, e });
    }

    if (targetClassList.contains("add-child-button")) {
      onAddChild({ $root, openList, e });
    }

    if (targetClassList.contains("remove-button")) {
      onRemove({ $root, openList });
    }

    if (targetClassList.contains("add-root-button")) {
      onAddRoot();
    }
  });

  this.render();
}
