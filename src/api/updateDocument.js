import { request } from "../utils/request.js";

export const updateDocument = async (document) => {
  await request(`/documents/${document.id}`, {
    method: "PUT",
    body: JSON.stringify({
      title: document.title.trim() !== "" ? document.title : "제목 없음",
      content: document.content,
    }),
  });
};
