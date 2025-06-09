import React, { useEffect, useState, useCallback } from "react";
import truncate from "html-truncate";
import DOMPurify from "dompurify";
import { Input } from "antd";
import ReactPaginate from "react-paginate";
import {
  getAllCategoryBlog,
  getAllTags,
  getAllBlogIT,
  getBlogsByCategory,
  getBlogsByTag,
} from "../../services/blogService";
import { showErrorToast } from "../../utils/toastNotifications";
import { Link } from "react-router-dom";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import LoadingPage from "../../pages/loading-page/LoadingPage";
import "./blog.css";
import TitleBlog from "./TitleBlog";
import HeroJob from "../layout-client/HeroJob";

const ListBlogIT = () => {
  const [blogs, setBlogs] = useState([]);
  const [recentBlogs, setRecentBlogs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [totalBlogs, setTotalBlogs] = useState(0);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedTag, setSelectedTag] = useState(null);
  const blogsPerPage = 5; // Tăng lên 10 để hiển thị tất cả bài viết

  // Hàm fetchBlogs cập nhật để hỗ trợ lọc theo danh mục
  const fetchBlogs = useCallback(
    async (page = 1, searchQuery = "", categoryId = null) => {
      setLoading(true);
      try {
        const params = {
          page,
          limit: blogsPerPage,
          search: searchQuery,
        };

        let response;
        if (categoryId) {
          // Nếu có categoryId thì gọi API lấy bài viết theo danh mục
          response = await getBlogsByCategory(categoryId, params);
        } else {
          // Ngược lại gọi API lấy tất cả bài viết
          response = await getAllBlogIT(params);
        }

        console.log(`Blogs response for page ${page}:`, response.data);
        const fetchedBlogs = Array.isArray(
          response.data.data.posts || response.data.data.blogs
        )
          ? response.data.data.posts || response.data.data.blogs
          : [];

        setBlogs(fetchedBlogs);
        setTotalBlogs(Number(response.data.data.total) || 0);

        if (fetchedBlogs.length === 0 && page > 1) {
          showErrorToast("Không còn bài viết nào ở trang này.");
        }
      } catch (error) {
        console.error("Error fetching blogs:", error);
        showErrorToast("Lỗi khi tải bài blog: " + error.message);
        setBlogs([]);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  // Hàm xử lý khi click vào danh mục
  const handleCategoryClick = (categoryId) => {
    setSelectedCategory(categoryId);
    setCurrentPage(0);
    fetchBlogs(1, search, categoryId);
  };
  // Lấy danh sách bài blog gần đây
  const fetchRecentBlogs = useCallback(async () => {
    try {
      const response = await getAllBlogIT({ page: 1, limit: 5 });
      console.log("Recent blogs response:", response.data);
      setRecentBlogs(
        Array.isArray(response.data.data.blogs) ? response.data.data.blogs : []
      );
    } catch (error) {
      console.error("Error fetching recent blogs:", error);
      showErrorToast("Lỗi khi tải bài blog gần đây: " + error.message);
      setRecentBlogs([]);
    }
  }, []);

  // Lấy danh sách danh mục
  const fetchCategories = useCallback(async () => {
    try {
      const response = await getAllCategoryBlog();
      console.log("Categories response:", response.data);
      setCategories(
        Array.isArray(response.data.data.categories)
          ? response.data.data.categories
          : []
      );
    } catch (error) {
      console.error("Error fetching categories:", error);
      showErrorToast("Lỗi khi tải danh mục: " + error.message);
      setCategories([]);
    }
  }, []);

  const fetchBlogsByTag = async (tagId, page = 1, searchQuery = "") => {
    setLoading(true);
    try {
      const params = {
        page,
        limit: blogsPerPage,
        search: searchQuery,
      };
      const response = await getBlogsByTag(tagId, params);
      const fetchedBlogs = Array.isArray(response.data.data.posts)
        ? response.data.data.posts
        : [];
      setBlogs(fetchedBlogs);
      setTotalBlogs(Number(response.data.data.total) || 0);
    } catch (error) {
      console.error("Error fetching blogs by tag:", error);
      showErrorToast("Lỗi khi tải bài viết theo tag: " + error.message);
      setBlogs([]);
    } finally {
      setLoading(false);
    }
  };

  const handleTagClick = (tagId) => {
    setSelectedTag(tagId);
    setSelectedCategory(null); // Hủy chọn danh mục nếu có
    setCurrentPage(0);
    fetchBlogsByTag(tagId);
  };

  // Lấy danh sách thẻ
  const fetchTags = useCallback(async () => {
    try {
      const response = await getAllTags();
      console.log("Tags response:", response.data);
      setTags(
        Array.isArray(response.data.data.tags) ? response.data.data.tags : []
      );
    } catch (error) {
      console.error("Error fetching tags:", error);
      showErrorToast("Lỗi khi tải thẻ: " + error.message);
      setTags([]);
    }
  }, []);

  // Cập nhật useEffect để truyền selectedCategory vào fetchBlogs
  useEffect(() => {
    fetchBlogs(currentPage + 1, search, selectedCategory);
    fetchCategories();
    fetchTags();
    fetchRecentBlogs();
  }, [
    currentPage,
    search,
    selectedCategory, // Thêm dependency này
    fetchBlogs,
    fetchCategories,
    fetchTags,
    fetchRecentBlogs,
  ]);

  // Xử lý tìm kiếm
  const handleSearch = (value) => {
    setSearch(value);
    setCurrentPage(0);
  };

  // Xử lý thay đổi trang
  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
    window.scrollTo(0, 0);
  };

  // Format ngày
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <>
      {/* <TitleBlog
        parentTitle="Hệ thống"
        currentTitle="Blog IT"
        // mainTitle="Danh sách bài viết IT"
      /> */}

      <HeroJob />

      {loading && <LoadingPage />}

      <div className="container">
        <div className="row">
          <div className="col-lg-8 order-lg-1 order-2">
            {/* Blog Posts Section */}
            <section id="blog-posts" className="section-blog-it">
              <div
                className="container"
                data-aos="fade-up"
                data-aos-delay={100}
              >
                <div className="row gy-4">
                  {blogs.length > 0 ? (
                    blogs.map((blog) => (
                      <div
                        style={{ marginBottom: "1.6rem" }}
                        className="col-lg-6"
                        key={blog.id}
                      >
                        <article className="blog-article">
                          <div className="post-img">
                            <img
                              style={{
                                width: "404px",
                                height: "269px",
                                objectFit: "cover",
                              }}
                              src={
                                blog.thumbnail || "assets/img/blog/default.webp"
                              }
                              alt={blog.title}
                              className="img-fluid"
                              onError={(e) =>
                                (e.target.src = "assets/img/blog/default.webp")
                              }
                            />
                          </div>
                          <h2 className="title" style={{ margin: "10px 0" }}>
                            <Link to={`/blog/${blog.id}`}>{blog.title}</Link>
                          </h2>
                          <div className="meta-top">
                            <ul className="user-time-list">
                              <li className="">
                                <i className="bi bi-person" />{" "}
                                <Link to={`/blog/${blog.id}`}>Admin</Link>
                              </li>
                              <li className="">
                                <i className="bi bi-clock" />{" "}
                                <Link to={`/blog/${blog.id}`}>
                                  <time dateTime={blog.createdAt}>
                                    {formatDate(blog.createdAt)}
                                  </time>
                                </Link>
                              </li>
                            </ul>
                          </div>
                          <div style={{ height: "160px" }} className="content">
                            <p
                              dangerouslySetInnerHTML={{
                                __html: DOMPurify.sanitize(
                                  truncate(blog.contentHTML || "", 150, {
                                    ellipsis: "...",
                                  })
                                ),
                              }}
                            />
                          </div>
                          <div className="read-more">
                            <Link to={`/blog/${blog.id}`}>Đọc tiếp</Link>
                          </div>
                        </article>
                      </div>
                    ))
                  ) : (
                    <p>Không có bài blog nào.</p>
                  )}
                </div>

                {/* Phân trang */}
                {totalBlogs > 0 && (
                  <ReactPaginate
                    previousLabel={<FaChevronLeft />}
                    nextLabel={<FaChevronRight />}
                    breakLabel={"..."}
                    pageCount={Math.ceil(totalBlogs / blogsPerPage)}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={handlePageChange}
                    containerClassName={"pagination"}
                    activeClassName={"active"}
                    pageClassName={"page-item"}
                    pageLinkClassName={"page-link"}
                    previousClassName={"page-item"}
                    nextClassName={"page-item"}
                    previousLinkClassName={"page-link"}
                    nextLinkClassName={"page-link"}
                    breakClassName={"page-item"}
                    breakLinkClassName={"page-link"}
                    forcePage={currentPage}
                  />
                )}
              </div>
            </section>
          </div>

          <div className="col-lg-4 sidebar order-lg-2 order-1">
            <div
              className="widgets-container"
              data-aos="fade-up"
              data-aos-delay={200}
            >
              {/* Search Widget */}
              <div className="search-widget widget-item">
                <h3 className="widget-title">Tìm kiếm</h3>
                <Input.Search
                  placeholder="Tìm kiếm bài blog..."
                  onSearch={handleSearch}
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  allowClear
                />
              </div>
              {/* Recent Posts Widget */}
              <div className="recent-posts-widget widget-item">
                <h3 className="widget-title">Bài viết mới nhất</h3>
                {recentBlogs.length > 0 ? (
                  recentBlogs.map((blog) => (
                    <div className="post-item" key={blog.id}>
                      <img
                        src={blog.thumbnail || "assets/img/blog/default.webp"}
                        alt={blog.title}
                        className="flex-shrink-0"
                        onError={(e) =>
                          (e.target.src = "assets/img/blog/default.webp")
                        }
                      />
                      <div>
                        <h4>
                          <Link to={`/blog/${blog.id}`}>{blog.title}</Link>
                        </h4>
                        <time dateTime={blog.createdAt}>
                          {formatDate(blog.createdAt)}
                        </time>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>Không có bài viết gần đây.</p>
                )}
              </div>
              {/* Categories Widget */}
              <div className="categories-widget widget-item">
                <h3 className="widget-title">Danh mục</h3>
                <ul className="mt-3">
                  {categories.length > 0 ? (
                    categories.map((category) => (
                      <li
                        key={category.id}
                        className={
                          selectedCategory === category.id
                            ? "active-category"
                            : ""
                        }
                      >
                        <Link
                          to="#"
                          onClick={() => handleCategoryClick(category.id)}
                          style={{
                            fontWeight:
                              selectedCategory === category.id
                                ? "bold"
                                : "normal",
                            color:
                              selectedCategory === category.id
                                ? "#1890ff"
                                : "inherit",
                          }}
                        >
                          {category.name}{" "}
                          <span>({category.postCount || 0})</span>
                        </Link>
                      </li>
                    ))
                  ) : (
                    <li>Không có danh mục nào.</li>
                  )}
                  {/* Thêm nút "Tất cả danh mục" */}
                  <li>
                    <Link
                      to="#"
                      onClick={() => {
                        setSelectedCategory(null);
                        setCurrentPage(0);
                        fetchBlogs(1, search, null);
                      }}
                      style={{
                        fontWeight: !selectedCategory ? "bold" : "normal",
                        color: !selectedCategory ? "#1890ff" : "inherit",
                      }}
                    >
                      Tất cả danh mục
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="tags-widget widget-item">
                <h3 className="widget-title">Chủ đề nổi bật</h3>
                <ul>
                  {tags.length > 0 ? (
                    tags.map((tag) => (
                      <li
                        key={tag.id}
                        className={selectedTag === tag.id ? "active-tag" : ""}
                      >
                        <Link
                          to="#"
                          onClick={() => handleTagClick(tag.id)}
                          style={{
                            fontWeight:
                              selectedTag === tag.id ? "bold" : "normal",
                            color:
                              selectedTag === tag.id ? "#1890ff" : "inherit",
                          }}
                        >
                          {tag.name}
                        </Link>
                      </li>
                    ))
                  ) : (
                    <li>Chưa có chủ đề nào</li>
                  )}
                  {/* Nút xóa lọc */}
                  {selectedTag && (
                    <li>
                      <Link
                        to="#"
                        onClick={() => {
                          setSelectedTag(null);
                          setCurrentPage(0);
                          fetchBlogs(1, search);
                        }}
                        style={{ color: "#1890ff" }}
                      >
                        Xóa lọc
                      </Link>
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ListBlogIT;
