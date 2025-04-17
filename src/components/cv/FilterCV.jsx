import React from "react";
import { useEffect, useState } from "react";

import { PAGINATION } from "../../constants/paginationConstant";

import { getFilterCv } from "../../services/cvService";
import {
  getAllSkillByJobCode,
  getDetailCompanyByUserId,
} from "../../services/userService";
import { useFetchAllcode } from "../../utils/fetchAllCode";
import { Col, Row, Select, Modal } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";

import { Link, useNavigate } from "react-router-dom";

import Wrapper from "../../assets/wrappers/DashboardFormPage";
import FilterCvWrapper from "../../assets/wrappers/FilterCvWrapper";
const { confirm } = Modal;

const FilterCV = () => {
  const [dataCv, setdataCv] = useState([]);
  const [count, setCount] = useState("");
  const [numberPage, setnumberPage] = useState("");
  const [isFirstTime, setIsFirstTime] = useState(true);
  const [inputValue, setInputValue] = useState({
    categoryJobCode: "",
    experienceJobCode: "",
    listSkills: [],
    provinceCode: "",
    salaryCode: "",
  });
  const [listSkills, setListSkills] = useState([]);
  const [isHiddenPercent, setIsHiddenPercent] = useState(true);
  const [companySeeAllow, setCompanySeeAllow] = useState({
    free: 0,
    notFree: 0,
  });

  let fetchCompany = async (userId, companyId = null) => {
    let res = await getDetailCompanyByUserId(userId, companyId);
    if (res) {
      setCompanySeeAllow({
        free: res.data.allowCvFree,
        notFree: res.data.allowCV,
      });
    }
  };

  const navigate = useNavigate();

  const confirmSeeCandiate = (id) => {
    confirm({
      title: "Khi xem bạn sẽ mất 1 lần xem thông tin ứng viên",
      icon: <ExclamationCircleOutlined />,
      onOk() {
        navigate(`/admin/candiate/${id}/`);
      },

      onCancel() {},
    });
  };

  let fetchData = async () => {
    let listSkills = [];
    let otherSkills = [];
    inputValue.listSkills.forEach((item) => {
      if (typeof item === "number") {
        listSkills.push(item);
      } else {
        otherSkills.push(item);
      }
    });
    let arrData = await getFilterCv({
      limit: PAGINATION.pagerow,
      offset: 0,
      categoryJobCode: inputValue.categoryJobCode,
      experienceJobCode: inputValue.experienceJobCode,
      salaryCode: inputValue.salaryCode,
      provinceCode: inputValue.provinceCode,
      listSkills: listSkills,
      otherSkills: otherSkills,
    });
    if (arrData) {
      console.log("arrData CV", arrData.result);
      setdataCv(arrData.result.data);
      setIsHiddenPercent(arrData.result.isHiddenPercent);
      setCount(Math.ceil(arrData.count / PAGINATION.pagerow));
    }
  };

  useEffect(() => {
    try {
      let userData = JSON.parse(localStorage.getItem("user"));
      fetchData();
      if (isFirstTime) {
        fetchCompany(userData.id, userData.companyId);
        setIsFirstTime(false);
      }
    } catch (error) {
      console.log(error);
    }
  }, [inputValue]);

  let { data: dataProvince } = useFetchAllcode("PROVINCE");
  let { data: dataExp } = useFetchAllcode("EXPTYPE");
  let { data: dataSalary } = useFetchAllcode("SALARYTYPE");
  let { data: dataJobType } = useFetchAllcode("JOBTYPE");

  dataProvince = dataProvince.map((item) => ({
    value: item.code,
    label: item.value,
    type: "provinceCode",
  }));

  dataExp = dataExp.map((item) => ({
    value: item.code,
    label: item.value,
    type: "experienceJobCode",
  }));

  dataSalary = dataSalary.map((item) => ({
    value: item.code,
    label: item.value,
    type: "salaryCode",
  }));

  dataJobType = dataJobType.map((item) => ({
    value: item.code,
    label: item.value,
    type: "categoryJobCode",
  }));

  const handleChange = async (value, detail, type) => {
    if (!value && !detail) {
      setInputValue({
        ...inputValue,
        [type]: "",
      });
    }
    if (Array.isArray(detail)) {
      setInputValue({
        ...inputValue,
        listSkills: value,
      });
    } else {
      if (detail.type === "categoryJobCode") {
        let res = await getAllSkillByJobCode(value);
        let listSkills = res.data.map((item) => ({
          value: item.id,
          label: item.name,
        }));
        setListSkills(listSkills);
        setInputValue({
          ...inputValue,
          [detail.type]: value,
          listSkills: [],
        });
      } else {
        setInputValue({
          ...inputValue,
          [detail.type]: value,
        });
      }
    }
  };

  let handleChangePage = async (number) => {
    setnumberPage(number.selected);
    let arrData = await getFilterCv({
      limit: PAGINATION.pagerow,
      offset: number.selected * PAGINATION.pagerow,
      categoryJobCode: inputValue.categoryJobCode,
      experienceJobCode: inputValue.experienceJobCode,
      listSkills: inputValue.listSkills,
    });
    if (arrData) {
      setdataCv(arrData.data);
    }
  };

  const getMatchRateClass = (rate) => {
    const percentage = +rate.split("%")[0];

    if (percentage >= 70) return "match-rate match-rate-high";
    if (percentage > 30) return "match-rate match-rate-medium";
    return "match-rate match-rate-low";
  };

  const getStatusClass = (isChecked) => {
    return isChecked === 0
      ? "status-badge status-unseen"
      : "status-badge status-seen";
  };

  const getEvaluationClass = (rate) => {
    const percentage = +rate.split("%")[0];

    if (percentage >= 70) return "status-badge status-active";
    if (percentage > 30) return "status-badge status-medium";
    return "status-badge status-banned";
  };

  return (
    <Wrapper>
      <h4 className="form-title">Danh sách ứng viên</h4>
      <div>
        <h4
          style={{ fontSize: "14px" }}
          className="form-title"
        >{`Số lượt xem miễn phí: ${companySeeAllow.free}`}</h4>
        <h4
          style={{ fontSize: "14px" }}
          className="form-title"
        >{`Số lượt xem: ${companySeeAllow.notFree}`}</h4>
      </div>
      <div className="form-center">
        <div className="form-row">
          <label className="form-label">Lĩnh vực:</label>
          <Select
            filterOption={(input, option) =>
              (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
            }
            showSearch
            allowClear
            style={{ width: "90%" }}
            size="default"
            onChange={(value, detail) =>
              handleChange(value, detail, "categoryJobCode")
            }
            value={inputValue.categoryJobCode}
            options={dataJobType}
          ></Select>
        </div>
        <div className="form-row">
          <label className="form-label">Kinh nghiệm:</label>
          <Select
            filterOption={(input, option) =>
              (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
            }
            showSearch
            allowClear
            style={{ width: "90%" }}
            size="default"
            onChange={(value, detail) =>
              handleChange(value, detail, "experienceJobCode")
            }
            value={inputValue.experienceJobCode}
            options={dataExp}
          ></Select>
        </div>
        <div className="form-row">
          <label className="form-label">Khoảng lương:</label>
          <Select
            filterOption={(input, option) =>
              (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
            }
            showSearch
            allowClear
            style={{ width: "90%" }}
            size="default"
            onChange={(value, detail) =>
              handleChange(value, detail, "salaryCode")
            }
            value={inputValue.salaryCode}
            options={dataSalary}
          ></Select>
        </div>

        <div className="form-row">
          <label className="form-label">Khu vực làm việc:</label>
          <Select
            filterOption={(input, option) =>
              (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
            }
            showSearch
            allowClear
            style={{ width: "90%" }}
            size="default"
            onChange={(value, detail) =>
              handleChange(value, detail, "provinceCode")
            }
            value={inputValue.provinceCode}
            options={dataProvince}
          ></Select>
        </div>

        <div className="form-row">
          <label className="form-label">Kỹ năng:</label>
          <Select
            disabled={!inputValue.categoryJobCode}
            mode="tags"
            allowClear
            style={{
              width: "100%",
            }}
            placeholder="Chọn kĩ năng của bạn"
            onChange={handleChange}
            options={listSkills}
            value={inputValue.listSkills}
            filterOption={(input, option) =>
              (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
            }
            showSearch
          ></Select>
        </div>
      </div>

      <FilterCvWrapper>
        <div className="jobtype-container">
          <table>
            <thead>
              <tr>
                <th>STT</th>
                <th>Tên ứng viên</th>
                <th>Lĩnh vực</th>
                {!isHiddenPercent && (
                  <>
                    <th>Tỉ lệ phù hợp</th>
                    <th>Đánh giá</th>
                  </>
                )}
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {dataCv.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1 + numberPage * PAGINATION.pagerow}</td>
                  <td>
                    {item.userSettingData.firstName +
                      " " +
                      item.userSettingData.lastName}
                  </td>
                  <td>{item.jobTypeSettingData.value}</td>
                  {!isHiddenPercent && (
                    <>
                      <td>
                        <span className={getMatchRateClass(item.file)}>
                          {item.file}
                        </span>
                      </td>
                      <td>
                        <span className={getEvaluationClass(item.file)}>
                          {+item.file.split("%")[0] >= 70
                            ? "Tốt"
                            : +item.file.split("%")[0] > 30
                            ? "Tạm chấp nhận"
                            : "Tệ"}
                        </span>
                      </td>
                    </>
                  )}

                  <td>
                    <span
                      style={{ color: "#5d87ff", cursor: "pointer" }}
                      onClick={() => confirmSeeCandiate(item.userId)}
                    >
                      Xem chi tiết ứng viên
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <Link
          style={{ fontSize: "14px" }}
          to="/admin/cv/buy-cv"
          className="btn add-user-btn"
        >
          Mua thêm lượt xem ứng viên
        </Link>

        <style jsx>{`
          /* Style chung cho các badge */
          .match-rate,
          .status-badge {
            padding: 4px 12px;
            border-radius: 16px;
            font-size: 12px;
            font-weight: 500;
            display: inline-block;
            min-width: 100px;
            text-align: center;
            border: 1px solid transparent;
          }

          /* Style cho tỉ lệ phù hợp */
          .match-rate-high {
            background-color: #e8f5e9;
            color: #2e7d32;
            border-color: #2e7d32;
          }

          .match-rate-medium {
            background-color: #fff8e1;
            color: #ff8f00;
            border-color: #ff8f00;
          }

          .match-rate-low {
            background-color: #ffebee;
            color: #c62828;
            border-color: #c62828;
          }

          /* Style cho đánh giá */
          .status-active {
            background-color: #e8f5e9;
            color: #2e7d32;
            border-color: #2e7d32;
          }

          .status-medium {
            background-color: #fff8e1;
            color: #ff8f00;
            border-color: #ff8f00;
          }

          .status-banned {
            background-color: #ffebee;
            color: #c62828;
            border-color: #c62828;
          }

          /* Style cho trạng thái */
          .status-seen {
            background-color: #e3f2fd;
            color: #1565c0;
            border-color: #1565c0;
          }

          .status-unseen {
            background-color: #f5f5f5;
            color: #616161;
            border-color: #616161;
          }
        `}</style>
      </FilterCvWrapper>
    </Wrapper>
  );
};

export default FilterCV;
