import React from "react";
import moment from "moment";

const JobItem = ({ data }) => {
  const handleSplitTime = (time) => {
    return moment(new Date(+time)).fromNow();
  };
  return (
    <>
      <div className="single-job-items mb-30">
        <div className="job-items">
          <div className="company-img">
            <a href="job_details.html">
              <img
                style={{ width: "85px", height: "85px" }}
                src={data.userPostData.userCompanyData.thumbnail}
              />
            </a>
          </div>
          <div className="job-tittle">
            <a href="job_details.html">
              <h4>{data.postDetailData.name}</h4>
            </a>
            <ul>
              <li>{data.postDetailData.jobLevelPostData.value}</li>
              <li>
                <i className="fas fa-map-marker-alt" />
                {data.postDetailData.provincePostData.value}
              </li>
              <li>{data.postDetailData.salaryTypePostData.value}</li>
            </ul>
          </div>
        </div>
        <div className="items-link f-right">
          <a href="job_details.html">
            {data.postDetailData.workTypePostData.value}
          </a>
          <span>{handleSplitTime(data.timePost)}</span>
        </div>
      </div>
    </>
  );
};

export default JobItem;
