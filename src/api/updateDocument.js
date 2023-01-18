import { request } from "../utils/request.js";

export const updateDocument = async ({ id, title, content }) => {
  await request(`/documents/${id}`, {
    method: "PUT",
    body: JSON.stringify({
      title: title.trim() !== "" ? title : "제목 없음",
      content: content,
    }),
  });
};
