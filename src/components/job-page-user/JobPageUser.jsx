import React, { useEffect, useState } from "react";
import LeftPageUser from "./LeftPageUser";
import RightPageUser from "./RightPageUser";
import ReactPaginate from "react-paginate";
import { PAGINATION } from "../../constants/paginationConstant";

import { getListPostService } from "../../services/userService";
import CommonUtils from "../../utils/CommonUtils";
import "./pagination.css";

const JobPageUser = () => {
  const [countPage, setCountPage] = useState(1);
  const [post, setPost] = useState([]);
  const [count, setCount] = useState(0);
  const [numberPage, setNumberPage] = useState("");
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(PAGINATION.pagerow);

  const [workType, setWorkType] = useState([]);
  const [jobType, setJobType] = useState("");
  const [salary, setSalary] = useState([]);
  const [exp, setExp] = useState([]);
  const [jobLevel, setJobLevel] = useState([]);
  const [jobLocation, setJobLocation] = useState("");
  const [search, setSearch] = useState("");

  let loadPost = async (limit, offset, sortName = "") => {
    let params = {
      limit: limit,
      offset: offset,
      categoryJobCode: jobType,
      addressCode: jobLocation,
      salaryJobCode: salary,
      categoryJoblevelCode: jobLevel,
      categoryWorktypeCode: workType,
      experienceJobCode: exp,
      sortName: sortName,
      search: CommonUtils.removeSpace(search),
    };

    let arrData = await getListPostService(params);

    if (arrData) {
      setPost(arrData.data.rows); // Đảm bảo arrData.data.rows là một mảng
      setCountPage(Math.ceil(arrData.data.count / limit));
      setCount(arrData.data.count);
    }
  };

  const handleSearch = (value) => {
    setSearch(value);
  };
  const recieveWorkType = (data) => {
    setWorkType((prev) => {
      let isCheck = workType.includes(data);
      if (isCheck) return workType.filter((item) => item !== data);
      else return [...prev, data];
    });
  };

  const recieveSalary = (data) => {
    setSalary((prev) => {
      let isCheck = salary.includes(data);
      if (isCheck) return salary.filter((item) => item !== data);
      else return [...prev, data];
    });
  };

  const recieveExp = (data) => {
    setExp((prev) => {
      let isCheck = exp.includes(data);
      if (isCheck) return exp.filter((item) => item !== data);
      else return [...prev, data];
    });
  };

  const recieveJobType = (data) => {
    jobType === data ? setJobType("") : setJobType(data);
  };

  const recieveJobLevel = (data) => {
    setJobLevel((prev) => {
      let isCheck = jobLevel.includes(data);
      if (isCheck) return jobLevel.filter((item) => item !== data);
      else return [...prev, data];
    });
  };

  const recieveLocation = (data) => {
    jobLocation === data ? setJobLocation("") : setJobLocation(data);
  };

  useEffect(() => {
    let filterdata = async () => {
      let params = {
        limit: limit,
        offset: offset,
        categoryJobCode: jobType,
        addressCode: jobLocation,
        salaryJobCode: salary,
        categoryJoblevelCode: jobLevel,
        categoryWorktypeCode: workType,
        experienceJobCode: exp,
        search: CommonUtils.removeSpace(search),
      };
      let arrData = await getListPostService(params);

      console.log("API Response:", arrData); // Kiểm tra dữ liệu trả về từ API
      if (arrData) {
        setNumberPage(0);
        setOffset(0);
        setPost(arrData.data.rows || []); // Đảm bảo arrData.data.rows là một mảng
        setCountPage(Math.ceil(arrData.data.count / limit));
        setCount(arrData.data.count);
      }
    };
    filterdata();
  }, [
    workType,
    jobLevel,
    exp,
    jobType,
    jobLocation,
    salary,
    search,
    limit,
    offset,
  ]);

  const handleChangePage = (number) => {
    setNumberPage(number.selected);
    loadPost(limit, number.selected * limit, ""); // Thêm giá trị sortName
    setOffset(number.selected * limit);
  };

  return (
    <>
      {/* Job List Area Start */}
      <div className="job-listing-area pt-120 pb-120">
        <div className="container">
          <div className="row">
            <LeftPageUser
              worktype={recieveWorkType}
              recieveSalary={recieveSalary}
              recieveExp={recieveExp}
              recieveJobType={recieveJobType}
              recieveJobLevel={recieveJobLevel}
              recieveLocation={recieveLocation}
            />
            {/* Right content */}
            <div className="col-xl-9 col-lg-9 col-md-8">
              <RightPageUser
                handleSearch={handleSearch}
                count={count}
                post={post}
              />
              <ReactPaginate
                forcePage={numberPage}
                previousLabel={"Quay lại"}
                nextLabel={"Tiếp"}
                breakLabel={"..."}
                pageCount={countPage}
                marginPagesDisplayed={3}
                containerClassName={"pagination justify-content-center pb-3"}
                pageClassName={"page-item"}
                pageLinkClassName={"page-link"}
                previousLinkClassName={"page-link"}
                previousClassName={"page-item"}
                nextClassName={"page-item"}
                nextLinkClassName={"page-link"}
                breakLinkClassName={"page-link"}
                breakClassName={"page-item"}
                activeClassName={"active"}
                onPageChange={handleChangePage}
              />
            </div>
          </div>
        </div>
      </div>
      {/* Job List Area End */}
    </>
  );
};

export default JobPageUser;
