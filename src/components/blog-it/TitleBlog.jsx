import React from "react";
import "./blog.css";

const TitleBlog = () => {
  return (
    <>
      <div className="page-title" data-aos="fade">
        <div className="container">
          <nav className="breadcrumbs">
            <ol>
              <li>
                <a href="index.html">Home</a>
              </li>
              <li className="current">Blog</li>
            </ol>
          </nav>
          <h1>Blog</h1>
        </div>
      </div>
    </>
  );
};

export default TitleBlog;
