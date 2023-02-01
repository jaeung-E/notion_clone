import { request } from "../utils/request.js";

export const getDocumentList = async () => {
  return await request("/documents");
};
