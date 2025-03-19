import React, { useState } from "react";
import Wrapper from "../../assets/wrappers/DashboardFormPage";
import { Form, redirect } from "react-router-dom";
import FormRow from "../../components/admin/FormRow";
import axiosInstance from "../../libs/axiosInterceptor";
import {
  showSuccessToast,
  showErrorToast,
} from "../../utils/toastNotifications";
import { getFromLocalStorage } from "../../utils/localStorage";
import MDEditor from "@uiw/react-md-editor";
import { marked } from "marked";
import CommonUtils from "../../utils/CommonUtils";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const user = getFromLocalStorage("user");

  if (!user || !user.id) {
    showErrorToast("User not found. Please login again.");
    return redirect("/auth/login");
  }

  formData.append("userId", user.id);

  for (let [key, value] of formData.entries()) {
    console.log(`${key}:`, value);
  }

  try {
    console.log("Sending FormData to API...");
    const response = await axiosInstance.post("/create-new-company", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    console.log("API Response:", response.data);
    if (response.status === 200) {
      // Status 200 từ backend
      showSuccessToast("Company created successfully!");
      return redirect("/admin/company");
    }
  } catch (error) {
    console.error("Full Error:", error);
    console.error("Error Response Data:", error.response?.data);
    console.error("Error Status:", error.response?.status);
    console.error("Error Message:", error.message);
    showErrorToast(
      error?.response?.data?.message || "Failed to create company."
    );
    return error;
  }
};

const AddCompany = () => {
  const [formValues, setFormValues] = useState({
    name: "",
    phonenumber: "",
    address: "",
    descriptionMarkdown: "",
    descriptionHTML: "",
    website: "",
    amountEmployer: "",
    taxnumber: "",
    thumbnail: null,
    coverImage: null,
    file: "",
  });

  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const [coverImagePreview, setCoverImagePreview] = useState(null);
  const [filePreview, setFilePreview] = useState(formValues.file);

  let handleOnChangeFilePdf = async (event) => {
    let data = event.target.files;
    let file = data[0];
    console.log("file", file);
    if (file) {
      if (file.size > 2097152) {
        showErrorToast("File của bạn quá lớn. Chỉ gửi file dưới 2MB");
        return;
      }
      let base64 = await CommonUtils.getBase64(file);

      // Cập nhật fileUrl với URL tạm thời của file
      const fileUrl = base64;

      setFormValues({
        ...formValues,
        file: base64,
        fileUrl: fileUrl,
        isFileChange: true,
      });

      setFilePreview(fileUrl); // Cập nhật preview
    }
  };

  const handleFileChange = (e, field) => {
    const file = e.target.files[0];
    if (!file) return;

    const maxSize = 512 * 1024;
    if (file.size > maxSize) {
      showErrorToast(
        `${
          field === "thumbnail" ? "Thumbnail" : "Cover Image"
        } vượt quá kích thước 0.5MB!`
      );
      return;
    }

    const previewUrl = URL.createObjectURL(file);
    if (field === "thumbnail") {
      setFormValues({ ...formValues, thumbnail: file });
      setThumbnailPreview(previewUrl);
    } else if (field === "coverImage") {
      setFormValues({ ...formValues, coverImage: file });
      setCoverImagePreview(previewUrl);
    }
  };

  const handleMarkdownChange = (value) => {
    setFormValues({
      ...formValues,
      descriptionMarkdown: value || "",
      descriptionHTML: value ? marked(value) : "<p>No description provided</p>",
    });
  };

  return (
    <Wrapper>
      <Form
        method="post"
        action="/admin/company/add"
        className="form"
        encType="multipart/form-data"
      >
        <h4 className="form-title">Tạo mới công ty</h4>
        <div className="form-center">
          <FormRow
            type="text"
            name="name"
            labelText="Tên công ty (*)"
            value={formValues.name}
            onChange={(e) =>
              setFormValues({ ...formValues, name: e.target.value })
            }
            placeholder="Nhập tên công ty"
            required={true}
          />
          <FormRow
            type="text"
            name="phonenumber"
            labelText="Số điện thoại (*)"
            value={formValues.phonenumber}
            onChange={(e) =>
              setFormValues({ ...formValues, phonenumber: e.target.value })
            }
            placeholder="Nhập số điện thoại"
            required={true}
          />
          <FormRow
            type="text"
            name="taxnumber"
            labelText="Mã số thuế"
            value={formValues.taxnumber}
            onChange={(e) =>
              setFormValues({ ...formValues, taxnumber: e.target.value })
            }
            placeholder="Nhập mã số thuế"
          />
          <FormRow
            type="number"
            name="amountEmployer"
            labelText="Số lượng nhân viên"
            value={formValues.amountEmployer}
            onChange={(e) =>
              setFormValues({ ...formValues, amountEmployer: e.target.value })
            }
            placeholder="Nhập số lượng nhân viên"
          />
          <FormRow
            type="text"
            name="address"
            labelText="Địa chỉ (*)"
            value={formValues.address}
            onChange={(e) =>
              setFormValues({ ...formValues, address: e.target.value })
            }
            placeholder="Nhập địa chỉ"
            required={true}
          />
          <FormRow
            type="text"
            name="website"
            labelText="Link website"
            value={formValues.website}
            onChange={(e) =>
              setFormValues({ ...formValues, website: e.target.value })
            }
            placeholder="Nhập link website"
          />
          <div className="form-row form-select-image">
            <label htmlFor="thumbnail" className="form-label">
              Thumbnail (max 0.5MB)
            </label>
            {thumbnailPreview && (
              <img
                src={thumbnailPreview}
                alt="Thumbnail Preview"
                style={{ maxWidth: "100px", marginBottom: "10px" }}
              />
            )}
            <input
              type="file"
              id="thumbnail"
              name="thumbnail"
              className="form-input"
              accept="image/*"
              onChange={(e) => handleFileChange(e, "thumbnail")}
            />
          </div>
          <div className="form-row form-select-image">
            <label htmlFor="coverImage" className="form-label">
              Cover Image (max 0.5MB)
            </label>
            {coverImagePreview && (
              <img
                src={coverImagePreview}
                alt="Cover Image Preview"
                style={{ maxWidth: "100px", marginBottom: "10px" }}
              />
            )}
            <input
              type="file"
              id="coverImage"
              name="coverImage"
              className="form-input"
              accept="image/*"
              onChange={(e) => handleFileChange(e, "coverImage")}
            />
          </div>
        </div>

        <div className="form-center" style={{ marginTop: "16px" }}>
          <div className="form-row form-select-image">
            <label htmlFor="file" className="form-label">
              File tài liệu (max 2MB)
            </label>

            <input
              type="file"
              id="file"
              name="file"
              className="form-input"
              accept=".pdf" // Hạn chế loại file nếu cần
              onChange={(event) => handleOnChangeFilePdf(event)}
            />
            <input type="hidden" name="fileUrl" value={formValues.fileUrl} />
          </div>
        </div>

        {filePreview && (
          <div className="file-preview" style={{ marginTop: "16px" }}>
            <label htmlFor="file" className="form-label">
              Hiển thị
            </label>
            <iframe
              width={"100%"}
              height={"700px"}
              src={formValues.file}
            ></iframe>
          </div>
        )}

        <div data-color-mode="light">
          <label htmlFor="descriptionMarkdown" className="form-label">
            Mô tả (Markdown)
          </label>
          <MDEditor
            value={formValues.descriptionMarkdown}
            onChange={handleMarkdownChange}
            height={500}
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

        <div
          className="form-center"
          style={{ marginTop: "16px", textAlign: "right" }}
        >
          <button type="submit" className="btn btn-block">
            Tạo mới
          </button>
        </div>
      </Form>
    </Wrapper>
  );
};

export default AddCompany;
