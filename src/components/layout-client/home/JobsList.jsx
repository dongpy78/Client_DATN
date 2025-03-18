import React from "react";
import JobItem from "./JobItem";
import { Link } from "react-router-dom";

const JobsList = ({ dataFeature }) => {
  // Kiểm tra nếu mảng rỗng
  if (dataFeature.length === 0) {
    return <p>Không có công việc nào được tìm thấy.</p>;
  }

  return (
    <>
      {dataFeature.map((data) => (
        <Link to={`/detail-job/${data.id}`}>
          <JobItem key={data.id} data={data} />
        </Link>
      ))}
    </>
  );
};

export default JobsList;
