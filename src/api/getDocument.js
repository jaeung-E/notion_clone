import { request } from "../utils/request";

export const getDocument = async (id) => {
  return await request(`/documents/${id}`);
};
