import fetchApi from "../utils/fetchApi";

const createNewCv = (data) => {
  return fetchApi.post(`/create-new-cv`, data);
};

export { createNewCv };
