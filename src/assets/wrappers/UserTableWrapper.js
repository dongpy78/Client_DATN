import styled from "styled-components";

const UserTableWrapper = styled.div`
  .users-container {
    overflow-x: auto; /* Cho phép cuộn ngang nếu bảng quá rộng */
    max-width: 100%;
    margin: 1rem 0 1rem 0;
  }

  .title-manage-user {
    font-size: 24px;
    font-weight: 500;
    margin-bottom: 1rem;
  }

  .title-amount {
    font-size: 16px;
  }

  table {
    width: 100%;
    border-collapse: collapse; /* Loại bỏ khoảng cách giữa các ô */
    table-layout: auto; /* Tự động điều chỉnh chiều rộng cột */
  }

  th,
  td {
    padding: 10px; /* Khoảng cách trong ô */
    text-align: left;
    white-space: nowrap; /* Ngăn nội dung xuống dòng */
    overflow: hidden; /* Ẩn nội dung tràn */
    text-overflow: ellipsis; /* Hiển thị "..." nếu nội dung quá dài */
  }

  th {
    background-color: #0b7285; /* Màu nền cho header */
    font-weight: bold;
    color: #fff;
  }

  td {
    background: #f8f9fa;
    color: #000;
    border-bottom: 1px solid #ddd; /* Đường viền dưới mỗi hàng */
  }

  /* Thanh cuộn ngang */
  .users-container::-webkit-scrollbar {
    height: 3px;
  }

  .users-container::-webkit-scrollbar-track {
    background: var(--grey-100);
    border-radius: 6px;
    margin: 0 5px;
  }

  .users-container::-webkit-scrollbar-thumb {
    background: var(--primary-500);
    border-radius: 6px;
    border: 2px solid var(--grey-100);
  }

  .users-container::-webkit-scrollbar-thumb:hover {
    background: var(--primary-700);
  }

  .users-container {
    scrollbar-width: thin;
    scrollbar-color: var(--primary-500) var(--grey-100);
  }

  /* Giới hạn chiều rộng cho các cột cụ thể */
  th:nth-child(1),
  td:nth-child(1) {
    width: 50px; /* ID */
  }
  th:nth-child(2),
  td:nth-child(2) {
    min-width: 150px; /* Name */
  }
  th:nth-child(3),
  td:nth-child(3) {
    min-width: 200px; /* Email */
  }
  th:nth-child(4),
  td:nth-child(4) {
    width: 100px; /* Role */
  }
  th:nth-child(5),
  td:nth-child(5) {
    width: 120px; /* Date of Birth */
  }
  th:nth-child(6),
  td:nth-child(6) {
    width: 80px; /* Gender */
  }
  th:nth-child(7),
  td:nth-child(7) {
    width: 120px; /* Status */
  }
  th:nth-child(8),
  td:nth-child(8) {
    width: 150px; /* Actions */
  }

  .actions {
    display: flex;
    gap: 8px; /* Khoảng cách giữa các nút */
    align-items: center;
  }

  .edit-btn,
  .delete-btn,
  .ban-unban-btn {
    background: none;
    border: none;
    cursor: pointer;
    font-size: 1.2rem; /* Kích thước icon */
  }

  .edit-btn {
    color: #007bff; /* Màu xanh cho Edit */
  }
  .edit-btn:hover {
    color: #0056b3;
  }

  .delete-btn {
    color: #dc3545; /* Màu đỏ cho Delete */
  }
  .delete-btn:hover {
    color: #a71d2a;
  }

  .ban-unban-btn {
    color: #ff9800; /* Màu cam cho Ban/Unban */
  }
  .ban-unban-btn:hover {
    color: #e65100;
  }

  .status-active {
    color: #ffffff;
    background-color: #28a745;
    padding: 4px 8px;
    border-radius: 12px;
    display: inline-block;
  }

  .status-inactive {
    color: #ffffff;
    background-color: #dc3545;
    padding: 4px 8px;
    border-radius: 12px;
    display: inline-block;
  }

  .status-default {
    color: #ffffff;
    background-color: #6c757d;
    padding: 4px 8px;
    border-radius: 12px;
    display: inline-block;
  }
`;

export default UserTableWrapper;
