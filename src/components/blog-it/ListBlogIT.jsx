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
  const blogsPerPage = 5;

  const fetchBlogs = useCallback(
    async (page = 1, searchQuery = "", categoryId = null) => {
      setLoading(true);
      try {
        let allBlogs = [];
        let currentPage = 1;
        const limit = 10; // Tăng limit để giảm số lần gọi
        let hasMore = true;

        while (hasMore) {
          const params = { page: currentPage, limit, search: searchQuery };
          let response;
          if (categoryId) {
            response = await getBlogsByCategory(categoryId, params);
          } else {
            response = await getAllBlogIT(params);
          }

          console.log(`Blogs response for page ${currentPage}:`, response.data);
          const fetchedBlogs = Array.isArray(
            response.data.data.posts || response.data.data.blogs
          )
            ? response.data.data.posts || response.data.data.blogs
            : [];
          const publishedBlogs = fetchedBlogs.filter(
            (blog) => blog.statusCode === "PUBLISHED"
          );
          allBlogs = [...allBlogs, ...publishedBlogs];
          currentPage += 1;
          hasMore =
            fetchedBlogs.length === limit &&
            allBlogs.length < response.data.data.total;
        }

        // Phân trang thủ công
        const startIndex = (page - 1) * blogsPerPage;
        const endIndex = startIndex + blogsPerPage;
        setBlogs(allBlogs.slice(startIndex, endIndex));
        setTotalBlogs(allBlogs.length);

        if (allBlogs.length === 0 && page > 1) {
          showErrorToast("Không còn bài viết nào ở trang này.");
        }
      } catch (error) {
        console.error("Error fetching blogs:", error);
        showErrorToast("Lỗi khi tải bài blog: " + error.message);
        setBlogs([]);
        setTotalBlogs(0);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const fetchBlogsByTag = useCallback(
    async (tagId, page = 1, searchQuery = "") => {
      setLoading(true);
      try {
        let allBlogs = [];
        let currentPage = 1;
        const limit = 10;
        let hasMore = true;

        while (hasMore) {
          const params = { page: currentPage, limit, search: searchQuery };
          const response = await getBlogsByTag(tagId, params);
          const fetchedBlogs = Array.isArray(response.data.data.posts)
            ? response.data.data.posts
            : [];
          const publishedBlogs = fetchedBlogs.filter(
            (blog) => blog.statusCode === "PUBLISHED"
          );
          allBlogs = [...allBlogs, ...publishedBlogs];
          currentPage += 1;
          hasMore =
            fetchedBlogs.length === limit &&
            allBlogs.length < response.data.data.total;
        }

        const startIndex = (page - 1) * blogsPerPage;
        const endIndex = startIndex + blogsPerPage;
        setBlogs(allBlogs.slice(startIndex, endIndex));
        setTotalBlogs(allBlogs.length);
      } catch (error) {
        console.error("Error fetching blogs by tag:", error);
        showErrorToast("Lỗi khi tải bài viết theo tag: " + error.message);
        setBlogs([]);
        setTotalBlogs(0);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const fetchRecentBlogs = useCallback(async () => {
    try {
      const response = await getAllBlogIT({ page: 1, limit: 5 });
      const publishedBlogs = Array.isArray(response.data.data.blogs)
        ? response.data.data.blogs.filter(
            (blog) => blog.statusCode === "PUBLISHED"
          )
        : [];
      console.log("Recent blogs response:", response.data);
      setRecentBlogs(publishedBlogs);
    } catch (error) {
      console.error("Error fetching recent blogs:", error);
      showErrorToast("Lỗi khi tải bài blog gần đây: " + error.message);
      setRecentBlogs([]);
    }
  }, []);

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

  const handleCategoryClick = (categoryId) => {
    setSelectedCategory(categoryId);
    setSelectedTag(null);
    setCurrentPage(0);
    fetchBlogs(1, search, categoryId);
  };

  const handleTagClick = (tagId) => {
    setSelectedTag(tagId);
    setSelectedCategory(null);
    setCurrentPage(0);
    fetchBlogsByTag(tagId, 1, search);
  };

  useEffect(() => {
    if (selectedTag) {
      fetchBlogsByTag(selectedTag, currentPage + 1, search);
    } else {
      fetchBlogs(currentPage + 1, search, selectedCategory);
    }
    fetchCategories();
    fetchTags();
    fetchRecentBlogs();
  }, [
    currentPage,
    search,
    selectedCategory,
    selectedTag,
    fetchBlogs,
    fetchBlogsByTag,
    fetchCategories,
    fetchTags,
    fetchRecentBlogs,
  ]);

  const handleSearch = (value) => {
    setSearch(value);
    setCurrentPage(0);
  };

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
    window.scrollTo(0, 0);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <>
      <HeroJob />
      {loading && <LoadingPage />}
      <div className="container">
        <div className="row">
          <div className="col-lg-8 order-lg-1 order-2">
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
                              <li>
                                <i className="bi bi-person" />{" "}
                                <Link to={`/blog/${blog.id}`}>Admin</Link>
                              </li>
                              <li>
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
