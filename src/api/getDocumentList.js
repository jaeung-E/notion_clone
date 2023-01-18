import { request } from "../utils/request";

export const getDocumentList = async () => {
  const documents = await request("/documents");

  return documents;
};
