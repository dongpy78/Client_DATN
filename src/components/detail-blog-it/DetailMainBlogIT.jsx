import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import DOMPurify from "dompurify";
import TitleDetail from "./TitleDetail";
import {
  getBlogITById,
  getAllBlogIT,
  getAllCategoryBlog,
  getAllTags,
} from "../../services/blogService";
import { showErrorToast } from "../../utils/toastNotifications";
import LoadingPage from "../../pages/loading-page/LoadingPage";
import HeroJob from "../layout-client/HeroJob";

const DetailMainBlogIT = () => {
  const { id } = useParams(); // Lấy ID từ URL
  const [blog, setBlog] = useState(null); // Lưu dữ liệu bài blog
  const [recentBlogs, setRecentBlogs] = useState([]); // Lưu danh sách bài blog gần đây
  const [categories, setCategories] = useState([]); // Lưu danh sách danh mục
  const [tags, setTags] = useState([]); // Lưu danh sách thẻ
  const [loading, setLoading] = useState(true); // Quản lý trạng thái tải
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Gọi API để lấy chi tiết bài blog
  useEffect(() => {
    const fetchBlogDetails = async () => {
      setLoading(true);
      try {
        const response = await getBlogITById(id);
        setBlog(response.data.data);
      } catch (error) {
        console.error("Lỗi khi lấy chi tiết bài blog:", error);
        showErrorToast("Lỗi khi tải chi tiết bài blog: " + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogDetails();
  }, [id]);

  // Gọi API để lấy danh sách bài blog gần đây
  useEffect(() => {
    const fetchRecentBlogs = async () => {
      try {
        const response = await getAllBlogIT({ page: 1, limit: 5 });
        setRecentBlogs(response.data.data.blogs || []);
      } catch (error) {
        console.error("Lỗi khi lấy bài blog gần đây:", error);
        showErrorToast("Lỗi khi tải bài blog gần đây: " + error.message);
      }
    };

    fetchRecentBlogs();
  }, []);

  // Gọi API để lấy tất cả danh mục
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getAllCategoryBlog();
        setCategories(response.data.data.categories || []);
      } catch (error) {
        console.error("Lỗi khi lấy danh mục:", error);
        showErrorToast("Lỗi khi tải danh mục: " + error.message);
      }
    };

    fetchCategories();
  }, []);

  // Gọi API để lấy tất cả thẻ
  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await getAllTags();
        setTags(response.data.data.tags || []);
      } catch (error) {
        console.error("Lỗi khi lấy thẻ:", error);
        showErrorToast("Lỗi khi tải thẻ: " + error.message);
      }
    };

    fetchTags();
  }, []);

  // Định dạng ngày
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Hiển thị LoadingPage khi đang tải
  if (loading) return <LoadingPage />;
  // Hiển thị thông báo nếu không tìm thấy bài blog
  if (!blog) return <div>Không tìm thấy bài blog.</div>;

  return (
    <>
      {/* <TitleDetail /> */}
      <HeroJob />

      <div className="container">
        <div className="row">
          <div className="col-lg-8">
            {/* Blog Details Section */}
            <section id="blog-details" className="blog-details section">
              <div className="container" data-aos="fade-up">
                <article className="article" style={{ marginTop: "3rem" }}>
                  <div className="hero-img" data-aos="zoom-in">
                    <img
                      src={blog.thumbnail || "assets/img/blog/default.webp"}
                      alt={blog.title}
                      className="img-fluid"
                      loading="lazy"
                      onError={(e) =>
                        (e.target.src = "assets/img/blog/default.webp")
                      }
                    />
                    <div className="meta-overlay">
                      <div className="meta-categories">
                        <Link
                          to={`/category/${blog.categoryId}`}
                          className="category"
                        >
                          {blog.category?.name || "Chưa phân loại"}
                        </Link>
                        <span className="divider">•</span>
                        <span className="reading-time">
                          <i className="bi bi-clock" />{" "}
                          {Math.ceil(blog.contentHTML.length / 200)} phút đọc
                        </span>
                      </div>
                    </div>
                  </div>
                  <div
                    className="article-content"
                    data-aos="fade-up"
                    data-aos-delay={100}
                  >
                    <div className="content-header">
                      <h1 className="title">{blog.title}</h1>
                      <div className="author-info">
                        <div className="author-details">
                          {/* <img
                            src="assets/img/person/person-f-8.webp"
                            alt="Tác giả"
                            className="author-img"
                          /> */}
                          <div className="info">
                            <h4>Blog IT</h4>
                            {/* <span className="role">Người đóng góp</span> */}
                          </div>
                        </div>
                        <div className="post-meta">
                          <span className="date">
                            <i className="bi bi-calendar3" />{" "}
                            {formatDate(blog.createdAt)}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="content">
                      <div
                        dangerouslySetInnerHTML={{
                          __html: DOMPurify.sanitize(blog.contentHTML),
                        }}
                      />
                    </div>
                    <div className="meta-bottom">
                      <div className="tags-section">
                        <h4>Danh mục bài viết</h4>
                        <div className="tags">
                          <Link className="tag">{blog.category.name}</Link>
                        </div>
                      </div>
                      <div className="tags-section">
                        <h4>Chủ đề liên quan</h4>
                        <div className="tags">
                          {blog.tags?.map((tag) => (
                            <Link
                              key={tag.id}
                              to={`/tag/${tag.id}`}
                              className="tag"
                            >
                              {tag.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                      <div className="share-section">
                        <h4>Chia sẻ bài viết</h4>
                        <div className="social-links">
                          <a href="#" className="twitter">
                            <i className="bi bi-twitter-x" />
                          </a>
                          <a href="#" className="facebook">
                            <i className="bi bi-facebook" />
                          </a>
                          <a href="#" className="linkedin">
                            <i className="bi bi-linkedin" />
                          </a>
                          <a
                            href="#"
                            className="copy-link"
                            title="Sao chép liên kết"
                          >
                            <i className="bi bi-link-45deg" />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              </div>
            </section>
          </div>
          <div className="col-lg-4 sidebar">
            <div
              className="widgets-container"
              data-aos="fade-up"
              data-aos-delay={200}
            >
              {/* Recent Posts Widget */}
              <div className="recent-posts-widget widget-item">
                <h3 className="widget-title">Bài viết gần đây</h3>
                {recentBlogs.length > 0 ? (
                  recentBlogs.map((recentBlog) => (
                    <div className="post-item" key={recentBlog.id}>
                      <img
                        style={{ objectFit: "cover" }}
                        src={
                          recentBlog.thumbnail || "assets/img/blog/default.webp"
                        }
                        alt={recentBlog.title}
                        className="flex-shrink-0"
                        onError={(e) =>
                          (e.target.src = "assets/img/blog/default.webp")
                        }
                      />
                      <div>
                        <h4>
                          <Link to={`/blog/${recentBlog.id}`}>
                            {recentBlog.title}
                          </Link>
                        </h4>
                        <time dateTime={recentBlog.createdAt}>
                          {formatDate(recentBlog.createdAt)}
                        </time>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>Không có bài viết gần đây.</p>
                )}
              </div>
              {/* Categories Widget */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailMainBlogIT;
