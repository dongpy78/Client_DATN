import React, { useEffect, useState, useCallback } from "react";
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
  const [currentPage, setCurrentPage] = useState(0); // Thay numberPage bằng currentPage cho rõ nghĩa
  const [limit, setLimit] = useState(PAGINATION.pagerow);

  const [workType, setWorkType] = useState([]);
  const [jobType, setJobType] = useState("");
  const [salary, setSalary] = useState([]);
  const [exp, setExp] = useState([]);
  const [jobLevel, setJobLevel] = useState([]);
  const [jobLocation, setJobLocation] = useState("");
  const [search, setSearch] = useState("");

  // Sử dụng useCallback để tránh tạo hàm mới mỗi lần render
  const loadPost = useCallback(
    async (page, sortName = "") => {
      try {
        const offset = page * limit;
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

        if (arrData && arrData.data) {
          setPost(arrData.data.rows || []);
          const totalCount = arrData.data.count || 0;
          setCount(totalCount);
          setCountPage(Math.ceil(totalCount / limit));
        }
      } catch (error) {
        console.error("Error loading posts:", error);
        setPost([]);
        setCount(0);
        setCountPage(1);
      }
    },
    [limit, jobType, jobLocation, salary, jobLevel, workType, exp, search]
  );

  const handleSearch = (value) => {
    setSearch(value);
    setCurrentPage(0); // Reset về trang đầu khi search
  };

  // Các hàm recieve... giữ nguyên
  const recieveWorkType = (data) => {
    setWorkType((prev) => {
      let isCheck = prev.includes(data);
      if (isCheck) return prev.filter((item) => item !== data);
      else return [...prev, data];
    });
    setCurrentPage(0); // Reset về trang đầu khi filter thay đổi
  };

  const recieveSalary = (data) => {
    setSalary((prev) => {
      let isCheck = prev.includes(data);
      if (isCheck) return prev.filter((item) => item !== data);
      else return [...prev, data];
    });
    setCurrentPage(0);
  };

  const recieveExp = (data) => {
    setExp((prev) => {
      let isCheck = prev.includes(data);
      if (isCheck) return prev.filter((item) => item !== data);
      else return [...prev, data];
    });
    setCurrentPage(0);
  };

  const recieveJobType = (data) => {
    setJobType(data === jobType ? "" : data);
    setCurrentPage(0);
  };

  const recieveJobLevel = (data) => {
    setJobLevel((prev) => {
      let isCheck = prev.includes(data);
      if (isCheck) return prev.filter((item) => item !== data);
      else return [...prev, data];
    });
    setCurrentPage(0);
  };

  const recieveLocation = (data) => {
    setJobLocation(data === jobLocation ? "" : data);
    setCurrentPage(0);
  };

  useEffect(() => {
    loadPost(currentPage);
  }, [loadPost, currentPage]);

  const handleChangePage = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };

  return (
    <>
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
            <div className="col-xl-9 col-lg-9 col-md-8">
              <RightPageUser
                handleSearch={handleSearch}
                count={count}
                post={post}
              />
              {countPage > 0 && (
                <ReactPaginate
                  forcePage={currentPage}
                  previousLabel={"Quay lại"}
                  nextLabel={"Tiếp"}
                  breakLabel={"..."}
                  pageCount={countPage}
                  marginPagesDisplayed={2}
                  pageRangeDisplayed={5}
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
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default JobPageUser;
