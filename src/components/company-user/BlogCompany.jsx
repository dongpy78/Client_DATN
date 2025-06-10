import React, { useEffect, useState, useMemo } from "react";
import truncate from "html-truncate";
import { Input } from "antd";
import ReactPaginate from "react-paginate";
import { getListCompany } from "../../services/userService";
import CommonUtils from "../../utils/CommonUtils";
import { showErrorToast } from "../../utils/toastNotifications";
import { Link } from "react-router-dom";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "./pagination.css";
import LoadingPage from "../../pages/loading-page/LoadingPage";

const BlogCompany = () => {
  const [dataCompany, setDataCompany] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const itemsPerPage = 4;

  // Lưu trữ tất cả công ty CS1 để tránh gọi API lặp lại
  const [allApprovedCompanies, setAllApprovedCompanies] = useState([]);

  const fetchData = async (searchQuery = "") => {
    setLoading(true);
    try {
      let companies = [];
      let offset = 0;
      const limit = 20; // Tăng limit để giảm số lần gọi API
      let hasMore = true;

      // Lặp gọi API để lấy tất cả công ty
      while (hasMore) {
        console.log("Gửi yêu cầu API:", {
          limit,
          offset,
          search: CommonUtils.removeSpace(searchQuery),
        });
        const arrData = await getListCompany({
          limit,
          offset,
          search: CommonUtils.removeSpace(searchQuery),
        });
        console.log("Phản hồi API:", arrData);

        if (arrData && arrData.data && arrData.data.rows) {
          const approvedCompanies = arrData.data.rows.filter(
            (company) => company.censorCode === "CS1"
          );
          companies = [...companies, ...approvedCompanies];
          offset += limit;
          hasMore =
            arrData.data.rows.length === limit && offset < arrData.data.count;
        } else {
          hasMore = false;
        }
      }

      setAllApprovedCompanies(companies);
      setTotalCount(companies.length);
      console.log("Tổng công ty CS1:", companies.length);

      if (companies.length === 0) {
        showErrorToast("Không tìm thấy công ty phù hợp");
      }
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu:", error);
      setAllApprovedCompanies([]);
      setTotalCount(0);
      // showErrorToast("Không thể tải dữ liệu công ty");
    } finally {
      setLoading(false);
    }
  };

  // Phân trang thủ công từ allApprovedCompanies
  useEffect(() => {
    const startIndex = currentPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    setDataCompany(allApprovedCompanies.slice(startIndex, endIndex));
  }, [currentPage, allApprovedCompanies]);

  // Gọi API khi search thay đổi
  useEffect(() => {
    fetchData(search);
    setCurrentPage(0);
  }, [search]);

  const handleSearch = (value) => {
    console.log("Tìm kiếm với giá trị:", value);
    setSearch(value);
  };

  const handleChangePage = ({ selected }) => {
    setCurrentPage(selected);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-8 order-lg-1 order-2">
          <section className="section-blog-it" style={{ position: "relative" }}>
            <div className="container">
              <div className="row">
                {loading ? (
                  <LoadingPage />
                ) : dataCompany.length > 0 ? (
                  dataCompany.map((item, index) => {
                    const shortDescription = truncate(
                      item.descriptionHTML || "",
                      100
                    );
                    return (
                      <div className="col-lg-6 col-md-6 mb-5" key={index}>
                        <Link
                          className="no-hover-effect"
                          to={`/detail-company/${item.id}`}
                        >
                          <article className="blog-article">
                            <div className="post-img">
                              <img
                                className="img-fluid"
                                src={item.thumbnail || "placeholder.jpg"}
                                alt="blog"
                                style={{ width: "100%", height: "200px" }}
                              />
                            </div>
                            <h2 className="title">
                              <a href="#">{item.name || "Tên công ty"}</a>
                            </h2>
                            <div
                              className="content contet-post"
                              dangerouslySetInnerHTML={{
                                __html: shortDescription,
                              }}
                            />
                            <div className="read-more">
                              <a
                                className="read-more-post"
                                style={{ background: "#47b2e4" }}
                                href="#"
                              >
                                Đọc tiếp
                              </a>
                            </div>
                          </article>
                        </Link>
                      </div>
                    );
                  })
                ) : (
                  <div className="text-center py-5">
                    <h4>Không tìm thấy công ty phù hợp</h4>
                  </div>
                )}
              </div>

              {!loading && totalCount > 0 && (
                <nav className="blog-pagination justify-content-center d-flex">
                  <ReactPaginate
                    forcePage={currentPage}
                    previousLabel={<FaChevronLeft />}
                    nextLabel={<FaChevronRight />}
                    breakLabel={"..."}
                    pageCount={Math.ceil(totalCount / itemsPerPage)}
                    marginPagesDisplayed={3}
                    containerClassName={
                      "pagination justify-content-center pb-3"
                    }
                    pageClassName={"page-item"}
                    pageLinkClassName={"page-link"}
                    previousLinkClassName={"page-link"}
                    previousClassName={"page-item"}
                    nextClassName={"page-item"}
                    nextLinkClassName={"page-link"}
                    breakLinkClassName={"page-link"}
                    breakClassName={"page-item"}
                    activeClassName={"active"}
                    onPageChange={handleChangePage}
                  />
                </nav>
              )}
            </div>
          </section>
        </div>
        <div className="col-lg-4 order-lg-2 order-md-1">
          <div
            className="widgets-container"
            data-aos="fade-up"
            data-aos-delay={200}
          >
            <div className="search-widget widget-item">
              <h3 className="widget-title">Tìm kiếm</h3>
              <Input.Search
                placeholder="Tìm kiếm công ty..."
                onSearch={handleSearch}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                allowClear
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogCompany;
