import React from "react";
import JobItem from "./JobItem";

const JobsList = ({ dataFeature }) => {
  // Kiểm tra nếu mảng rỗng
  if (dataFeature.length === 0) {
    return <p>Không có công việc nào được tìm thấy.</p>;
  }

  return (
    <>
      {dataFeature.map((data) => (
        <JobItem key={data.id} data={data} />
      ))}
    </>
  );
};

export default JobsList;
