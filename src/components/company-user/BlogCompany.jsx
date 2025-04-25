import React, { useEffect, useState } from "react";
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
    <section
      className="candidate-info-area section-padding"
      style={{ position: "relative" }}
    >
      {loading && (
        <div>
          <LoadingPage />
        </div>
      )}

      <div className="container">
        <div className="row">
          {dataCompany.map((item, index) => (
            <div className="col-lg-6 mb-5" key={index}>
              <Link
                className="no-hover-effect"
                to={`/detail-company/${item.id}`}
              >
                <article className="blog_item">
                  <div className="blog_item_img">
                    <img
                      className="card-img rounded-0"
                      src={item.coverimage}
                      alt="blog"
                      style={{ position: "relative", height: "280px" }}
                    />
                    <a href="#">
                      <img
                        className="card-img rounded-0"
                        src={item.thumbnail}
                        alt="blog"
                        style={{
                          width: "100px",
                          height: "100px",
                          position: "absolute",
                          bottom: "0",
                          left: "0",
                          transform: "translate(40%, 50%)",
                        }}
                      />
                    </a>
                  </div>
                  <div className="blog_details" style={{ height: "249px" }}>
                    <a className="d-inline-block" href="#">
                      <h2>{item.name}</h2>
                    </a>
                    <div
                      className="description-company"
                      dangerouslySetInnerHTML={{ __html: item.descriptionHTML }}
                    />
                  </div>
                </article>
              </Link>
            </div>
          ))}
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
              containerClassName={"pagination justify-content-center pb-3"}
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
  );
};

export default BlogCompany;
