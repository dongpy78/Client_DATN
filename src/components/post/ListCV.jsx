import React from "react";
import { useEffect, useState } from "react";
import PostTableWrapper from "../../assets/wrappers/PostTableWrapper";
import { PAGINATION } from "../../constants/paginationConstant";
import {
  FaEye,
  FaLock,
  FaUnlock,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";
import { getAllListCvByPostService } from "../../services/cvService";
import { getDetailPostByIdService } from "../../services/userService";
import ReactPaginate from "react-paginate";
import { Link, useNavigate, useParams } from "react-router-dom";

const ListCV = () => {
  const [dataCv, setdataCv] = useState([]);
  const [count, setCount] = useState("");
  const [numberPage, setnumberPage] = useState("");
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
            console.log("dataCV", arrData.result);
            setCount(Math.ceil(arrData.count / PAGINATION.pagerow));
          }
        };
        fetchData();
        fetchPost(id);
      } catch (error) {
        console.log(error);
      }
    }
  }, []);

  let handleChangePage = async (number) => {
    setnumberPage(number.selected);
    let arrData = await getAllListCvByPostService({
      limit: PAGINATION.pagerow,
      offset: number.selected * PAGINATION.pagerow,
      postId: id,
    });
    if (arrData) {
      setdataCv(arrData.data);
    }
  };

  return (
    <PostTableWrapper>
      <h5 className="title-list-job">Danh sách CV</h5>
      <h5 className="title-amount">Tổng số lượng: {dataCv.length} </h5>

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
                <td>{index + 1 + numberPage * PAGINATION.pagerow}</td>
                <td>
                  {item.userCvData.firstName + " " + item.userCvData.lastName}
                </td>
                <td>{item.userCvData.phonenumber}</td>
                <td>{item.file}</td>
                <td>
                  <span
                    className={
                      +item.file.split("%")[0] >= 70
                        ? "status-active"
                        : +item.file.split("%")[0] > 30
                        ? "ban-unban-btn"
                        : "status-banned"
                    }
                  >
                    {+item.file.split("%")[0] >= 70
                      ? "Tốt"
                      : +item.file.split("%")[0]
                      ? "Tạm chấp nhận"
                      : "Tệ"}
                  </span>
                </td>
                <td>{item.isChecked === 0 ? "Chưa xem" : "Đã xem"}</td>
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
    </PostTableWrapper>
  );
};

export default ListCV;
