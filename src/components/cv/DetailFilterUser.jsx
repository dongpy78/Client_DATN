import React from "react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  showSuccessToast,
  showErrorToast,
} from "../../utils/toastNotifications";

import CommonUtils from "../../utils/CommonUtils";

import {
  getDetailUserById,
  getAllSkillByJobCode,
} from "../../services/userService";
import { checkSeeCandiate } from "../../services/cvService";

import { useFetchAllcode } from "../../utils/fetchAllCode";
import Wrapper from "../../assets/wrappers/DashboardFormPage";

import { Select } from "antd";
import { Buffer } from "buffer"; // Thêm để xử lý Buffer

const DetailFilterUser = () => {
  const [listSkills, setListSkills] = useState([]);
  const [inputValues, setInputValues] = useState({
    jobType: "",
    salary: "",
    skills: [],
    jobProvince: "",
    exp: "",
    file: "",
  });

  const { id } = useParams();

  let getListSkill = async (jobType) => {
    let res = await getAllSkillByJobCode(jobType);
    let listSkills = res.data.map((item) => ({
      value: item.id,
      label: item.name,
    }));
    setListSkills(listSkills);
  };

  let setStateUser = (data) => {
    getListSkill(data.userAccountData.userSettingData.categoryJobCode);
    let listSkills = [];
    if (Array.isArray(data.listSkills) && data.listSkills.length > 0) {
      listSkills = data.listSkills.map((item) => item.SkillId);
    }

    console.log("File data:", data.userAccountData.userSettingData.file);

    const fileFromServer = data.userAccountData.userSettingData.file ?? "";
    let formattedFile;

    if (
      fileFromServer &&
      typeof fileFromServer === "object" &&
      fileFromServer.type === "Buffer" &&
      fileFromServer.data
    ) {
      formattedFile = Buffer.from(fileFromServer.data).toString("utf8");
    } else {
      formattedFile = fileFromServer;
    }

    console.log("Formatted file:", formattedFile);

    setInputValues({
      ...inputValues,
      jobType: data.userAccountData.userSettingData.categoryJobCode,
      salary: data.userAccountData.userSettingData.salaryJobCode,
      skills: listSkills,
      jobProvince: data.userAccountData.userSettingData.addressCode,
      exp: data.userAccountData.userSettingData.experienceJobCode,
      isFindJob: data.userAccountData.userSettingData.isFindJob,
      isTakeMail: data.userAccountData.userSettingData.isTakeMail,
      file: formattedFile,
    });
  };

  useEffect(() => {
    if (id) {
      let fetchUser = async () => {
        let userData = JSON.parse(localStorage.getItem("user"));

        let check = await checkSeeCandiate({
          userId: userData.id,
          companyId: userData.companyId,
        });
        if (check) {
          let user = await getDetailUserById(id);
          if (user) {
            console.log("Data from API:", user.data); // Log toàn bộ dữ liệu từ API
            setStateUser(user.data);
          }
        } else {
          showErrorToast(check.errMessage);
          setTimeout(() => {
            navigate("/admin/list-candiate/");
          }, 1000);
        }
      };
      fetchUser();
    }
  }, [id]);

  // Clean up the blob URL when the component unmounts

  let { data: dataProvince } = useFetchAllcode("PROVINCE");
  let { data: dataExp } = useFetchAllcode("EXPTYPE");
  let { data: dataSalary } = useFetchAllcode("SALARYTYPE");
  let { data: dataJobType } = useFetchAllcode("JOBTYPE");

  dataProvince = dataProvince.map((item) => ({
    value: item.code,
    label: item.value,
  }));

  dataExp = dataExp.map((item) => ({
    value: item.code,
    label: item.value,
  }));

  dataSalary = dataSalary.map((item) => ({
    value: item.code,
    label: item.value,
  }));

  dataJobType = dataJobType.map((item) => ({
    value: item.code,
    label: item.value,
  }));

  const navigate = useNavigate();

  return (
    <Wrapper>
      <h4 className="form-title">Thông tin chi tiết ứng viên</h4>
      <div className="form-center">
        <div className="form-row">
          <label className="form-label">Lĩnh vực:</label>
          <Select
            allowClear
            style={{
              width: "100%",
            }}
            placeholder="Chọn lĩnh vực"
            disabled
            options={dataJobType}
            value={inputValues.jobType}
          ></Select>
        </div>
        <div className="form-row">
          <label className="form-label">Mức lương:</label>
          <Select
            allowClear
            style={{
              width: "100%",
            }}
            placeholder="Chọn mức lương"
            disabled
            options={dataSalary}
            value={inputValues.salary}
          ></Select>
        </div>
        <div className="form-row">
          <label className="form-label">Kỹ năng:</label>
          <Select
            disabled
            mode="multiple"
            allowClear
            style={{
              width: "calc(100% + 115px)",
            }}
            placeholder="Chọn kĩ năng của bạn"
            options={listSkills}
            value={inputValues.skills}
          ></Select>
        </div>
        <div className="form-row">
          <label className="form-label">Khu vực làm việc:</label>
          <Select
            allowClear
            style={{
              width: "100%",
            }}
            placeholder="Chọn nơi làm việc"
            disabled
            options={dataProvince}
            value={inputValues.jobProvince}
          ></Select>
        </div>
        <div className="form-row">
          <label className="form-label"> Kinh nghiệm làm việc:</label>

          <Select
            allowClear
            style={{
              width: "100%",
            }}
            placeholder="Chọn khoảng kinh nghiệm"
            disabled
            options={dataExp}
            value={inputValues.exp}
          ></Select>
        </div>
      </div>

      <div className="">
        {inputValues.file ? (
          <iframe
            width="100%"
            height="700px"
            src={inputValues.file}
            title="CV Preview"
          ></iframe>
        ) : (
          <p>Không có file CV để hiển thị</p>
        )}
      </div>
    </Wrapper>
  );
};

export default DetailFilterUser;
