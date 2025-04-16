import React, { useEffect, useState } from "react";
import { DatePicker } from "antd";
import { PieChart } from "react-minimal-pie-chart";

import {
  showSuccessToast,
  showErrorToast,
} from "../../utils/toastNotifications";

import WrapperStatsContainer from "../../assets/wrappers/StatsContainer";
import WrapperChartsContainer from "../../assets/wrappers/ChartsContainer";
import HistoryTradePostWrapper from "../../assets/wrappers/HistoryTradePostWrapper";

import { PAGINATION } from "../../constants/paginationConstant";

import CommonUtils from "../../utils/CommonUtils";
import {
  getStatisticalTypePost,
  getStatisticalPackageCv,
} from "../../services/userService";
import { getStatisticalCv } from "../../services/cvService";

const AdminDashboardCompany = () => {
  const { RangePicker } = DatePicker;
  const today = new Date();
  const yyyy = today.getFullYear();
  let mm = today.getMonth() + 1; // Months start at 0!
  let dd = today.getDate();
  if (dd < 10) dd = "0" + dd;
  if (mm < 10) mm = "0" + mm;
  const formattedToday = yyyy + "-" + mm + "-" + dd;

  const [user, setUser] = useState({});
  const [dataSum, setDataSum] = useState(0);
  const [dataCv, setDataCv] = useState([]);
  const [count, setCount] = useState("");

  const [dataStatisticalTypePost, setDataStatisticalTypePost] = useState([]);

  let sendParams = {
    limit: PAGINATION.pagerow,
    offset: 0,
    fromDate: formattedToday,
    toDate: formattedToday,
    companyId: user.companyId,
  };

  const onDatePicker = async (values) => {
    try {
      const userData = JSON.parse(localStorage.getItem("user")) || {};
      let fromDate = formattedToday;
      let toDate = formattedToday;

      if (values) {
        fromDate = values[0].format("YYYY-MM-DD");
        toDate = values[1].format("YYYY-MM-DD");
      }

      if (userData.roleCode !== "Admin") {
        const params = {
          limit: PAGINATION.pagerow,
          offset: 0,
          fromDate,
          toDate,
          companyId: userData.companyId, // Sử dụng trực tiếp từ userData
        };

        console.log("Fetching CV with params:", params);
        const response = await getStatisticalCv(params);
        console.log("API Response:", response);

        // Xử lý cả 2 trường hợp cấu trúc API
        const receivedData = response?.result?.data || response?.data || [];
        const receivedCount = response?.result?.count || response?.count || 0;

        setDataCv(receivedData);
        setCount(Math.ceil(receivedCount / PAGINATION.pagerow));

        if (receivedData.length === 0) {
          showErrorToast("Không có dữ liệu CV trong khoảng thời gian này");
        }
      }
    } catch (error) {
      console.error("Error fetching CV data:", error);
      showErrorToast("Lỗi khi tải dữ liệu CV");
      setDataCv([]);
    }
  };

  const getData = async (limit) => {
    let res = await getStatisticalTypePost(limit);
    console.log("Statistical", res);
    let other = res.data.totalPost;
    let otherPercent = 100;
    let color = ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF"];
    if (res) {
      let newdata = res.data.map((item, index) => {
        other -= item.amount;
        otherPercent -=
          Math.round((item.amount / res.totalPost) * 100 * 100) / 100;
        return {
          title: item.postDetailData.jobTypePostData.value,
          value: Math.round((item.amount / res.totalPost) * 100 * 100) / 100,
          color: color[index],
          amount: item.amount,
        };
      });
      console.log("New data: ", newdata);
      if (other > 0) {
        newdata.push({
          title: "Lĩnh vực khác",
          value: Math.round(otherPercent * 100) / 100,
          color: color[4],
          amount: other,
        });
      }
      setDataStatisticalTypePost(newdata);
    } else showErrorToast(res.message);
  };

  useEffect(() => {
    const fetchData = async () => {
      const userData = JSON.parse(localStorage.getItem("user")) || {};
      setUser(userData);
      await getData(4);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchCvData = async () => {
      try {
        const userData = JSON.parse(localStorage.getItem("user")) || {};
        console.log("Current user data:", userData); // Kiểm tra user data

        if (userData.roleCode !== "Admin" && userData.companyId) {
          const params = {
            limit: PAGINATION.pagerow,
            offset: 0,
            fromDate: formattedToday,
            toDate: formattedToday,
            companyId: userData.companyId, // Sử dụng trực tiếp từ userData
          };

          console.log("Request params:", params); // Kiểm tra params gửi đi
          const response = await getStatisticalCv(params);
          console.log("Full API response:", response); // Kiểm tra toàn bộ response

          // Xử lý cả 2 trường hợp cấu trúc API
          const receivedData = response?.result?.data || response?.data || [];
          const receivedCount = response?.result?.count || response?.count || 0;

          console.log("Processed data:", receivedData); // Kiểm tra dữ liệu đã xử lý
          setDataCv(receivedData);
          setCount(Math.ceil(receivedCount / PAGINATION.pagerow));
        }
      } catch (error) {
        console.error("Failed to fetch CV data:", error);
      }
    };

    fetchCvData();
  }, []); // Chỉ chạy 1 lần khi mount

  return (
    <WrapperChartsContainer>
      <h4 style={{ textAlign: "left", fontWeight: "bold" }}>
        Xin chào {user.firstName + " " + user.lastName}
      </h4>
      <h4 style={{ textAlign: "left" }}>Biểu đồ thống kê top lĩnh vực</h4>
      {dataStatisticalTypePost.length > 0 ? (
        <WrapperStatsContainer>
          <div>
            {dataStatisticalTypePost.map((item, index) => (
              <div
                key={`${item.title}-${index}`}
                style={{ marginBottom: "10px", marginTop: "1rem" }}
              >
                <div
                  style={{
                    width: "50px",
                    backgroundColor: item.color,
                    height: "20px",
                  }}
                ></div>
                <span
                  className="statis-field"
                  style={{
                    marginTop: "0.5rem",
                    display: "block",
                    textAlign: "left",
                  }}
                >
                  {item.title}: {item.amount} bài
                </span>
              </div>
            ))}
          </div>
          <div style={{ width: "300px", height: "300px" }}>
            <PieChart
              data={dataStatisticalTypePost}
              label={({ dataEntry }) => `${dataEntry.value.toFixed(2)}%`}
              labelStyle={{
                fontSize: "5px",
                fill: "#000",
                fontWeight: "bold",
              }}
              labelPosition={60}
              animate
            />
          </div>
        </WrapperStatsContainer>
      ) : (
        <p>No data available to display the chart.</p>
      )}

      <HistoryTradePostWrapper>
        <h4 style={{ textAlign: "left" }} className="title-list-job">
          Bảng thống kê số lượng CV
        </h4>
        <div style={{ marginBottom: "20px", textAlign: "left" }}>
          <RangePicker
            onChange={(values) => onDatePicker(values)}
            format={"DD/MM/YYYY"}
          ></RangePicker>
        </div>

        <div className="jobtype-container">
          <table>
            <thead>
              <tr>
                <th>STT</th>
                <th>Tên bài viết</th>
                <th>Mã bài viết</th>
                <th>Người viết</th>
                <th>Số lượng CV</th>
              </tr>
            </thead>
            <tbody>
              {dataCv?.length > 0 ? (
                dataCv.map((item, index) => (
                  <tr key={item.id}>
                    <td>{index + 1}</td>
                    <td>{item?.postDetailData?.name || "N/A"}</td>
                    <td>{item.id}</td>
                    <td>
                      {item?.userPostData?.firstName}{" "}
                      {item?.userPostData?.lastName}
                    </td>
                    <td>{item.total || 0}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" style={{ textAlign: "center" }}>
                    Không có dữ liệu
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </HistoryTradePostWrapper>
    </WrapperChartsContainer>
  );
};

export default AdminDashboardCompany;
