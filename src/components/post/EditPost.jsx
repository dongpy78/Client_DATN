import React, { useState, useEffect } from "react";
import Wrapper from "../../assets/wrappers/DashboardFormPage";
import { Form, redirect, useLoaderData, useNavigate } from "react-router-dom";
import FormRow from "../admin/FormRow";
import FormRowSelect from "../admin/FormRowSelect";
import SubmitBtn from "../admin/SubmitBtn";
import axiosInstance from "../../libs/axiosInterceptor";
import {
  showSuccessToast,
  showErrorToast,
} from "../../utils/toastNotifications";
import { getFromLocalStorage } from "../../utils/localStorage";
import MDEditor from "@uiw/react-md-editor";
import { marked } from "marked";

// Loader để lấy dữ liệu bài đăng hiện tại
export const loader = async ({ params }) => {
  const { id } = params;
  try {
    const response = await axiosInstance.get(`/posts/detail?id=${id}`);
    if (response.status === 200) {
      return response.data.data; // Giả định dữ liệu bài đăng nằm trong response.data.data
    }
    throw new Error("Failed to fetch post details.");
  } catch (error) {
    console.error("Error fetching post:", error);
    return null;
  }
};

// Action để xử lý cập nhật bài đăng
export const action = async ({ request, params }) => {
  const formData = await request.formData();
  const updates = Object.fromEntries(formData);
  const { id } = params;
  const user = getFromLocalStorage("user");
  console.log(user);

  // Chuẩn bị dữ liệu gửi đi
  const postData = {
    id,
    userId: user.id, // Lấy từ localStorage hoặc giá trị mặc định
    name: updates.name,
    categoryJobCode: updates.categoryJobCode,
    addressCode: updates.addressCode,
    salaryJobCode: updates.salaryJobCode,
    amount: parseInt(updates.amount, 10),
    timeEnd: updates.timeEnd,
    categoryJoblevelCode: updates.categoryJoblevelCode,
    categoryWorktypeCode: updates.categoryWorktypeCode,
    experienceJobCode: updates.experienceJobCode,
    genderPostCode: updates.genderPostCode,
    descriptionHTML:
      updates.descriptionHTML || marked(updates.descriptionMarkdown || ""),
    descriptionMarkdown: updates.descriptionMarkdown || "",
    isHot: updates.isHot || "0",
  };

  try {
    const response = await axiosInstance.put("/posts/update", postData);
    if (response.status === 200) {
      showSuccessToast("Cập nhật bài đăng thành công!");
      return redirect("/admin/post");
    }
    throw new Error("Failed to update post.");
  } catch (error) {
    console.error("Full Error:", error);
    console.error("Error Response Data:", error.response?.data);
    console.error("Error Status:", error.response?.status);
    console.error("Error Message:", error.message);
    console.error("Error updating post:", error);
    showErrorToast("Có lỗi khi cập nhật bài đăng: " + error.message);
    return { error: error.message };
  }
};

const EditPost = () => {
  const post = useLoaderData(); // Lấy dữ liệu từ loader
  const navigate = useNavigate();

  // State cho form và dropdown
  const [formValues, setFormValues] = useState({
    name: post?.postDetailData?.name || "Updated Job test banner",
    categoryJobCode: post?.postDetailData?.jobTypePostData?.code || "",
    addressCode: post?.postDetailData?.provincePostData?.code || "",
    salaryJobCode: post?.postDetailData?.salaryTypePostData?.code || "",
    amount: post?.postDetailData?.amount || 1000,
    timeEnd: post?.timeEnd || "2025-12-31",
    categoryJoblevelCode: post?.postDetailData?.jobLevelPostData?.code || "",
    categoryWorktypeCode: post?.postDetailData?.workTypePostData?.code || "",
    experienceJobCode: post?.postDetailData?.expTypePostData?.code || "",
    genderPostCode: post?.postDetailData?.genderPostData?.code || "",
    descriptionMarkdown: post?.postDetailData?.descriptionMarkdown || "Updated",
    descriptionHTML:
      post?.postDetailData?.descriptionHTML ||
      marked(post?.postDetailData?.descriptionMarkdown || "Updated"),
    isHot: post?.isHot?.toString() || "0",
  });

  const [dropdownData, setDropdownData] = useState({
    experience: [],
    category: [],
    province: [],
    salary: [],
    jobLevel: [],
    workType: [],
    gender: [],
  });

  // Fetch dữ liệu dropdown từ API
  useEffect(() => {
    const fetchDropdownData = async () => {
      try {
        const types = [
          "EXPTYPE",
          "JOBTYPE",
          "PROVINCE",
          "SALARYTYPE",
          "JOBLEVEL",
          "WORKTYPE",
          "GENDERPOST",
        ];

        const responses = await Promise.all(
          types.map((type) => axiosInstance.get(`/get-allcode?type=${type}`))
        );

        setDropdownData({
          experience: responses[0].data.data || [],
          category: responses[1].data.data || [],
          province: responses[2].data.data || [],
          salary: responses[3].data.data || [],
          jobLevel: responses[4].data.data || [],
          workType: responses[5].data.data || [],
          gender: responses[6].data.data || [],
        });
      } catch (error) {
        console.error("Error fetching dropdown data:", error);
        showErrorToast("Failed to load dropdown data.");
      }
    };

    fetchDropdownData();
  }, []);

  // Xử lý thay đổi input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Xử lý thay đổi select
  const handleSelectChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Xử lý thay đổi Markdown
  const handleMarkdownChange = (value) => {
    setFormValues((prev) => ({
      ...prev,
      descriptionMarkdown: value,
      descriptionHTML: marked(value || ""),
    }));
  };

  return (
    <Wrapper>
      <Form method="post" className="form">
        <h4 className="form-title">Chỉnh sửa bài đăng</h4>
        <div className="form-center">
          <FormRow
            type="text"
            name="name"
            labelText="Tên bài đăng"
            value={formValues.name}
            onChange={handleChange}
          />
          <FormRowSelect
            labelText="Lĩnh vực"
            name="categoryJobCode"
            value={formValues.categoryJobCode}
            list={dropdownData.category.map((item) => ({
              value: item.code,
              label: item.value,
            }))}
            onChange={handleSelectChange}
          />
          <FormRowSelect
            labelText="Địa điểm"
            name="addressCode"
            value={formValues.addressCode}
            list={dropdownData.province.map((item) => ({
              value: item.code,
              label: item.value,
            }))}
            onChange={handleSelectChange}
          />
          <FormRowSelect
            labelText="Mức lương"
            name="salaryJobCode"
            value={formValues.salaryJobCode}
            list={dropdownData.salary.map((item) => ({
              value: item.code,
              label: item.value,
            }))}
            onChange={handleSelectChange}
          />
          <FormRow
            type="number"
            name="amount"
            labelText="Số lượng tuyển"
            value={formValues.amount}
            onChange={handleChange}
          />
          <FormRow
            type="datetime-local"
            name="timeEnd"
            labelText="Thời gian kết thúc"
            value={formValues.timeEnd}
            onChange={handleChange}
          />
          <FormRowSelect
            labelText="Chức vụ"
            name="categoryJoblevelCode"
            value={formValues.categoryJoblevelCode}
            list={dropdownData.jobLevel.map((item) => ({
              value: item.code,
              label: item.value,
            }))}
            onChange={handleSelectChange}
          />
          <FormRowSelect
            labelText="Hình thức làm việc"
            name="categoryWorktypeCode"
            value={formValues.categoryWorktypeCode}
            list={dropdownData.workType.map((item) => ({
              value: item.code,
              label: item.value,
            }))}
            onChange={handleSelectChange}
          />
          <FormRowSelect
            labelText="Kinh nghiệm"
            name="experienceJobCode"
            value={formValues.experienceJobCode}
            list={dropdownData.experience.map((item) => ({
              value: item.code,
              label: item.value,
            }))}
            onChange={handleSelectChange}
          />
          <FormRowSelect
            labelText="Giới tính"
            name="genderPostCode"
            value={formValues.genderPostCode}
            list={dropdownData.gender.map((item) => ({
              value: item.code,
              label: item.value,
            }))}
            onChange={handleSelectChange}
          />
          <FormRowSelect
            labelText="Bài đăng nổi bật"
            name="isHot"
            value={formValues.isHot}
            list={[
              { value: "1", label: "Có" },
              { value: "0", label: "Không" },
            ]}
            onChange={handleSelectChange}
          />
        </div>
        <div data-color-mode="light" style={{ marginTop: "16px" }}>
          <label htmlFor="descriptionMarkdown" className="form-label">
            Mô tả (Markdown)
          </label>
          <MDEditor
            value={formValues.descriptionMarkdown}
            onChange={handleMarkdownChange}
            height={300}
            preview="live"
          />
          <input
            type="hidden"
            name="descriptionMarkdown"
            value={formValues.descriptionMarkdown}
          />
          <input
            type="hidden"
            name="descriptionHTML"
            value={formValues.descriptionHTML}
          />
        </div>
        <div className="form-center">
          <SubmitBtn formBtn />
        </div>
      </Form>
    </Wrapper>
  );
};

export default EditPost;
