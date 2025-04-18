import React from "react";
import moment from "moment";
import { Link } from "react-router-dom";

const JobItem = ({ data }) => {
  const handleSplitTime = (time) => {
    return moment(new Date(+time)).fromNow();
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
        <div className="items-link f-right">
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
