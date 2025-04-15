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
  return fetchApi.get(`/get-payment-link?id=${id}&amount=${amount}`);
};

const paymentOrderSuccessService = (data) => {
  return fetchApi.post(`/payment-success`, data);
};

const getHistoryTradePost = (data) => {
  return fetchApi.get(
    `/get-history-trade-post?limit=${data.limit}&offset=${data.offset}&fromDate=${data.fromDate}&toDate=${data.toDate}&companyId=${data.companyId}`
  );
};

const getHistoryTradeCv = (data) => {
  return fetchApi.get(
    `/get-history-trade-cv?limit=${data.limit}&offset=${data.offset}&fromDate=${data.fromDate}&toDate=${data.toDate}&companyId=${data.companyId}`
  );
};

const getStatisticalTypePost = (limit) => {
  return fetchApi.get(`/posts/statistics?limit=${limit}`);
};

const getStatisticalPackagePost = (data) => {
  return fetchApi.get(
    `/get-statistical-package?limit=${data.limit}&offset=${data.offset}&fromDate=${data.fromDate}&toDate=${data.toDate}`
  );
};

const getStatisticalPackageCv = (data) => {
  return fetchApi.get(
    `/get-statistical-cv?limit=${data.limit}&offset=${data.offset}&fromDate=${data.fromDate}&toDate=${data.toDate}`
  );
};

const getDetailCompanyByUserId = (userId, companyId) => {
  return fetchApi.get(
    `/companies/by-user?userId=${userId}&companyId=${companyId}`
  );
};

const getPaymentLinkCv = (id, amount) => {
  return fetchApi.get(`/get-payment-cv-link?id=${id}&amount=${amount}`);
};

const getAllToSelect = () => {
  return fetchApi.get(`/get-all-package-cv-select`);
};

const paymentOrderSuccessServiceCv = (data) => {
  return fetchApi.post(`/payment-cv-success`, data);
};

export {
  paymentOrderSuccessServiceCv,
  getPaymentLinkCv,
  getAllToSelect,
  getDetailCompanyByUserId,
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
  paymentOrderSuccessService,
  getHistoryTradePost,
  getStatisticalTypePost,
  getStatisticalPackagePost,
  getStatisticalPackageCv,
  getHistoryTradeCv,
};
