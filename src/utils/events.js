import { OPEN_DOCUMENT_LIST } from "../constants/storageKey.js";
import { getStorage, updateStorage } from "./storage.js";

export const handleOpen = ($root) => {
  const $openButton = $root.querySelector(".open-button");
  const $ul = $root.querySelector("ul");
  const openList = getStorage(OPEN_DOCUMENT_LIST, []);

  if ($ul.classList.contains("hidden")) {
    updateStorage(OPEN_DOCUMENT_LIST, [...openList, $root.dataset.id]);
  } else {
    openList.splice(openList.indexOf($root.dataset.id), 1);
    updateStorage(OPEN_DOCUMENT_LIST, openList);
  }

  $openButton.classList.toggle("open");
  $ul.classList.toggle("hidden");
};
