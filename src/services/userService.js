// userService.js
import fetchApi from "../utils/fetchApi";

// const getListPostService = (data) => {
//   const params = {
//     limit: data.limit,
//     offset: data.offset,
//     categoryJobCode: data.categoryJobCode || "",
//     addressCode: data.addressCode || "",
//     salaryJobCode: data.salaryJobCode || "",
//     categoryJoblevelCode: data.categoryJoblevelCode || "",
//     categoryWorktypeCode: data.categoryWorktypeCode || "",
//     experienceJobCode: data.experienceJobCode || "",
//     sortName: data.sortName || false,
//     search: data.search || "",
//     ...(data.isHot === 1 && { isHot: "1" }), // Chuỗi "1" để khớp backend
//   };

//   return fetchApi.get("/posts/filter", { params });
// };

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

export { getListPostService };
