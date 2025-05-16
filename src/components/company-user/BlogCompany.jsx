import React, { useEffect, useState } from "react";
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
  const [count, setCount] = useState("");
  const [countData, setCountData] = useState(0);
  const [numberPage, setnumberPage] = useState("");
  const [loading, setLoading] = useState(false); // Thêm state loading
  const [currentPage, setCurrentPage] = useState(0);
  const [search, setSearch] = useState("");

  const handleSearch = (value) => {
    setSearch(value);
    setCurrentPage(0);
  };

  let fetchData = async () => {
    setLoading(true); // Bật trạng thái loading
    try {
      let arrData = await getListCompany({
        limit: 6,
        offset: 0,
        search: CommonUtils.removeSpace(search),
      });
      if (arrData) {
        setDataCompany(arrData.data.rows);
        setCount(Math.ceil(arrData.data.count / 6));
        setCountData(arrData.data.count);
      }
    } catch (error) {
      console.log(error);
      showErrorToast("Không thể tải danh sách công ty");
    } finally {
      setLoading(false); // Tắt trạng thái loading
    }
  };

  useEffect(() => {
    fetchData();
    setnumberPage(0);
  }, [search]);

  let handleChangePage = async (number) => {
    setLoading(true); // Bật loading khi chuyển trang
    try {
      setnumberPage(number.selected);
      let arrData = await getListCompany({
        limit: 6,
        offset: number.selected * 6,
        search: CommonUtils.removeSpace(search),
      });
      if (arrData && arrData.errCode === 0) {
        setDataCompany(arrData.data);
        setCountData(arrData.count);
      }
    } catch (error) {
      console.log(error);
      showErrorToast("Không thể tải dữ liệu trang mới");
    } finally {
      setLoading(false); // Tắt loading sau khi tải xong
    }
  };

  return (
    <div style={{ padding: "40px" }} className="wrapper-blog-company">
      <div
        style={{
          padding: "1rem 0",
          background: "rgb(245, 245, 245)",
        }}
        className=" text-left"
      >
        <div className="container">
          <span
            className="blog-title-company"
            style={{
              color: "#37517e",
              fontSize: "28px",
            }}
          >
            DANH SÁCH CÁC CÔNG TY
          </span>
        </div>
      </div>
      <div class="container">
        <div class="row">
          <div class="col-lg-12">
            <section
              className="blog-posts section"
              style={{ position: "relative" }}
            >
              <div style={{ marginTop: "2rem" }} className="container">
                <div className="search-company">
                  <Input.Search
                    onSearch={handleSearch}
                    className="mt-2"
                    placeholder="Nhập tên các công ty"
                    allowClear
                    enterButton="Tìm kiếm"
                  ></Input.Search>
                </div>

                <div className="row mt-5">
                  {loading ? (
                    <LoadingPage /> // Hiển thị component LoadingPage khi loading là true
                  ) : (
                    dataCompany.map((item, index) => {
                      const shortDescription = truncate(
                        item.descriptionHTML,
                        100
                      ); // ✨ thêm ở đây
                      return (
                        <div className="col-lg-4 col-md-6 mb-5" key={index}>
                          <Link
                            className="no-hover-effect"
                            to={`/detail-company/${item.id}`}
                          >
                            <article>
                              <div className="post-img">
                                <img
                                  className="img-fluid"
                                  src={item.coverimage}
                                  alt="blog"
                                  style={{ width: "100%", height: "200px" }}
                                />
                              </div>
                              <h2 className="title-post">
                                <a href="blog-details.html">{item.name}</a>
                              </h2>

                              <div
                                className="content contet-post"
                                dangerouslySetInnerHTML={{
                                  __html: shortDescription, // ✨ dùng đoạn HTML đã cắt ngắn
                                }}
                              />

                              <div className="read-more">
                                <a
                                  className="read-more-post"
                                  style={{ background: "#47b2e4" }}
                                  href="blog-details.html"
                                >
                                  Đọc tiếp
                                </a>
                              </div>
                            </article>
                          </Link>
                        </div>
                      );
                    })
                  )}
                </div>

                {!loading && dataCompany.length > 0 && (
                  <nav className="blog-pagination justify-content-center d-flex">
                    <ReactPaginate
                      forcePage={numberPage}
                      previousLabel={<FaChevronLeft />}
                      nextLabel={<FaChevronRight />}
                      breakLabel={"..."}
                      pageCount={count}
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

                {!loading && dataCompany.length === 0 && (
                  <div className="text-center py-5">
                    <h4>Không tìm thấy công ty phù hợp</h4>
                  </div>
                )}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogCompany;
