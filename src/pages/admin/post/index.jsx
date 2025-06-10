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
import {
  Link,
  useActionData,
  useLoaderData,
  useNavigate,
} from "react-router-dom";
import PostTableWrapper from "../../../assets/wrappers/PostTableWrapper";

export const loader = async ({ request }) => {
  const params = new URLSearchParams(request.url.split("?")[1]);
  const page = parseInt(params.get("page") || "1", 10);
  const limit = 5; // Giữ nguyên limit cho phân trang
  const offset = (page - 1) * limit;
  const user = getFromLocalStorage("user");
  const search = params.get("search") || "";
  const status = params.get("status") || "all";

  console.log("Loader params:", {
    page,
    limit,
    offset,
    search,
    status,
    companyId: user?.companyId,
  });

  try {
    let url = `/posts/list-post?limit=${limit}&offset=${offset}&companyId=${
      user?.companyId || ""
    }`;
    if (search) url += `&search=${encodeURIComponent(search)}`;

    console.log("Fetching URL in loader:", url);
    const response = await axiosInstance.get(url);
    console.log("Loader API response:", response.data);

    if (response.status === 200) {
      const numOfPages = Math.ceil(response.data.data.count / limit) || 1;
      return {
        typeJobs: response.data.data.rows || [],
        allJobs: [], // Placeholder, sẽ được cập nhật sau
        searchValues: { search, status },
        numOfPages,
        currentPage: page,
        totalCount: response.data.data.count || 0,
      };
    }
    throw new Error("Failed to fetch type jobs.");
  } catch (error) {
    console.error(
      "Error fetching type jobs:",
      error.response?.data || error.message
    );
    return {
      typeJobs: [],
      allJobs: [],
      searchValues: { search, status },
      numOfPages: 1,
      currentPage: 1,
      totalCount: 0,
    };
  }
};

export const action = async ({ request }) => {
  const formData = await request.formData();
  const search = formData.get("search") || "";
  const status = formData.get("status") || "all";
  const params = new URLSearchParams(request.url.split("?")[1]);
  const page = parseInt(params.get("page") || "1", 10);
  const offset = (page - 1) * 5;
  const user = getFromLocalStorage("user");

  try {
    let url = `/posts/list-post?limit=5&offset=${offset}&companyId=${
      user?.companyId || ""
    }`;
    if (search) url += `&search=${encodeURIComponent(search)}`;

    console.log("Fetching URL in action:", url);
    const response = await axiosInstance.get(url);
    console.log("Action API response:", response.data);

    if (response.status === 200) {
      const numOfPages = Math.ceil(response.data.data.count / 5) || 1;
      return {
        typeJobs: response.data.data.rows || [],
        allJobs: [], // Placeholder, sẽ được cập nhật sau
        searchValues: { search, status },
        numOfPages,
        currentPage: page,
        totalCount: response.data.data.count || 0,
      };
    }
    throw new Error("Failed to fetch type jobs.");
  } catch (error) {
    console.error(
      "Error fetching type jobs:",
      error.response?.data || error.message
    );
    return {
      typeJobs: [],
      allJobs: [],
      searchValues: { search, status },
      numOfPages: 1,
      currentPage: page,
      totalCount: 0,
    };
  }
};

// Hàm lấy toàn bộ dữ liệu
const fetchAllJobs = async (companyId) => {
  let allJobs = [];
  let offset = 0;
  const limit = 100; // Giới hạn số lượng tối đa, điều chỉnh nếu cần

  while (true) {
    const url = `/posts/list-post?limit=${limit}&offset=${offset}&companyId=${companyId}`;
    const response = await axiosInstance.get(url);
    const jobs = response.data.data.rows || [];
    allJobs = [...allJobs, ...jobs];
    if (jobs.length < limit) break; // Dừng nếu không còn dữ liệu
    offset += limit;
  }

  return allJobs;
};

const Post = () => {
  const loaderData = useLoaderData();
  const actionData = useActionData();
  const navigate = useNavigate();
  const [typePost, setTypePost] = useState(loaderData?.typeJobs || []);
  const [allJobs, setAllJobs] = useState(loaderData?.allJobs || []); // Lưu toàn bộ dữ liệu
  const [totalCount, setTotalCount] = useState(loaderData?.totalCount || 0);
  const [loading, setLoading] = useState(false);
  const numOfPages = actionData?.numOfPages || loaderData?.numOfPages || 1;
  const currentPage = actionData?.currentPage || loaderData?.currentPage || 1;
  const searchValues = actionData?.searchValues ||
    loaderData?.searchValues || { search: "", status: "all" };

  const handlePageChange = (pageNumber) => {
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set("page", pageNumber);
    navigate(`/admin/post?${searchParams.toString()}`);
  };

  useEffect(() => {
    const user = getFromLocalStorage("user");
    const fetchData = async () => {
      setLoading(true);
      try {
        const jobs = await fetchAllJobs(user?.companyId || "");
        setAllJobs(jobs);
        filterJobs(jobs, searchValues.search, searchValues.status); // Lọc ngay khi tải dữ liệu
      } catch (error) {
        console.error("Error fetching all jobs:", error);
      } finally {
        setLoading(false);
      }
    };

    if (allJobs.length === 0) {
      fetchData();
    }
  }, []); // Chạy một lần khi component mount

  useEffect(() => {
    if (actionData) {
      filterJobs(
        allJobs,
        actionData.searchValues.search,
        actionData.searchValues.status
      );
      setTotalCount(actionData.totalCount || 0);
    } else {
      filterJobs(
        allJobs,
        loaderData?.searchValues.search,
        loaderData?.searchValues.status
      );
      setTotalCount(loaderData?.totalCount || 0);
    }
    console.log("Updated typePost:", typePost, "Total Count:", totalCount);
  }, [loaderData, actionData, allJobs]);

  const filterJobs = (jobs, search, status) => {
    let filteredJobs = [...jobs];
    if (search) {
      filteredJobs = filteredJobs.filter((job) =>
        job.postDetailData?.name?.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (status && status !== "all") {
      filteredJobs = filteredJobs.filter((job) => job.statusCode === status);
    }
    setTypePost(filteredJobs.slice((currentPage - 1) * 5, currentPage * 5)); // Phân trang
    console.log(setTypePost);
    setTotalCount(filteredJobs.length); // Cập nhật tổng số lượng sau lọc
  };

  return (
    <>
      <>
        <SearchPost />

        {/* Thêm điều kiện kiểm tra nếu không có bài đăng */}
        {typePost.length === 0 ? (
          <PostTableWrapper>
            <div>
              <h4>Chưa có bài đăng tuyển dụng nào</h4>
              {/* <p className="text-muted">
                Bạn có thể tạo bài đăng mới bằng cách nhấn vào nút bên dưới
              </p> */}
              <div style={{ marginTop: "2rem" }}>
                <Link
                  style={{ fontSize: "14px" }}
                  to="/admin/post/add"
                  className="btn btn-primary mt-3"
                >
                  Tạo bài đăng mới
                </Link>
              </div>
            </div>
          </PostTableWrapper>
        ) : (
          <>
            <PostTable
              typePost={typePost}
              currentPage={currentPage}
              totalCount={totalCount}
            />
            {numOfPages > 1 && (
              <PagePagination
                numOfPages={Math.ceil(totalCount / 5)}
                currentPage={currentPage}
                handlePageChange={handlePageChange}
              />
            )}
          </>
        )}
      </>
    </>
  );
};

export default Post;
