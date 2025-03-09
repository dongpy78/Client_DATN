import React from "react";
import { useLoaderData, Navigate, useActionData } from "react-router-dom"; // Thêm useActionData
import { getFromLocalStorage } from "../../../utils/localStorage";
import axiosInstance from "../../../libs/axiosInterceptor";
import AddCompany from "../../../components/company/AddCompany";
import EditCompany from "../../../components/company/EditCompany";

// Loader để kiểm tra trạng thái công ty
export const loader = async () => {
  const user = getFromLocalStorage("user");
  if (!user || !user.id) {
    return { redirect: "/auth/login" };
  }

  try {
    const response = await axiosInstance.get(
      `/companies/by-user?userId=${user.id}`
    );
    console.log("API Response in loader:", response.data);
    if (response.status === 200 && response.data.data) {
      return { hasCompany: true, companyData: response.data.data };
    }
  } catch (error) {
    console.error("Loader Error:", error.response?.data || error.message);
    if (error.response?.status === 404) {
      return { hasCompany: false };
    }
    return { hasCompany: false };
  }
  return { hasCompany: false };
};

const Company = () => {
  const loaderData = useLoaderData();
  const actionData = useActionData(); // Lấy dữ liệu từ action
  console.log("Loader Data in Company:", loaderData);
  console.log("Action Data in Company:", actionData);

  // Nếu có redirect từ loader hoặc action
  if (loaderData.redirect) {
    return <Navigate to={loaderData.redirect} replace />;
  }
  if (actionData?.redirect) {
    // Dùng dữ liệu cập nhật từ action nếu có
    if (actionData.updatedData) {
      return <EditCompany initialData={actionData.updatedData} />;
    }
    return <Navigate to={actionData.redirect} replace />;
  }

  // Nếu đã có công ty, hiển thị EditCompany với dữ liệu từ loader
  if (loaderData.hasCompany) {
    return <EditCompany initialData={loaderData.companyData} />;
  }

  // Nếu chưa có công ty, hiển thị AddCompany
  return <AddCompany />;
};

export default Company;
