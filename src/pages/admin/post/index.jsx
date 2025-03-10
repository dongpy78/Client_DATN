import React, { useEffect, useState } from "react";
import PostTable from "../../../components/post/PostTable";
import SearchPost from "../../../components/post/SearchPost";
import PagePagination from "../../../components/admin/PagePagination";
import axiosInstance from "../../../libs/axiosInterceptor";
import {
  showSuccessToast,
  showErrorToast,
} from "../../../utils/toastNotifications";
import { getFromLocalStorage } from "../../../utils/localStorage";
import { useActionData, useLoaderData, useNavigate } from "react-router-dom";

export const loader = async ({ request }) => {
  const params = new URLSearchParams(request.url.split("?")[1]);
  const page = parseInt(params.get("page") || "1", 10);
  const limit = 5; // Hoặc 10 nếu bạn muốn khớp với test API
  const offset = (page - 1) * limit;
  const user = getFromLocalStorage("user");
  console.log(user);

  try {
    const response = await axiosInstance.get(
      `/posts/list-post?limit=${limit}&offset=${offset}&companyId=${user.companyId}`
    );
    if (response.status === 200) {
      const numOfPages = Math.ceil(response.data.data.count / limit) || 1;
      return {
        typeJobs: response.data.data.rows || [], // Đảm bảo lấy đúng rows
        searchValues: {},
        numOfPages,
        currentPage: page,
        totalCount: response.data.data.count || 0,
      };
    }
    throw new Error("Failed to fetch type jobs.");
  } catch (error) {
    console.error("Error fetching type jobs:", error);
    return {
      typeJobs: [],
      searchValues: {},
      numOfPages: 1,
      currentPage: 1,
      totalCount: 0,
    };
  }
};

export const action = async ({ request }) => {
  const formData = await request.formData();
  const searchValues = Object.fromEntries(formData);
  const params = new URLSearchParams(request.url.split("?")[1]);
  const page = parseInt(params.get("page") || "1", 10);
  const offset = (page - 1) * 5;
  try {
    const searchQuery = searchValues.search
      ? `&search=${encodeURIComponent(searchValues.search)}`
      : "";
    const url = `/posts/list-post?limit=5&offset=${offset}${searchQuery}`;
    console.log("Fetching URL:", url);
    const response = await axiosInstance.get(url);
    console.log("API response:", response.data);
    if (response.status === 200) {
      const numOfPages = Math.ceil(response.data.data.count / 5) || 1;
      return {
        typeJobs: response.data.data.rows || [], // Đảm bảo lấy đúng rows
        searchValues,
        numOfPages,
        currentPage: page,
        totalCount: response.data.data.count || 0,
      };
    }
    throw new Error("Failed to fetch type jobs.");
  } catch (error) {
    console.error("Error fetching type jobs:", error);
    return {
      typeJobs: [],
      searchValues,
      numOfPages: 1,
      currentPage: page,
      totalCount: 0,
    };
  }
};

const Post = () => {
  const loaderData = useLoaderData();
  const actionData = useActionData();
  const navigate = useNavigate();
  const [typePost, setTypePost] = useState(loaderData?.typeJobs || []);
  const [totalCount, setTotalCount] = useState(loaderData?.totalCount || 0);
  const [loading, setLoading] = useState(false);
  const numOfPages = actionData?.numOfPages || loaderData?.numOfPages || 1;
  const currentPage = actionData?.currentPage || loaderData?.currentPage || 1;

  const handlePageChange = (pageNumber) => {
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set("page", pageNumber);
    navigate(`/admin/post?${searchParams.toString()}`);
  };

  useEffect(() => {
    if (actionData) {
      setTypePost(actionData.typeJobs || []);
      setTotalCount(actionData.totalCount || 0);
    } else {
      setTypePost(loaderData?.typeJobs || []);
      setTotalCount(loaderData?.totalCount || 0);
    }
  }, [loaderData, actionData]);

  return (
    <>
      <SearchPost />
      <PostTable
        typePost={typePost}
        // onDelete={handleDelete}
        currentPage={currentPage}
        totalCount={totalCount}
      />
      {numOfPages > 1 && (
        <PageTypeJob
          numOfPages={numOfPages}
          currentPage={currentPage}
          handlePageChange={handlePageChange}
        />
      )}
    </>
  );
};

export default Post;
