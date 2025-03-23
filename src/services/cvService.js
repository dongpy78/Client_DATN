import fetchApi from "../utils/fetchApi";

const createNewCv = (data) => {
  return fetchApi.post(`/create-new-cv`, data);
};

const getAllListCvByPostService = (data) => {
  return fetchApi.get(
    `/get-all-cv-by-post?limit=${data.limit}&offset=${data.offset}&postId=${data.postId}`
  );
};

const getAllListCvByUserIdService = (data) => {
  return fetchApi.get(
    `/get-all-cv-by-user?limit=${data.limit}&offset=${data.offset}&userId=${data.userId}`
  );
};

const getDetailCvService = (id, roleCode) => {
  return fetchApi.get(`/get-detail-cv-by-id?cvId=${id}&roleCode=${roleCode}`);
};

export {
  createNewCv,
  getAllListCvByUserIdService,
  getDetailCvService,
  getAllListCvByPostService,
};
