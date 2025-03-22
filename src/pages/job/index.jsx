import React from "react";
import HeroJob from "../../components/layout-client/HeroJob";
import JobListing from "../../components/job-page-user/JobPageUser";
import PaginationJob from "../../components/layout-client/PaginationJob";

const Job = () => {
  return (
    <>
      <HeroJob />
      <JobListing />
      <PaginationJob />
    </>
  );
};

export default Job;
