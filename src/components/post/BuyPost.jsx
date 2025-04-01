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

const BuyPost = () => {
  const navigate = useNavigate();
  const [inputValues, setInputValues] = useState({
    amount: 1,
    packageId: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [dataPackage, setDataPackage] = useState([]);
  const [price, setPrice] = useState(0);
  const [total, setTotal] = useState(0);

  const handleOnChangePackage = (event) => {
    const { value } = event.target;
    let item = dataPackage.find((item) => item.id === value);
    setPrice(item.price);
    setTotal(item.price * inputValues.amount);
    setInputValues({
      ...inputValues,
      packageId: item.id,
    });
  };

  const handleOnChangeAmount = (event) => {
    const { value } = event.target;
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
    setIsLoading(true);
    let res = await getPaymentLink(inputValues.packageId, inputValues.amount);
    if (res.errCode == 0) {
      let data = {
        packageId: inputValues.packageId,
        amount: inputValues.amount,
        userId: JSON.parse(localStorage.getItem("user")).id,
      };
      localStorage.setItem("orderData", JSON.stringify(data));
      window.location.href = res.link;
    } else {
      showErrorToast(res.errMessage);
      setIsLoading(false);
    }
  };

  const fetchPackagePost = async (isHot) => {
    let res = await getPackageByType(isHot);
    setDataPackage(res.data);
    setInputValues({
      ...inputValues,
      isHot: isHot,
      packageId: res.data[0].id,
    });
    setPrice(res.data[0].price);
    setTotal(res.data[0].price * inputValues.amount);
  };

  useEffect(() => {
    fetchPackagePost(0);
  }, []);

  return (
    <Wrapper>
      <Form className="form">
        <h4 className="form-title">Mua lượt đăng bài viết</h4>
        <div className="form-center">
          <div className="form-row">
            <label className="form-label">Loại lượt đăng bài viết</label>
            <select
              className="form-select"
              value={inputValues.isHot}
              name="typePost"
              onChange={(event) => handleOnChangeType(event)}
            >
              <option value={0}>Bài viết bình thường</option>
              <option value={1}>Bài viết nổi bật</option>
            </select>
          </div>
          <div className="form-row">
            <label className="form-label">Các gói bài viết</label>
            <select
              className="form-select"
              value={inputValues.isHot}
              name="typePost"
              onChange={(event) => handleOnChangePackage(event)}
            >
              {dataPackage.map((item, index) => {
                return (
                  <option key={index} value={item.id}>
                    {item.name}
                  </option>
                );
              })}
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
            onClick={() => handleBuy()}
          >
            Mua
          </button>
        </div>
      </Form>
    </Wrapper>
  );
};

export default BuyPost;
