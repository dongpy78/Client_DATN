import React from "react";
import Wrapper from "../../../assets/wrappers/DashboardFormPage";
import { Form } from "react-router-dom";
import FormRow from "../../../components/admin/FormRow";

const Company = () => {
  return (
    <Wrapper>
      <Form method="post" className="form" encType="multipart/form-data">
        <h4 className="form-title">cập nhật công ty</h4>
        <div className="form-center">
          <FormRow
            type="search"
            name="search"
            labelText="Tên công ty"
            value="Hello, world!"
            placeholder=""
          />
          <FormRow
            type="search"
            name="search"
            labelText="Số điện thoại"
            value="Hello, world!"
            placeholder=""
          />
          <FormRow
            type="search"
            name="search"
            labelText="Mã số thuế "
            value="Hello, world!"
            placeholder=""
          />
          <FormRow
            type="search"
            name="search"
            labelText="Số lượng nhân viên "
            value="Hello, world!"
            placeholder=""
          />
          <FormRow
            type="search"
            name="search"
            labelText="Địa chỉ"
            value="Hello, world!"
            placeholder=""
          />
          <FormRow
            type="search"
            name="search"
            labelText="Link website"
            value="Hello, world!"
            placeholder=""
          />
          <div className="form-row">
            <label htmlFor="image" className="form-label">
              Select an image file (max 0.5 MB):
            </label>
            <input
              type="file"
              id="avatar"
              name="avatar"
              className="form-input form-select-image"
              accept="image/*"
            />
          </div>
          <div className="form-row">
            <label htmlFor="image" className="form-label">
              Select an image file (max 0.5 MB):
            </label>
            <input
              type="file"
              id="avatar"
              name="avatar"
              className="form-input form-select-image"
              accept="image/*"
            />
          </div>
          <div className="form-row">
            <label htmlFor="image" className="form-label">
              Select an image file (max 0.5 MB):
            </label>
            <input
              type="file"
              id="avatar"
              name="avatar"
              className="form-input form-select-image"
              accept="image/*"
            />
          </div>
        </div>
      </Form>
    </Wrapper>
  );
};

export default Company;
