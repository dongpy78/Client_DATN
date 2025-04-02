import React from "react";
import { useEffect, useState } from "react";
import PostTableWrapper from "../../assets/wrappers/PostTableWrapper";
import { PAGINATION } from "../../constants/paginationConstant";
import { FaEye } from "react-icons/fa";
import { getAllListCvByPostService } from "../../services/cvService";
import { getDetailPostByIdService } from "../../services/userService";
import { Link, useNavigate, useParams } from "react-router-dom";
import PagePagination from "../admin/PagePagination";

const ListCV = () => {
  const [dataCv, setdataCv] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(0); // Using 0-based index for pagination
  const { id } = useParams();
  const [post, setPost] = useState("");
  const navigate = useNavigate();

  let fetchPost = async (id) => {
    let res = await getDetailPostByIdService(id);
    if (res) {
      setPost(res.data);
    }
  };

  useEffect(() => {
    if (id) {
      try {
        let fetchData = async () => {
          let arrData = await getAllListCvByPostService({
            limit: PAGINATION.pagerow,
            offset: 0,
            postId: id,
          });
          if (arrData) {
            setdataCv(arrData.result.data);
            setTotalCount(arrData.result.count); // Use the count from the response
          }
        };
        fetchData();
        fetchPost(id);
      } catch (error) {
        console.log(error);
      }
    }
  }, [id]);

  const handlePageChange = async (pageNumber) => {
    setCurrentPage(pageNumber);
    let arrData = await getAllListCvByPostService({
      limit: PAGINATION.pagerow,
      offset: pageNumber * PAGINATION.pagerow,
      postId: id,
    });
    if (arrData) {
      setdataCv(arrData.result.data);
    }
  };

  const getMatchRateClass = (rate) => {
    const percentage = +rate.split("%")[0];

    if (percentage >= 70) return "match-rate match-rate-high";
    if (percentage > 30) return "match-rate match-rate-medium";
    return "match-rate match-rate-low";
  };

  const getStatusClass = (isChecked) => {
    return isChecked === 0
      ? "status-badge status-unseen"
      : "status-badge status-seen";
  };

  const getEvaluationClass = (rate) => {
    const percentage = +rate.split("%")[0];

    if (percentage >= 70) return "status-badge status-active";
    if (percentage > 30) return "status-badge status-medium";
    return "status-badge status-banned";
  };

  return (
    <PostTableWrapper>
      <h5 className="title-list-job">Danh sách CV</h5>
      <h5 className="title-amount">Tổng số lượng: {totalCount} </h5>
      <div className="jobtype-container">
        <table>
          <thead>
            <tr>
              <th>STT</th>
              <th>Tên người nộp</th>
              <th>Số điện thoại</th>
              <th>Tỉ lệ phù hợp</th>
              <th>Đánh giá</th>
              <th>Trạng thái</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {dataCv.map((item, index) => (
              <tr key={index}>
                <td>{index + 1 + currentPage * PAGINATION.pagerow}</td>
                <td>
                  {item.userCvData.firstName + " " + item.userCvData.lastName}
                </td>
                <td>{item.userCvData.phonenumber}</td>
                <td>
                  <span className={getMatchRateClass(item.file)}>
                    {item.file}
                  </span>
                </td>
                <td>
                  <span className={getEvaluationClass(item.file)}>
                    {+item.file.split("%")[0] >= 70
                      ? "Tốt"
                      : +item.file.split("%")[0] > 30
                      ? "Tạm chấp nhận"
                      : "Tệ"}
                  </span>
                </td>
                <td>
                  <span className={getStatusClass(item.isChecked)}>
                    {item.isChecked === 0 ? "Chưa xem" : "Đã xem"}
                  </span>
                </td>
                <td className="actions">
                  <Link
                    title="Xem CV"
                    to={`/admin/post/view-cv/${item.id}`}
                    className="edit-btn"
                  >
                    <FaEye />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {totalCount > PAGINATION.pagerow && (
        <PagePagination
          numOfPages={Math.ceil(totalCount / PAGINATION.pagerow)}
          currentPage={currentPage + 1} // Adding 1 because PagePagination expects 1-based index
          handlePageChange={(page) => handlePageChange(page - 1)} // Subtracting 1 to convert back to 0-based index
        />
      )}
      <style jsx>{`
        /* Style chung cho các badge */
        .match-rate,
        .status-badge {
          padding: 4px 12px;
          border-radius: 16px;
          font-size: 12px;
          font-weight: 500;
          display: inline-block;
          min-width: 100px;
          text-align: center;
          border: 1px solid transparent;
        }

        /* Style cho tỉ lệ phù hợp */
        .match-rate-high {
          background-color: #e8f5e9;
          color: #2e7d32;
          border-color: #2e7d32;
        }

        .match-rate-medium {
          background-color: #fff8e1;
          color: #ff8f00;
          border-color: #ff8f00;
        }

        .match-rate-low {
          background-color: #ffebee;
          color: #c62828;
          border-color: #c62828;
        }

        /* Style cho đánh giá */
        .status-active {
          background-color: #e8f5e9;
          color: #2e7d32;
          border-color: #2e7d32;
        }

        .status-medium {
          background-color: #fff8e1;
          color: #ff8f00;
          border-color: #ff8f00;
        }

        .status-banned {
          background-color: #ffebee;
          color: #c62828;
          border-color: #c62828;
        }

        /* Style cho trạng thái */
        .status-seen {
          background-color: #e3f2fd;
          color: #1565c0;
          border-color: #1565c0;
        }

        .status-unseen {
          background-color: #f5f5f5;
          color: #616161;
          border-color: #616161;
        }
      `}</style>
      ;
    </PostTableWrapper>
  );
};

export default ListCV;
