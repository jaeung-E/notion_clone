import { request } from "../utils/request";

export const getDocumentList = async () => {
  return await request("/documents");
};
