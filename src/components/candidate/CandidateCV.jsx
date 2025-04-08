import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { getAllListCvByUserIdService } from "../../services/cvService";
import { PAGINATION } from "../../constants/paginationConstant";
import { getFromLocalStorage } from "../../utils/localStorage";
import { Link } from "react-router-dom";
import moment from "moment";

const CandidateCV = (props) => {
  const [dataCv, setdataCv] = useState([]);
  const [count, setCount] = useState(0);
  const [numberPage, setnumberPage] = useState(0);
  const [user, setUser] = useState({});

  useEffect(() => {
    const userData = getFromLocalStorage("user");
    setUser(userData);
    if (userData && userData.id) {
      const fetchData = async () => {
        try {
          let arrData = await getAllListCvByUserIdService({
            limit: PAGINATION.pagerow,
            offset: 0,
            userId: userData.id,
          });
          console.log("API response:", arrData);
          if (arrData && arrData.result) {
            setdataCv(arrData.result.data);
            setCount(Math.ceil(arrData.result.count / PAGINATION.pagerow));
          }
        } catch (error) {
          console.log("Error fetching data:", error);
        }
      };
      fetchData();
    }
  }, []);

  const handleChangePage = async (number) => {
    setnumberPage(number.selected);
    const userData = getFromLocalStorage("user");
    if (userData && userData.id) {
      let arrData = await getAllListCvByUserIdService({
        limit: PAGINATION.pagerow,
        offset: number.selected * PAGINATION.pagerow,
        userId: userData.id,
      });
      if (arrData && arrData.result) {
        setdataCv(arrData.result.data);
      }
    }
  };

  return (
    <section className="candidate-info-area" style={{ minHeight: "100vh" }}>
      <div className="container">
        <div className="col-12 grid-margin">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Danh sách Công Việc Đã Nộp</h4>
              <div className="table-responsive pt-2">
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th>STT</th>
                      <th>Tên công việc</th>
                      <th>Ngành</th>
                      <th>Chức vụ</th>
                      <th>Địa chỉ</th>
                      <th>Thời gian nộp</th>
                      <th>Trạng thái</th>
                      <th>Thao tác</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dataCv && dataCv.length > 0 ? (
                      dataCv.map((item, index) => (
                        <tr key={index}>
                          <td>{index + 1 + numberPage * PAGINATION.pagerow}</td>
                          <td>{item.postCvData.postDetailData.name}</td>
                          <td>
                            {
                              item.postCvData.postDetailData.jobTypePostData
                                .value
                            }
                          </td>
                          <td>
                            {
                              item.postCvData.postDetailData.jobLevelPostData
                                .value
                            }
                          </td>
                          <td>
                            {
                              item.postCvData.postDetailData.provincePostData
                                .value
                            }
                          </td>
                          <td>
                            {moment(item.createdAt).format(
                              "DD-MM-YYYY HH:mm:ss"
                            )}
                          </td>
                          <td>
                            {item.isChecked === 0 ? "Chưa xem" : "Đã xem"}
                          </td>
                          <td>
                            <Link
                              style={{ color: "#000" }}
                              to={`/detail-job/${item.postCvData.id}/`}
                            >
                              Xem công việc
                            </Link>

                            <Link
                              style={{ color: "#000", marginLeft: "1rem" }}
                              to={`/candidate/cv-detail/${item.id}`}
                            >
                              Xem CV đã nộp
                            </Link>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="8">Không có dữ liệu</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
            <ReactPaginate
              previousLabel={"Quay lại"}
              nextLabel={"Tiếp"}
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
          </div>
        </div>
      </div>
    </section>
  );
};

export default CandidateCV;
