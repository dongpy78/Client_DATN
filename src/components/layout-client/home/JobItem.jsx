import React from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import "moment/locale/vi"; // Luôn import trước
moment.locale("vi");
const JobItem = ({ data }) => {
  const handleSplitTime = (time) => {
    console.log("TimePost value:", time); // Kiểm tra giá trị
    if (!time) return "Vừa xong"; // Fallback nếu time không hợp lệ
    return moment(new Date(+time)).fromNow(); // Đã set locale ở trên
  };
  return (
    <>
      <div className="single-job-items mb-30">
        <div className="job-items">
          <div className="company-img">
            <Link href="job_details.html">
              <img
                style={{ width: "85px", height: "85px" }}
                src={data.userPostData.userCompanyData.thumbnail}
              />
            </Link>
          </div>
          <div className="job-tittle">
            <Link href="job_details.html">
              <h4>{data.postDetailData.name}</h4>
            </Link>
            <ul className="job-list-single">
              <li>{data.postDetailData.jobLevelPostData.value}</li>
              <li>
                <i className="fas fa-map-marker-alt" />
                {data.postDetailData.provincePostData.value}
              </li>
              <li>{data.postDetailData.salaryTypePostData.value}</li>
            </ul>
          </div>
        </div>
        <div className="items-link items-link-test f-right">
          <Link href="job_details.html">
            {data.postDetailData.workTypePostData.value}
          </Link>
          <span className="time-post-ago">
            {handleSplitTime(data.timePost)}
          </span>
        </div>
      </div>
    </>
  );
};

export default JobItem;
