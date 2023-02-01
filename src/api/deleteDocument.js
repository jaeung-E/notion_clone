import { request } from "../utils/request.js";

export const deleteDocument = async (id) => {
  await request(`/documents/${id}`, {
    method: "DELETE",
  });
};
