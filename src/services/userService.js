// userService.js
import fetchApi from "../utils/fetchApi";

const getListPostService = (data) => {
  if (!data?.search) {
    data.search = "";
  }
  if (data.isHot === 1) {
    return fetchApi.get(
      `/posts/filter?limit=${data.limit}&offset=${data.offset}&categoryJobCode=${data.categoryJobCode}&addressCode=${data.addressCode}&salaryJobCode=${data.salaryJobCode}&categoryJoblevelCode=${data.categoryJoblevelCode}&categoryWorktypeCode=${data.categoryWorktypeCode}&experienceJobCode=${data.experienceJobCode}&sortName=${data.sortName}&isHot=${data.isHot}&search=${data.search}`
    );
  }
  return fetchApi.get(
    `/posts/filter?limit=${data.limit}&offset=${data.offset}&categoryJobCode=${data.categoryJobCode}&addressCode=${data.addressCode}&salaryJobCode=${data.salaryJobCode}&categoryJoblevelCode=${data.categoryJoblevelCode}&categoryWorktypeCode=${data.categoryWorktypeCode}&experienceJobCode=${data.experienceJobCode}&sortName=${data.sortName}&search=${data.search}`
  );
};

const getDetailPostByIdService = (id) => {
  return fetchApi.get(`/posts/detail?id=${id}`);
};

const getDetailUserById = (id) => {
  return fetchApi.get(`/auth/detail-user?userId=${id}`);
};

const UpdateUserSettingService = (data) => {
  return fetchApi.put(`/setDataUserSetting`, data);
};

const getListCompany = (data) => {
  return fetchApi.get(
    `/list-companies?limit=${data.limit}&offset=${data.offset}&search=${data.search}`
  );
};

//===============ALL CODE========================//
const getAllCodeService = (type) => {
  return fetchApi.get(`/get-allcode?type=${type}`);
};

const getAllSkillByJobCode = (categoryJobCode) => {
  return fetchApi.get(`skills-by-jobcode?categoryJobCode=${categoryJobCode}`);
};

const getDetailCompanyById = (id) => {
  return fetchApi.get(`/companies/by-id?id=${id}`);
};

//===============ORDER PACKAGE========================//
const getPackageByType = (isHot) => {
  return fetchApi.get(`/get-package-by-type?isHot=${isHot}`);
};
const getPaymentLink = (id, amount) => {
  return axios.get(`/get-payment-link?id=${id}&amount=${amount}`);
};

export {
  getListPostService,
  getDetailPostByIdService,
  getDetailUserById,
  getAllCodeService,
  UpdateUserSettingService,
  getAllSkillByJobCode,
  getListCompany,
  getDetailCompanyById,
  getPackageByType,
  getPaymentLink,
};
