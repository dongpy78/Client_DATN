import React from "react";

const BlogAreaAbout = () => {
  return (
    <>
      {/* Blog Area Start */}
      <div className="home-blog-area blog-h-padding">
        <div className="container">
          {/* Section Tittle */}
          <div className="row">
            <div className="col-lg-12">
              <div className="section-tittle text-center">
                <span>Our latest blog</span>
                <h2>Our recent news</h2>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-xl-6 col-lg-6 col-md-6">
              <div className="home-blog-single mb-30">
                <div className="blog-img-cap">
                  <div className="blog-img">
                    <img src="assets/img/blog/home-blog1.jpg" alt="" />
                    {/* Blog date */}
                    <div className="blog-date text-center">
                      <span>24</span>
                      <p>Now</p>
                    </div>
                  </div>
                  <div className="blog-cap">
                    <p>| Properties</p>
                    <h3>
                      <a href="single-blog.html">
                        Footprints in Time is perfect House in Kurashiki
                      </a>
                    </h3>
                    <a href="#" className="more-btn">
                      Read more »
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-6 col-lg-6 col-md-6">
              <div className="home-blog-single mb-30">
                <div className="blog-img-cap">
                  <div className="blog-img">
                    <img src="assets/img/blog/home-blog2.jpg" alt="" />
                    {/* Blog date */}
                    <div className="blog-date text-center">
                      <span>24</span>
                      <p>Now</p>
                    </div>
                  </div>
                  <div className="blog-cap">
                    <p>| Properties</p>
                    <h3>
                      <a href="single-blog.html">
                        Footprints in Time is perfect House in Kurashiki
                      </a>
                    </h3>
                    <a href="#" className="more-btn">
                      Read more »
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Blog Area End */}
    </>
  );
};

export default BlogAreaAbout;
