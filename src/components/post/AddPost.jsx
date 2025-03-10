import Wrapper from "../../assets/wrappers/DashboardFormPage";
import { Form, redirect } from "react-router-dom";
import FormRowSelect from "../admin/FormRowSelect";
import FormRow from "../admin/FormRow";
import SubmitBtn from "../admin/SubmitBtn";
import axiosInstance from "../../libs/axiosInterceptor";
import {
  showSuccessToast,
  showErrorToast,
} from "../../utils/toastNotifications";
import { getFromLocalStorage } from "../../utils/localStorage";
import MDEditor from "@uiw/react-md-editor";
import { marked } from "marked";
import { useEffect, useState } from "react";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const user = getFromLocalStorage("user");
  console.log(user);

  if (!user || !user.id) {
    showErrorToast("User not found. Please login again.");
    return redirect("/auth/login");
  }

  const data = {
    name: formData.get("name"),
    categoryJobCode: formData.get("categoryJobCode"),
    addressCode: formData.get("addressCode"),
    salaryJobCode: formData.get("salaryJobCode"),
    amount: Number(formData.get("amount")),
    timeEnd: formData.get("timeEnd"),
    categoryJoblevelCode: formData.get("categoryJoblevelCode"),
    userId: Number(user.id),
    categoryWorktypeCode: formData.get("categoryWorktypeCode"),
    experienceJobCode: formData.get("experienceJobCode"),
    genderPostCode: formData.get("genderPostCode"),
    descriptionHTML: formData.get("descriptionHTML"),
    descriptionMarkdown: formData.get("descriptionMarkdown"),
    isHot: formData.get("isHot") === "1" ? "1" : "0", // Sửa "true" thành "1"
  };

  try {
    const response = await axiosInstance.post("/create-new-post", data);
    if (response.status === 201 || response.status === 200) {
      showSuccessToast("Post created successfully!");
      return redirect("/admin/post");
    }
  } catch (error) {
    console.error("Error creating post:", error.response?.data);
    showErrorToast(error?.response?.data?.message || "Failed to create post.");
    return error;
  }
};

const AddPost = () => {
  const [formValues, setFormValues] = useState({
    name: "",
    categoryJobCode: "",
    addressCode: "",
    salaryJobCode: "",
    amount: "",
    timeEnd: "",
    categoryJoblevelCode: "",
    categoryWorktypeCode: "",
    experienceJobCode: "",
    genderPostCode: "",
    descriptionMarkdown: "",
    descriptionHTML: "",
    isHot: "0",
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

  const handleMarkdownChange = (value) => {
    setFormValues({
      ...formValues,
      descriptionMarkdown: value || "",
      descriptionHTML: value ? marked(value) : "<p>No description provided</p>",
    });
  };

  const handleSelectChange = (e) => {
    const { name, value } = e.target;
    console.log(`${name}: ${value}`); // Debug giá trị chọn
    setFormValues({ ...formValues, [name]: value });
  };

  return (
    <Wrapper>
      <Form method="post" className="form">
        <h4 className="form-title">Thêm bài đăng</h4>
        <div className="form-center">
          <FormRow
            type="text"
            name="name"
            labelText="Tên bài đăng"
            value={formValues.name}
            onChange={(e) =>
              setFormValues({ ...formValues, name: e.target.value })
            }
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
            onChange={(e) =>
              setFormValues({ ...formValues, amount: e.target.value })
            }
          />
          <FormRow
            type="datetime-local"
            name="timeEnd"
            labelText="Thời gian kết thúc"
            value={formValues.timeEnd}
            onChange={(e) =>
              setFormValues({ ...formValues, timeEnd: e.target.value })
            }
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
            preview="edit"
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

export default AddPost;
