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

const getStatisticalCv = (data) => {
  return fetchApi.get(
    `/get-statistical-cv?limit=${data.limit}&offset=${data.offset}&fromDate=${data.fromDate}&toDate=${data.toDate}&companyId=${data.companyId}`
  );
};

const getFilterCv = (data) => {
  return fetchApi.get(
    `/fillter-cv-by-selection?limit=${data.limit}&offset=${data.offset}&experienceJobCode=${data.experienceJobCode}&categoryJobCode=${data.categoryJobCode}&listSkills=${data.listSkills}&otherSkills=${data.otherSkills}&salaryCode=${data.salaryCode}&provinceCode=${data.provinceCode}`
  );
};

const checkSeeCandiate = (data) => {
  return fetchApi.get(
    `/check-see-candidate?userId=${data.userId}&companyId=${data.companyId}`
  );
};

export {
  createNewCv,
  getAllListCvByUserIdService,
  getDetailCvService,
  getAllListCvByPostService,
  getStatisticalCv,
  getFilterCv,
  checkSeeCandiate,
};
