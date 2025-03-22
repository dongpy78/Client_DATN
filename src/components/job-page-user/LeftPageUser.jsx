import React from "react";
import { useFetchAllcode } from "../../utils/fetchAllCode";

const LeftPageUser = (props) => {
  const { data: dataJobType } = useFetchAllcode("JOBTYPE");
  const { data: dataJobLevel } = useFetchAllcode("JOBLEVEL");
  const { data: dataSalaryType } = useFetchAllcode("SALARYTYPE");
  const { data: dataExpType } = useFetchAllcode("EXPTYPE");
  const { data: dataWorkType } = useFetchAllcode("WORKTYPE");
  const { data: dataJobLocation } = useFetchAllcode("PROVINCE");

  return (
    <>
      {/* Left content */}
      <div className="col-xl-3 col-lg-3 col-md-4">
        <div className="row">
          <div className="col-12">
            <div className="small-section-tittle2 mb-45">
              <div className="ion">
                {" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  width="20px"
                  height="12px"
                >
                  <path
                    fillRule="evenodd"
                    fill="rgb(27, 207, 107)"
                    d="M7.778,12.000 L12.222,12.000 L12.222,10.000 L7.778,10.000 L7.778,12.000 ZM-0.000,-0.000 L-0.000,2.000 L20.000,2.000 L20.000,-0.000 L-0.000,-0.000 ZM3.333,7.000 L16.667,7.000 L16.667,5.000 L3.333,5.000 L3.333,7.000 Z"
                  />
                </svg>
              </div>
              <h4>Lọc công việc</h4>
            </div>
          </div>
        </div>
        {/* Job Category Listing start */}
        <div className="job-category-listing mb-50">
          {/* single one */}
          <div className="single-listing">
            <div className="small-section-tittle2">
              <h4>Lĩnh vực</h4>
            </div>
            {/* Select job items start */}
            <div className="select-job-items2">
              <select
                name="select"
                onChange={(e) => {
                  props.recieveJobType(e.target.value);
                }}
              >
                <option value="">Tất cả</option>
                {dataJobType.map((data, index) => (
                  <option value={data.code} key={index}>
                    {data.value}
                  </option>
                ))}
              </select>
            </div>
            {/*  Select job items End*/}
            {/* select-Categories start */}
            <div className="select-Categories pt-80 pb-50">
              <div className="small-section-tittle2">
                <h4>Hình thức làm việc</h4>
              </div>
              {dataWorkType.map((data, index) => (
                <label className="container" key={index}>
                  {data.value}
                  <input
                    type="checkbox"
                    value={data.code}
                    onChange={(e) => {
                      props.worktype(e.target.value);
                    }}
                  />
                  <span className="checkmark"></span>
                </label>
              ))}
            </div>
            {/* select-Categories End */}
          </div>
          {/* single two */}
          <div className="single-listing">
            <div className="small-section-tittle2">
              <h4>Vị trí</h4>
            </div>
            {/* Select job items start */}
            <div className="select-job-items2">
              <select
                name="select"
                onChange={(e) => {
                  props.recieveLocation(e.target.value);
                }}
              >
                <option value="">Tất cả</option>
                {dataJobLocation.map((data, index) => (
                  <option value={data.code} key={index}>
                    {data.value}
                  </option>
                ))}
              </select>
            </div>
            {/*  Select job items End*/}
            {/* select-Categories start */}
            <div className="select-Categories pt-80 pb-50">
              <div className="small-section-tittle2">
                <h4>Kinh nghiệm làm việc</h4>
              </div>
              {dataExpType.map((data, index) => (
                <label className="container" key={index}>
                  {data.value}
                  <input
                    type="checkbox"
                    value={data.code}
                    onChange={(e) => props.recieveExp(e.target.value)}
                  />
                  <span className="checkmark"></span>
                </label>
              ))}
            </div>
            {/* select-Categories End */}
          </div>
          {/* single three */}
          <div className="single-listing">
            {/* select-Categories start */}
            <div className="select-Categories pb-50">
              <div className="small-section-tittle2">
                <h4>Cấp bậc</h4>
              </div>
              {dataJobLevel.map((data, index) => (
                <label className="container" key={index}>
                  {data.value}
                  <input
                    type="checkbox"
                    value={data.code}
                    onChange={(e) => {
                      props.recieveJobLevel(e.target.value);
                    }}
                  />
                  <span className="checkmark"></span>
                </label>
              ))}
            </div>
            {/* select-Categories End */}
          </div>

          <div className="single-listing">
            {/* select-Categories start */}
            <div className="select-Categories pb-50">
              <div className="small-section-tittle2">
                <h4>Mức lương</h4>
              </div>
              {dataSalaryType.map((data, index) => (
                <label className="container" key={index}>
                  {data.value}
                  <input
                    type="checkbox"
                    value={data.code}
                    onChange={(e) => {
                      props.recieveSalary(e.target.value);
                    }}
                  />
                  <span className="checkmark"></span>
                </label>
              ))}
            </div>
            {/* select-Categories End */}
          </div>
        </div>
        {/* Job Category Listing End */}
      </div>
    </>
  );
};

export default LeftPageUser;
