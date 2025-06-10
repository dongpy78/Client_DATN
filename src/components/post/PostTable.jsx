import React from "react";
import PostTableWrapper from "../../assets/wrappers/PostTableWrapper";
import { Link } from "react-router-dom";
import moment from "moment";
import { FaEdit, FaFileAlt } from "react-icons/fa";
import LoadingPage from "../../pages/loading-page/LoadingPage";

const PostTable = ({ typePost, currentPage = 1, totalCount = 0 }) => {
  // if (!typePost || typePost.length === 0) {
  //   return (
  //     <div>
  //       <PostTableWrapper>
  //         <p>Chưa có bài đăng nào.</p>
  //         <Link to="/admin/post/add" className="btn add-user-btn">
  //           Thêm bài đăng
  //         </Link>
  //         <Link
  //           style={{ marginLeft: "1rem" }}
  //           to="/admin/post/buy-post"
  //           className="btn add-user-btn"
  //         >
  //           Mua thêm lượt đăng bài
  //         </Link>
  //       </PostTableWrapper>
  //     </div>
  //   );
  // }

  const itemsPerPage = 5;

  // Hàm định dạng ngày tháng
  const formatDate = (dateString) => {
    if (!dateString) return "Chưa có";
    return moment(dateString).format("DD/MM/YYYY");
  };

  // Hàm xác định CSS class cho trạng thái
  const getStatusClass = (statusValue) => {
    if (!statusValue) return "status-badge status-unknown";

    switch (statusValue) {
      case "Đã kiểm duyệt":
        return "status-badge status-approved";
      case "Đã bị từ chối":
        return "status-badge status-rejected";
      case "Chờ kiểm duyệt":
        return "status-badge status-pending";
      case "Đã bị chặn":
        return "status-badge status-blocked";
      default:
        return "status-badge status-unknown";
    }
  };

  return (
    <PostTableWrapper>
      <h5 className="title-list-job">Danh sách bài đăng</h5>
      <h5 className="title-amount">Tổng số lượng: {totalCount}</h5>
      <div className="jobtype-container">
        <table>
          <thead>
            <tr>
              <th>STT</th>
              <th>Mã bài đăng</th>
              <th>Tên bài đăng</th>
              <th>Tên người đăng</th>
              <th>Ngày kết thúc</th>
              <th>Trạng thái</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {typePost.map((post, index) => (
              <tr key={post.id}>
                <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                <td>{post.id}</td>
                <td>{post.postDetailData?.name || "Không có tiêu đề"}</td>
                <td>
                  {post.userPostData
                    ? `${post.userPostData.firstName} ${post.userPostData.lastName}`
                    : "N/A"}
                </td>
                <td>{formatDate(post.timeEnd)}</td>
                <td>
                  <span className={getStatusClass(post.statusPostData?.value)}>
                    {post.statusPostData?.value || "Không xác định"}
                  </span>
                </td>
                <td className="actions">
                  <Link
                    title="Sửa bài đăng"
                    to={`/admin/post/edit/${post.id}`}
                    className="edit-btn"
                  >
                    <FaEdit />
                  </Link>
                  <Link
                    title="Xem CV"
                    to={`/admin/post/cv/${post.id}`}
                    className="cv-btn" // Đổi class để style riêng
                  >
                    <FaFileAlt /> {/* Thay bằng icon file CV */}
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="add-post-buy-container">
        <Link to="/admin/post/add" className="btn add-user-btn">
          Thêm bài đăng
        </Link>
      </div>

      {/* CSS cho các trạng thái */}
      <style jsx>{`
        .status-badge {
          display: inline-block;
          padding: 4px 12px;
          border-radius: 16px;
          font-size: 12px;
          font-weight: 500;
          text-align: center;
          white-space: nowrap;
          min-width: 100px;
        }

        .status-approved {
          background-color: #e8f5e9;
          color: #2e7d32;
          border: 1px solid #2e7d32;
        }

        .status-pending {
          background-color: #fff8e1;
          color: #ff8f00;
          border: 1px solid #ff8f00;
        }

        .status-rejected {
          background-color: #ffebee;
          color: #c62828;
          border: 1px solid #c62828;
        }

        .status-blocked {
          background-color: #f5f5f5;
          color: #616161;
          border: 1px solid #616161;
        }

        .status-unknown {
          background-color: #e3f2fd;
          color: #1565c0;
          border: 1px solid #1565c0;
        }
      `}</style>
    </PostTableWrapper>
  );
};

export default PostTable;
