import { request } from "../utils/request.js";

export const getDocument = async (id) => {
  return await request(`/documents/${id}`);
};
