import React from "react";
import JobItem from "./JobItem";
import { Link } from "react-router-dom";

const JobsList = ({ dataFeature }) => {
  // Kiểm tra nếu mảng rỗng
  if (dataFeature.length === 0) {
    return <p>Không có công việc nào được tìm thấy.</p>;
  }

  return (
    <div className="row">
      {/* Cột 1 - chứa nửa đầu danh sách */}
      <div className="col-md-6">
        {dataFeature.slice(0, Math.ceil(dataFeature.length / 2)).map((data) => (
          <Link key={data.id} to={`/detail-job/${data.id}`}>
            <JobItem data={data} />
          </Link>
        ))}
      </div>

      {/* Cột 2 - chứa nửa sau danh sách */}
      <div className="col-md-6">
        {dataFeature.slice(Math.ceil(dataFeature.length / 2)).map((data) => (
          <Link key={data.id} to={`/detail-job/${data.id}`}>
            <JobItem data={data} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default JobsList;
