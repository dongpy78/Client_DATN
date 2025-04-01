import React, { useEffect, useState } from "react";
import moment from "moment";
import { DatePicker } from "antd";
import HistoryTradePostWrapper from "../../assets/wrappers/HistoryTradePostWrapper";
import {
  showSuccessToast,
  showErrorToast,
} from "../../utils/toastNotifications";
import CommonUtils from "../../utils/CommonUtils";
import { getHistoryTradePost } from "../../services/userService";
import { PAGINATION } from "../../constants/paginationConstant";
import PagePagination from "../admin/PagePagination";

const HistoryTradePost = () => {
  const { RangePicker } = DatePicker;
  const [user, setUser] = useState(null);
  const [fromDatePost, setFromDatePost] = useState("");
  const [toDatePost, setToDatePost] = useState("");
  const [data, setData] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1); // Changed to start from 1 to match PagePagination

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = JSON.parse(localStorage.getItem("user"));
        if (userData) {
          setUser(userData);
          const params = {
            limit: PAGINATION.pagerow,
            offset: 0,
            fromDate: "",
            toDate: "",
            companyId: userData.companyId,
          };
          const arrData = await getHistoryTradePost(params);
          if (arrData && arrData.errCode === 0) {
            setData(arrData.data);
            setTotalCount(arrData.count);
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        showErrorToast("Failed to load data");
      }
    };

    fetchData();
  }, []);

  const onDatePicker = async (values) => {
    try {
      let fromDate = "";
      let toDate = "";
      if (values) {
        fromDate = values[0].format("YYYY-MM-DD");
        toDate = values[1].format("YYYY-MM-DD");
      }
      const params = {
        limit: PAGINATION.pagerow,
        offset: 0,
        fromDate,
        toDate,
        companyId: user?.companyId,
      };
      const arrData = await getHistoryTradePost(params);
      if (arrData && arrData.errCode === 0) {
        setData(arrData.data);
        setTotalCount(arrData.count);
      }
      setFromDatePost(fromDate);
      setToDatePost(toDate);
      setCurrentPage(1); // Reset to first page when filtering
    } catch (error) {
      console.error("Error filtering data:", error);
      showErrorToast("Failed to filter data");
    }
  };

  const handlePageChange = async (pageNumber) => {
    try {
      setCurrentPage(pageNumber);
      const params = {
        limit: PAGINATION.pagerow,
        offset: (pageNumber - 1) * PAGINATION.pagerow, // Adjust offset calculation
        fromDate: fromDatePost,
        toDate: toDatePost,
        companyId: user?.companyId,
      };
      const arrData = await getHistoryTradePost(params);
      if (arrData && arrData.errCode === 0) {
        setData(arrData.data);
      }
    } catch (error) {
      console.error("Error changing page:", error);
      showErrorToast("Failed to change page");
    }
  };

  const handleOnClickExport = async () => {
    try {
      const params = {
        limit: "",
        offset: "",
        fromDate: fromDatePost,
        toDate: toDatePost,
        companyId: user?.companyId,
      };
      const res = await getHistoryTradePost(params);
      if (res.errCode === 0) {
        const formatData = res.data.map((item) => ({
          "Tên gói": item.packageOrderData.name,
          "Mã giao dịch": item.id,
          "Loại gói":
            item.packageOrderData.isHot == 0
              ? "Loại bình thường"
              : "Loại nổi bật",
          "Số lượng mua": item.amount,
          "Đơn giá": `${item.packageOrderData.price} USD`,
          "Tên người mua": `${item.userOrderData.firstName} ${item.userOrderData.lastName}`,
          "Thời gian mua": moment(item.createdAt).format("DD-MM-YYYY HH:mm:ss"),
        }));
        await CommonUtils.exportExcel(
          formatData,
          "History Trade Post",
          "History Trade Post"
        );
      }
    } catch (error) {
      console.error("Error exporting data:", error);
      showErrorToast("Failed to export data");
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <HistoryTradePostWrapper>
      <h5 className="title-list-job">Lịch sử thanh toán các gói bài đăng</h5>

      <div style={{ marginBottom: "20px" }}>
        <RangePicker onChange={onDatePicker} />
        <button
          onClick={handleOnClickExport}
          style={{
            marginLeft: "10px",
            padding: "5px 15px",
            backgroundColor: "#4B49AC",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Export Excel
        </button>
      </div>

      <div className="jobtype-container">
        <table>
          <thead>
            <tr>
              <th>STT</th>
              <th>Tên gói</th>
              <th>Mã giao dịch</th>
              <th>Loại gói</th>
              <th>Số lượng đã mua</th>
              <th>Đơn giá</th>
              <th>Người mua</th>
              <th>Thời gian mua</th>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map((item, index) => (
                <tr key={item.id}>
                  <td>{index + 1 + (currentPage - 1) * PAGINATION.pagerow}</td>
                  <td>{item.packageOrderData?.name || "N/A"}</td>
                  <td>{item.id}</td>
                  <td>
                    {item.packageOrderData?.isHot == 0
                      ? "Loại bình thường"
                      : "Loại nổi bật"}
                  </td>
                  <td>{item.amount}</td>
                  <td style={{ textAlign: "right" }}>
                    {item.packageOrderData?.price || 0} USD
                  </td>
                  <td>
                    {item.userOrderData?.firstName || ""}{" "}
                    {item.userOrderData?.lastName || ""}
                  </td>
                  <td>
                    {moment(item.createdAt).format("DD-MM-YYYY HH:mm:ss")}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" style={{ textAlign: "center" }}>
                  Không có dữ liệu
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {totalCount > PAGINATION.pagerow && (
        <PagePagination
          numOfPages={Math.ceil(totalCount / PAGINATION.pagerow)}
          currentPage={currentPage}
          handlePageChange={handlePageChange}
        />
      )}
    </HistoryTradePostWrapper>
  );
};

export default HistoryTradePost;
