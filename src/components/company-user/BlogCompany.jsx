import React, { useEffect, useState } from "react";
import { Input } from "antd";
import ReactPaginate from "react-paginate";
import { getListCompany } from "../../services/userService";
import CommonUtils from "../../utils/CommonUtils";
import { showErrorToast } from "../../utils/toastNotifications";
import { Link } from "react-router-dom";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "./pagination.css";

const BlogCompany = () => {
  const [dataCompany, setDataCompany] = useState([]);
  const [count, setCount] = useState("");
  const [countData, setCountData] = useState(0);
  const [numberPage, setnumberPage] = useState("");

  const [currentPage, setCurrentPage] = useState(0);
  const [search, setSearch] = useState("");

  const handleSearch = (value) => {
    setSearch(value);
    setCurrentPage(0); // Reset to the first page when searching
  };

  let fetchData = async () => {
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
  };

  useEffect(() => {
    try {
      fetchData();
      setnumberPage(0);
    } catch (error) {
      console.log(error);
    }
  }, [search]);

  let handleChangePage = async (number) => {
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
  };

  return (
    <section className="candidate-info-area section-padding">
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
      </div>
    </section>
  );
};

export default BlogCompany;
