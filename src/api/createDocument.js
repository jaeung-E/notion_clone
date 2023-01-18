import { request } from "../utils/request";

export const createDocument = async (parentId) => {
  const document = await request(`/documents`, {
    method: "POST",
    body: JSON.stringify({
      title: "제목 없음",
      parent: parentId || null,
    }),
  });

  return document;
};
