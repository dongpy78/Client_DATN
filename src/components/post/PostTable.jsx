import React from "react";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import PostTableWrapper from "../../assets/wrappers/PostTableWrapper";
import { Link } from "react-router-dom";

const PostTable = ({ typePost, currentPage = 1, totalCount = 0 }) => {
  if (!typePost || typePost.length === 0) {
    return (
      <PostTableWrapper>
        <h5>Không có bài đăng nào để hiển thị...</h5>
      </PostTableWrapper>
    );
  }

  const itemsPerPage = 5;

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
                <td>{post.timeEnd || "Chưa có"}</td>
                <td>{post.statusPostData?.value || "Không xác định"}</td>
                <td className="actions">
                  <Link
                    title="Edit post"
                    to={`/admin/post/edit/${post.id}`}
                    className="edit-btn"
                  >
                    <FaEdit />
                  </Link>
                  <button
                    title="Delete post"
                    onClick={() => onDelete(post.id)}
                    className="delete-btn"
                  >
                    <MdDelete />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Link to="/admin/post/add" className="btn add-user-btn">
        Thêm bài đăng
      </Link>
    </PostTableWrapper>
  );
};

export default PostTable;
