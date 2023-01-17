import { getStorage, updateStorage } from "../utils/storage.js";
import { request } from "../utils/api.js";
import { push } from "../utils/router.js";
import { OPEN_DOCUMENT_LIST } from "../constants/storageKey.js";

export default function DocumentList({ $target, initialState }) {
  const $list = document.createElement("div");
  $list.classList.add("document-list");
  $target.appendChild($list);

  let isInit = false;

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  const parseHTML = (documentList) => {
    return documentList
      .map((document) => {
        const { id, title, documents } = document;
        const isOpened =
          getStorage(OPEN_DOCUMENT_LIST, []).indexOf(String(id)) >= 0;

        return `
        <li class="root-document" data-id="${id}">
          <div class="button-container">
            <button class="open-button button"type="button">${
              isOpened ? "▼" : "▶"
            }</button>
            <span class="document-title">${title}</span>
            <button class="remove-button button "type="button">✖</button>
            <button class="add-child-button button "type="button">✚</button>
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
    ${parseHTML(this.state)}
    <button class='add-root-button button' type='button'>새로운 페이지 추가</button>
    `;

    addEvent();
  };

  const addEvent = () => {
    if (!isInit) {
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

      isInit = true;
    }
  };

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
    const body = {
      title: "제목 없음",
      parent: parseInt($root.dataset.id),
    };

    const document = await request(`/documents`, {
      method: "POST",
      body: JSON.stringify(body),
    });

    const documents = await request("/documents");
    this.setState(documents);
    push(`/documents/${document.id}`);
  };

  const removeEvent = async ({ $root, openList }) => {
    const idIndex = openList.indexOf($root.dataset.id);

    await request(`/documents/${$root.dataset.id}`, {
      method: "DELETE",
    });

    if (idIndex >= 0) {
      openList.splice(idIndex, 1);
      updateStorage(OPEN_DOCUMENT_LIST, openList);
    }

    const documents = await request("/documents");
    this.setState(documents);
    push(`/`);
  };

  const addRootEvent = async () => {
    const document = await request(`/documents`, {
      method: "POST",
      body: JSON.stringify({
        title: "제목 없음",
        parent: null,
      }),
    });

    push(`/documents/${document.id}`);
  };

  this.render();
}
