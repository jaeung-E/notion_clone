import { request } from "../utils/request";

export const deleteDocument = async (id) => {
  await request(`/documents/${id}`, {
    method: "DELETE",
  });
};
