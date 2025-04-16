import styled from "styled-components";

const Wrapper = styled.section`
  border-radius: var(--border-radius);
  width: 100%;
  background-color: var(--background-third-color);

  padding: 3rem 2rem 4rem;

  .company-quota-info {
    margin-bottom: 20px;
    padding: 10px 10px;
    background-color: #f8f9fa;
    border-radius: 8px;
    border-left: 4px solid #4b49ac;
  }

  .company-quota-info h5 {
    margin: 8px 0;
    display: flex;
    gap: 1rem;
    justify-content: start;
    align-items: center;
  }

  .quota-label {
    font-weight: 500;
    color: #555;
    font-size: 16px;
  }

  .quota-value {
    font-weight: 600;
    color: var(--text-color);
    padding: 4px 10px;
    border-radius: 12px;
    font-size: 16px;
    background-color: #f0f0f0;
  }

  .quota-empty {
    color: #d32f2f;
    background-color: #ffebee;
  }

  .form-title {
    margin-bottom: 2rem;
    text-transform: capitalize;
    color: var(--text-color);
    letter-spacing: var(--letter-spacing);
    font-family: "Plus Jakarta Sans", sans-serif;
    font-size: 22px;
  }

  .form {
    margin: 0;
    border-radius: 0;
    box-shadow: none;
    padding: 0;
    max-width: 100%;
    width: 100%;
  }

  .form-row {
    margin-bottom: 0;
  }

  .form-center {
    display: grid;
    row-gap: 1rem;
  }

  .form-btn {
    align-self: end;
    margin-top: 1rem;
    display: grid;
    place-items: center;
  }

  .form-input-descmarkdown,
  .form-input-deschtml {
  }

  .form-select-image .form-input {
    display: block; /* Đảm bảo input chiếm full width */
    padding: 3px 12px; /* Điều chỉnh padding cho đẹp */
    border: 1px solid #ccc; /* Thêm border nếu cần */
    border-radius: 4px; /* Bo góc */

    cursor: pointer; /* Hiệu ứng hover */
  }

  .form-label {
    display: block;
    font-size: var(--small-text);
    margin-bottom: 0.75rem;
    text-transform: capitalize;
    letter-spacing: var(--letter-spacing);
    line-height: 1.5;
    color: var(--text-color);
    font-family: "Plus Jakarta Sans", sans-serif;
  }

  .form-input:focus {
    border: 1px solid var(--background-main-custom);
  }

  .form-input,
  .form-textarea,
  .form-select {
    width: 100%;
    padding: 0.375rem 0.75rem;
    border-radius: var(--border-radius);
    background: var(--background-secondary-color);
    border: 1px solid var(--grey-300);
    color: var(--text-color);
    font-size: var(--small-text);
    letter-spacing: var(--letter-spacing);
    font-family: "Plus Jakarta Sans", sans-serif;
  }
  .form-input,
  .form-select,
  .form-btn {
    height: 34px;
  }

  .form-select-image {
    font-size: 12px;
  }

  .form-row {
    /* margin-bottom: 1rem; */
  }

  .form-textarea {
    height: 7rem;
  }
  ::placeholder {
    font-family: inherit;
    color: var(--grey-400);
  }
  .form-alert {
    color: var(--red-dark);
    letter-spacing: var(--letter-spacing);
    text-transform: capitalize;
  }

  @media (min-width: 992px) {
    .form-center {
      grid-template-columns: 1fr 1fr;
      align-items: center;
      column-gap: 1.6rem;
    }
  }

  @media (min-width: 1120px) {
    .form-center {
      grid-template-columns: 1fr 1fr 1fr;
    }
  }
`;

export default Wrapper;
