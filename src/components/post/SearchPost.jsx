import React, { useState, useEffect } from "react";
import { Form, useSubmit } from "react-router-dom";
import FormRow from "../admin/FormRow";
import FormRowSelect from "../admin/FormRowSelect";
import Wrapper from "../../assets/wrappers/DashboardFormPage";
import axiosInstance from "../../libs/axiosInterceptor";
import { showErrorToast } from "../../utils/toastNotifications";

const SearchPost = () => {
  const submit = useSubmit();
  const [searchValue, setSearchValue] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [statusOptions, setStatusOptions] = useState([
    { value: "all", label: "Tất cả" },
  ]);

  // Lấy danh sách trạng thái từ API
  useEffect(() => {
    const fetchPostStatus = async () => {
      try {
        const response = await axiosInstance.get(
          "/get-allcode?type=POSTSTATUS"
        );
        const data = response.data.data || [];
        const options = [
          { value: "all", label: "Tất cả" },
          ...data.map((item) => ({
            value: item.code,
            label: item.value,
          })),
        ];
        setStatusOptions(options);
      } catch (error) {
        console.error("Error fetching POSTSTATUS:", error);
        showErrorToast("Failed to load post status options.");
      }
    };

    fetchPostStatus();
  }, []);

  const debounce = (onChange, field) => {
    let timeout;
    return (value) => {
      const form = document.querySelector(".form");
      console.log(`Debounce triggered for ${field} with value:`, value);
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        console.log("Submitting form:", Object.fromEntries(new FormData(form)));
        onChange(form);
      }, 1000);
    };
  };

  const handleChange = (form) => {
    console.log(
      "Handle change called, submitting form:",
      Object.fromEntries(new FormData(form))
    );
    submit(form, { method: "get", action: "/admin/post" });
  };

  const handleReset = () => {
    setSearchValue("");
    setStatusFilter("all");
    const form = document.querySelector(".form");
    if (form) {
      form.reset();
      submit(form, { method: "get", action: "/admin/post" });
    }
  };

  return (
    <Wrapper>
      <Form method="get" className="form">
        <h5 className="form-title">Tìm kiếm bài đăng</h5>
        <div className="form-center">
          <FormRow
            type="search"
            name="title"
            labelText="Tìm theo tiêu đề"
            value={searchValue}
            onChange={(e) => {
              const newValue = e.target.value;
              setSearchValue(newValue);
              debounce(handleChange, "title")(newValue);
            }}
            placeholder="e.g., Tuyển lập trình viên"
          />
          <FormRowSelect
            name="status"
            labelText="Trạng thái bài đăng"
            list={statusOptions}
            value={statusFilter}
            onChange={(e) => {
              const newValue = e.target.value;
              setStatusFilter(newValue);
              debounce(handleChange, "status")(newValue);
            }}
          />
          <button type="button" className="btn form-btn" onClick={handleReset}>
            Reset Search
          </button>
        </div>
      </Form>
    </Wrapper>
  );
};

export default SearchPost;
