import axiosInstance from "../libs/axiosInterceptor";

const getAllCategoryBlog = (params = {}) => {
  return axiosInstance.get(`/get-all-categories`, { params });
};

const getCategoryBlogById = (id) => {
  return axiosInstance.get(`/get-category/${id}`);
};

const getAllTags = (params = {}) => {
  return axiosInstance.get(`/get-all-tags`, { params });
};

const getTagById = (id) => {
  return axiosInstance.get(`/get-tag-by-id/${id}`);
};

// ======================== //

const getAllBlogIT = (params = {}) => {
  return axiosInstance.get(`/all-posts-it`, { params });
};

const getBlogITById = (id) => {
  return axiosInstance.get(`/posts-it-by-id/${id}`);
};

// Thêm API mới để lấy bài viết theo danh mục
const getBlogsByCategory = (categoryId, params = {}) => {
  return axiosInstance.get(`/category/${categoryId}`, { params });
};
const getBlogsByTag = (tagId, params = {}) => {
  return axiosInstance.get(`/tag/${tagId}`, { params });
};

export {
  getAllCategoryBlog,
  getCategoryBlogById,
  getAllTags,
  getTagById,
  getAllBlogIT,
  getBlogITById,
  getBlogsByCategory, // Xuất hàm mới
  getBlogsByTag,
};
