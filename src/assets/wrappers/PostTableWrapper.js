import styled from "styled-components";

const JobTableWrapper = styled.section`
  border-radius: var(--border-radius);
  width: 100%;
  background: var(--background-secondary-color);
  /* padding: 3rem 2rem 4rem; */
  padding: 0 2rem 2rem 2rem;

  .jobtype-container {
    overflow-x: auto; /* Cho phép cuộn ngang nếu bảng quá rộng */
    max-width: 100%;
    margin: 1rem 0 1rem 0;
    border: 1px solid #e5eaef;
    border-radius: 8px;
  }

  .title-list-job {
    font-size: 23px;
    margin-bottom: 1rem;
    color: var(--text-color);
    letter-spacing: var(--letter-spacing);
    font-family: "Plus Jakarta Sans", sans-serif;
  }

  .title-amount {
    font-size: 16px;
    color: var(--text-color);
    letter-spacing: var(--letter-spacing);
    font-family: "Plus Jakarta Sans", sans-serif;
  }

  table {
    width: 100%;
    border-collapse: collapse; /* Loại bỏ khoảng cách giữa các ô */
    table-layout: auto; /* Tự động điều chỉnh chiều rộng cột */
    border: 1px solid red;
    border-radius: 8px; /* Thêm border-radius */
    overflow: hidden; /* Quan trọng: Ẩn phần thừa của border-radius */
  }

  th,
  td {
    padding: 10px; /* Khoảng cách trong ô */
    text-align: left;
    white-space: nowrap; /* Ngăn nội dung xuống dòng */
    overflow: hidden; /* Ẩn nội dung tràn */
    text-overflow: ellipsis; /* Hiển thị "..." nếu nội dung quá dài */
    vertical-align: middle; /* Căn giữa theo chiều dọc */
    font-family: "Plus Jakarta Sans", sans-serif;
    border: none;
  }

  th {
    background-color: var(--background-main-custom); /* Màu nền cho header */
    color: #fff;
    font-weight: normal;
  }

  td {
    background: #f8f9fa;
    color: #000;
    border-bottom: 1px solid #ddd; /* Đường viền dưới mỗi hàng */
  }

  /* Thanh cuộn ngang */
  .jobtype-container::-webkit-scrollbar {
    height: 3px;
  }

  .jobtype-container::-webkit-scrollbar-track {
    background: var(--grey-100);
    border-radius: 6px;
    margin: 0 5px;
  }

  .jobtype-container::-webkit-scrollbar-thumb {
    background: var(--primary-500);
    border-radius: 6px;
    border: 2px solid var(--grey-100);
  }

  .jobtype-container::-webkit-scrollbar-thumb:hover {
    background: var(--primary-700);
  }

  .jobtype-container {
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

  .add-user-btn {
    font-family: "Plus Jakarta Sans", sans-serif;
  }

  .actions-custom {
    /* display: flex; */
    gap: 8px; /* Khoảng cách giữa các nút */
    align-items: center;
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
    color: #4b49ac;
    transition: all 0.3s ease;
  }

  .edit-btn:hover {
    color: #3a38a0;
    transform: scale(1.1);
  }

  .cv-btn {
    color: #2e7d32; /* Màu xanh lá để phân biệt */
    transition: all 0.3s ease;
  }

  .cv-btn:hover {
    color: #1b5e20;
    transform: scale(1.1);
  }
`;

export default JobTableWrapper;
