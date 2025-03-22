import React from "react";
import { Input } from "antd";
import JobItem from "../../components/layout-client/home/JobItem";
import { Link } from "react-router-dom";

const RightPageUser = (props) => {
  console.log("RightPageUser - props:", props); // Kiểm tra props

  // Kiểm tra nếu props.post hoặc props.post.rows không tồn tại
  if (!props.post || !Array.isArray(props.post)) {
    console.error("props.post is not an array:", props.post);
    return null; // Hoặc hiển thị thông báo lỗi
  }

  return (
    <>
      {/* Featured_job_start */}
      <section className="featured-job-area">
        <div className="container">
          {/* Count of Job list Start */}
          <div className="row">
            <div className="col-lg-12">
              <div className="count-job mb-35">
                <span>{props.count} công việc được tìm thấy</span>{" "}
                {/* Hiển thị count */}
                <Input.Search
                  onSearch={props.handleSearch}
                  className="mt-5"
                  placeholder="Nhập tên bài đăng"
                  allowClear
                  enterButton="Tìm kiếm"
                ></Input.Search>
              </div>
            </div>
          </div>
          {/* single-job-content */}
          {props.post.map((data, index) => (
            <Link to={`/detail-job/${data.id}`} key={index}>
              <JobItem key={data.id} data={data} />
            </Link>
          ))}
        </div>
      </section>
      {/* Featured_job_end */}
    </>
  );
};

export default RightPageUser;
