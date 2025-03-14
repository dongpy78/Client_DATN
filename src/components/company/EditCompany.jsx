import React, { useState, useEffect } from "react";
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

export const action = async ({ request }) => {
  const formData = await request.formData();
  const user = getFromLocalStorage("user");

  if (!user || !user.id) {
    showErrorToast("User not found. Please login again.");
    return redirect("/auth/login");
  }

  formData.append("userId", user.id);

  // Log FormData để kiểm tra
  for (let [key, value] of formData.entries()) {
    console.log(`${key}:`, value);
  }

  try {
    console.log("Sending FormData to API...");
    const response = await axiosInstance.put("/update-company", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    console.log("API Response:", response.data);
    if (response.status === 200) {
      showSuccessToast("Company updated successfully!");
      return redirect("/admin/company"); // Sửa lại đường dẫn để đúng với danh sách công ty
    }
  } catch (error) {
    console.error("Update Error:", error.response?.data);
    showErrorToast(
      error?.response?.data?.message || "Failed to update company."
    );
    return error;
  }
};

const EditCompany = ({ initialData }) => {
  console.log("EditCompany initialData:", initialData);

  const [formValues, setFormValues] = useState({
    id: initialData?.id || "",
    name: initialData?.name || "",
    phonenumber: initialData?.phonenumber || "",
    address: initialData?.address || "",
    descriptionMarkdown: initialData?.descriptionMarkdown || "",
    descriptionHTML:
      initialData?.descriptionHTML || "<p>No description provided</p>",
    website: initialData?.website || "",
    amountEmployer: initialData?.amountEmployer || "",
    taxnumber: initialData?.taxnumber || "",
    thumbnail: null, // File object nếu upload mới
    coverImage: null, // File object nếu upload mới
    file: null, // File object nếu upload mới
    thumbnailUrl: initialData?.thumbnail || "", // URL hiện tại
    coverImageUrl: initialData?.coverimage || initialData?.coverImage || "", // URL hiện tại
    fileUrl: initialData?.file || "", // URL hiện tại của file
  });

  const [thumbnailPreview, setThumbnailPreview] = useState(
    formValues.thumbnailUrl
  );
  const [coverImagePreview, setCoverImagePreview] = useState(
    formValues.coverImageUrl
  );
  const [filePreview, setFilePreview] = useState(formValues.fileUrl);

  useEffect(() => {
    const fetchUpdatedData = async () => {
      const user = getFromLocalStorage("user");
      if (!user || !user.id) return;

      try {
        const response = await axiosInstance.get(
          `/companies/by-user?userId=${user.id}`
        );
        if (response.status === 200 && response.data.data) {
          setFormValues((prev) => ({
            ...prev,
            id: response.data.data.id || "",
            name: response.data.data.name || "",
            phonenumber: response.data.data.phonenumber || "",
            address: response.data.data.address || "",
            descriptionMarkdown: response.data.data.descriptionMarkdown || "",
            descriptionHTML:
              response.data.data.descriptionHTML ||
              "<p>No description provided</p>",
            website: response.data.data.website || "",
            amountEmployer: response.data.data.amountEmployer || "",
            taxnumber: response.data.data.taxnumber || "",
            thumbnailUrl: response.data.data.thumbnail || "",
            coverImageUrl:
              response.data.data.coverimage ||
              response.data.data.coverImage ||
              "",
            fileUrl: response.data.data.file || "",
          }));
          setThumbnailPreview(response.data.data.thumbnail || "");
          setCoverImagePreview(
            response.data.data.coverimage || response.data.data.coverImage || ""
          );
          setFilePreview(response.data.data.file || "");
        }
      } catch (error) {
        console.error("Fetch Updated Data Error:", error.response?.data);
      }
    };

    if (formValues.id) {
      fetchUpdatedData();
    }
  }, [formValues.id]);

  const handleFileChange = (e, field) => {
    const file = e.target.files[0];
    if (!file) return;

    const maxSize = 2 * 1024 * 1024; // 2MB
    if (file.size > maxSize) {
      showErrorToast(
        `${
          field === "thumbnail"
            ? "Thumbnail"
            : field === "coverImage"
            ? "Cover Image"
            : "File"
        } vượt quá kích thước 2MB!`
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
    } else if (field === "file") {
      setFormValues({ ...formValues, file: file });
      setFilePreview(previewUrl);
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
        action="/admin/company/edit" // Sửa lại đường dẫn để đúng với danh sách công ty
        className="form"
        encType="multipart/form-data"
      >
        <h4 className="form-title">Cập nhật công ty</h4>
        <input type="hidden" name="id" value={formValues.id} />
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
              Thumbnail (max 2MB)
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
            <input
              type="hidden"
              name="thumbnailUrl"
              value={formValues.thumbnailUrl}
            />
          </div>
          <div className="form-row form-select-image">
            <label htmlFor="coverImage" className="form-label">
              Cover Image (max 2MB)
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
            <input
              type="hidden"
              name="coverImageUrl"
              value={formValues.coverImageUrl}
            />
          </div>
        </div>

        <div className="form-center">
          <div className="form-row form-select-image">
            <label htmlFor="file" className="form-label">
              File tài liệu (max 2MB)
            </label>
            {filePreview && (
              <div className="file-preview">
                {/* Hiển thị preview nếu file là PDF */}
                {filePreview.endsWith(".pdf") ? (
                  <iframe
                    src={filePreview}
                    width="100%"
                    height="200px"
                    title="File Preview"
                    style={{ border: "1px solid #ddd", borderRadius: "4px" }}
                  />
                ) : (
                  <p>File hiện tại: {filePreview.split("/").pop()}</p>
                )}
              </div>
            )}
            <input
              type="file"
              id="file"
              name="file"
              className="form-input"
              accept=".pdf,.doc,.docx" // Hạn chế loại file nếu cần
              onChange={(e) => handleFileChange(e, "file")}
            />
            <input type="hidden" name="fileUrl" value={formValues.fileUrl} />
          </div>
        </div>

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
            Cập nhật
          </button>
        </div>
      </Form>
    </Wrapper>
  );
};

export default EditCompany;
