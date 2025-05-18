import React from "react";
import { useEffect, useState } from "react";
import { getPackageByType, getPaymentLink } from "../../services/userService";
import {
  showSuccessToast,
  showErrorToast,
} from "../../utils/toastNotifications";
import Wrapper from "../../assets/wrappers/DashboardFormPage";
import FormRow from "../admin/FormRow";
import { Form, useNavigate } from "react-router-dom";
import LoadingPage from "../../pages/loading-page/LoadingPage";

const BuyPost = () => {
  const navigate = useNavigate();
  const [inputValues, setInputValues] = useState({
    amount: 1,
    packageId: "",
    isHot: 0,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [dataPackage, setDataPackage] = useState([]);
  const [price, setPrice] = useState(0);
  const [total, setTotal] = useState(0);
  const [showLoading, setShowLoading] = useState(false);

  const handleOnChangePackage = (event) => {
    const { value } = event.target;
    const item = dataPackage.find(
      (item) => item.id.toString() === value.toString() && item.isActive === 1
    );

    if (!item) {
      showErrorToast("Selected package not found or is inactive");
      return;
    }

    setPrice(item.price);
    setTotal(item.price * inputValues.amount);
    setInputValues({
      ...inputValues,
      packageId: item.id,
    });
  };

  const handleOnChangeAmount = (event) => {
    const value = Math.max(1, parseInt(event.target.value) || 1);
    setInputValues({
      ...inputValues,
      amount: value,
    });
    setTotal(value * price);
  };

  const handleOnChangeType = (event) => {
    const { value } = event.target;
    fetchPackagePost(value);
  };

  const handleBuy = async () => {
    if (!inputValues.packageId) {
      showErrorToast("Please select a package");
      return;
    }

    setShowLoading(true);
    setIsLoading(true);
    try {
      const res = await getPaymentLink(
        inputValues.packageId,
        inputValues.amount
      );
      if (res.errCode == 0) {
        const data = {
          packageId: inputValues.packageId,
          amount: inputValues.amount,
          userId: JSON.parse(localStorage.getItem("user")).id,
        };
        localStorage.setItem("orderData", JSON.stringify(data));
        window.location.href = res.link;
      } else {
        showErrorToast(res.errMessage);
      }
    } catch (error) {
      showErrorToast("Có lỗi xảy ra khi xử lý thanh toán");
      console.error("Payment error:", error);
    } finally {
      setIsLoading(false);
      setShowLoading(false);
    }
  };

  const fetchPackagePost = async (isHot) => {
    try {
      const res = await getPackageByType(isHot);
      if (res?.data?.length > 0) {
        // Lọc chỉ các gói có isActive = 1
        const activePackages = res.data.filter((pkg) => pkg.isActive === 1);

        if (activePackages.length > 0) {
          setDataPackage(activePackages);
          setInputValues({
            ...inputValues,
            isHot: isHot,
            packageId: activePackages[0].id,
          });
          setPrice(activePackages[0].price);
          setTotal(activePackages[0].price * inputValues.amount);
        } else {
          showErrorToast("No active packages available for this type");
        }
      }
    } catch (error) {
      showErrorToast("Failed to load packages");
      console.error("Fetch packages error:", error);
    }
  };

  useEffect(() => {
    fetchPackagePost(0);
  }, []);

  return (
    <Wrapper>
      {showLoading && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(255, 255, 255, 0.8)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
        >
          <LoadingPage />
        </div>
      )}

      <Form className="form">
        <h4 className="form-title">Mua lượt đăng bài viết</h4>
        <div className="form-center">
          <div className="form-row">
            <label className="form-label">Loại lượt đăng bài viết</label>
            <select
              className="form-select"
              value={inputValues.isHot}
              name="typePost"
              onChange={handleOnChangeType}
            >
              <option value={0}>Bài viết bình thường</option>
              <option value={1}>Bài viết nổi bật</option>
            </select>
          </div>
          <div className="form-row">
            <label className="form-label">Các gói bài viết</label>
            <select
              className="form-select"
              name="package"
              value={inputValues.packageId}
              onChange={handleOnChangePackage}
            >
              {dataPackage.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
          <FormRow
            type="text"
            name="price"
            labelText="Đơn giá"
            value={`${price} USD`}
            disabled
          />
          <FormRow
            type="number"
            name="amount"
            labelText="Số lượng"
            min="1"
            value={inputValues.amount}
            onChange={handleOnChangeAmount}
          />
          <FormRow
            type="text"
            name="amount"
            labelText="Tổng tiền"
            value={`${total} USD`}
            disabled
          />
        </div>
        <div className="form-center">
          <button
            type="button"
            className="btn btn-block form-btn"
            onClick={handleBuy}
            disabled={isLoading || !inputValues.packageId}
          >
            {isLoading ? "Đang xử lý..." : "Mua"}
          </button>
        </div>
      </Form>
    </Wrapper>
  );
};

export default BuyPost;
