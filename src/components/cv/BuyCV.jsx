import React from "react";
import { useEffect, useState } from "react";

import { getPaymentLinkCv, getAllToSelect } from "../../services/userService";
import {
  showSuccessToast,
  showErrorToast,
} from "../../utils/toastNotifications";
import Wrapper from "../../assets/wrappers/DashboardFormPage";
import FormRow from "../admin/FormRow";
import { Form, useNavigate } from "react-router-dom";

const BuyCV = () => {
  const navigate = useNavigate();
  const [inputValues, setInputValues] = useState({
    amount: 1,
    packageCvId: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [dataPackage, setDataPackage] = useState([]);
  const [price, setPrice] = useState(0);
  const [total, setTotal] = useState(0);

  const handleOnChangePackage = (event) => {
    const { value } = event.target;
    // Ensure we compare the same types (convert value to number if package ids are numbers)
    const item = dataPackage.find(
      (item) => item.id.toString() === value.toString()
    );

    if (!item) {
      showErrorToast("Selected package not found");
      return;
    }

    setPrice(item.price);
    setTotal(item.price * inputValues.amount);
    setInputValues({
      ...inputValues,
      packageCvId: item.id,
    });
  };

  const handleOnChangeAmount = (event) => {
    const value = Math.max(1, parseInt(event.target.value) || 1); // Ensure minimum 1
    setInputValues({
      ...inputValues,
      amount: value,
    });
    setTotal(value * price);
  };

  const handleBuy = async () => {
    if (!inputValues.packageCvId) {
      showErrorToast("Please select a package");
      return;
    }

    setIsLoading(true);
    try {
      const res = await getPaymentLinkCv(
        inputValues.packageCvId,
        inputValues.amount
      );
      if (res && res.link) {
        const data = {
          packageCvId: inputValues.packageCvId,
          amount: inputValues.amount,
          userId: JSON.parse(localStorage.getItem("user")).id,
        };
        localStorage.setItem("orderCvData", JSON.stringify(data));
        window.location.href = res.link;
      } else {
        showErrorToast(res?.errMessage || "Failed to get payment link");
      }
    } catch (error) {
      showErrorToast("An error occurred while processing your request");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchPackageCv = async () => {
    try {
      const res = await getAllToSelect();
      if (res?.data?.length > 0) {
        setDataPackage(res.data);
        setInputValues({
          ...inputValues,
          packageCvId: res.data[0].id,
        });
        setPrice(res.data[0].price);
        setTotal(res.data[0].price * inputValues.amount);
      }
    } catch (error) {
      showErrorToast("Failed to load packages");
    }
  };

  useEffect(() => {
    fetchPackageCv();
  }, []);

  return (
    <Wrapper>
      <Form className="form">
        <h4 className="form-title">Mua lượt tìm ứng viên</h4>
        <div className="form-center">
          <div className="form-row">
            <label className="form-label">Các gói tìm ứng viên</label>
            <select
              className="form-select"
              name="typePost"
              value={inputValues.packageCvId}
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
            disabled={isLoading || !inputValues.packageCvId}
          >
            {isLoading ? "Processing..." : "Mua"}
          </button>
        </div>
      </Form>
    </Wrapper>
  );
};

export default BuyCV;
