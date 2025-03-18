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

export { getListPostService, getDetailPostByIdService };
