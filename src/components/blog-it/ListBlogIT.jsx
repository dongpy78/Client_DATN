import React from "react";
import "./blog.css";
import TitleBlog from "./TitleBlog";
const ListBlogIT = () => {
  return (
    <>
      <TitleBlog />

      <div className="container">
        <div className="row">
          <div className="col-lg-8">
            {/* Blog Posts Section */}
            <section id="blog-posts" className="section-blog-it">
              <div
                className="container"
                data-aos="fade-up"
                data-aos-delay={100}
              >
                <div className="row gy-4">
                  <div className="col-lg-6">
                    <article>
                      <div className="post-img">
                        <img
                          src="assets/img/blog/blog-post-1.webp"
                          alt=""
                          className="img-fluid"
                        />
                      </div>
                      <h2 className="title">
                        <a href="blog-details.html">
                          Dolorum optio tempore voluptas dignissimos cumque fuga
                          qui quibusdam quia
                        </a>
                      </h2>
                      <div className="meta-top">
                        <ul>
                          <li className="d-flex align-items-center">
                            <i className="bi bi-person" />{" "}
                            <a href="blog-details.html">John Doe</a>
                          </li>
                          <li className="d-flex align-items-center">
                            <i className="bi bi-clock" />{" "}
                            <a href="blog-details.html">
                              <time dateTime="2022-01-01">Jan 1, 2022</time>
                            </a>
                          </li>
                          <li className="d-flex align-items-center">
                            <i className="bi bi-chat-dots" />{" "}
                            <a href="blog-details.html">12 Comments</a>
                          </li>
                        </ul>
                      </div>
                      <div className="content">
                        <p>
                          Similique neque nam consequuntur ad non maxime aliquam
                          quas. Quibusdam animi praesentium. Aliquam et
                          laboriosam eius aut nostrum quidem aliquid dicta..
                        </p>
                        <div className="read-more">
                          <a href="blog-details.html">Read More</a>
                        </div>
                      </div>
                    </article>
                  </div>
                  {/* End post list item */}
                  <div className="col-lg-6">
                    <article>
                      <div className="post-img">
                        <img
                          src="assets/img/blog/blog-post-2.webp"
                          alt=""
                          className="img-fluid"
                        />
                      </div>
                      <h2 className="title">
                        <a href="blog-details.html">
                          Nisi magni odit consequatur autem nulla dolorem
                        </a>
                      </h2>
                      <div className="meta-top">
                        <ul>
                          <li className="d-flex align-items-center">
                            <i className="bi bi-person" />{" "}
                            <a href="blog-details.html">John Doe</a>
                          </li>
                          <li className="d-flex align-items-center">
                            <i className="bi bi-clock" />{" "}
                            <a href="blog-details.html">
                              <time dateTime="2022-01-01">Jan 1, 2022</time>
                            </a>
                          </li>
                          <li className="d-flex align-items-center">
                            <i className="bi bi-chat-dots" />{" "}
                            <a href="blog-details.html">12 Comments</a>
                          </li>
                        </ul>
                      </div>
                      <div className="content">
                        <p>
                          Incidunt voluptate sit temporibus aperiam. Quia vitae
                          aut sint ullam quis illum voluptatum et. Quo libero
                          rerum voluptatem pariatur nam. Ad impedit qui officiis
                          est
                        </p>
                        <div className="read-more">
                          <a href="blog-details.html">Read More</a>
                        </div>
                      </div>
                    </article>
                  </div>
                </div>
              </div>
            </section>
          </div>

          <div className="col-lg-4 sidebar">
            <div
              className="widgets-container"
              data-aos="fade-up"
              data-aos-delay={200}
            >
              {/* Search Widget */}
              <div className="search-widget widget-item">
                <h3 className="widget-title">Search</h3>
                <form action="">
                  <input type="text" />
                  <button type="submit" title="Search">
                    <i className="bi bi-search" />
                  </button>
                </form>
              </div>
              {/*/Search Widget */}
              {/* Recent Posts Widget */}
              <div className="recent-posts-widget widget-item">
                <h3 className="widget-title">Recent Posts</h3>
                <div className="post-item">
                  <img
                    src="assets/img/blog/blog-post-square-1.webp"
                    alt=""
                    className="flex-shrink-0"
                  />
                  <div>
                    <h4>
                      <a href="blog-details.html">
                        Nihil blanditiis at in nihil autem
                      </a>
                    </h4>
                    <time dateTime="2020-01-01">Jan 1, 2020</time>
                  </div>
                </div>
                <div className="post-item">
                  <img
                    src="assets/img/blog/blog-post-square-2.webp"
                    alt=""
                    className="flex-shrink-0"
                  />
                  <div>
                    <h4>
                      <a href="blog-details.html">Quidem autem et impedit</a>
                    </h4>
                    <time dateTime="2020-01-01">Jan 1, 2020</time>
                  </div>
                </div>
                <div className="post-item">
                  <img
                    src="assets/img/blog/blog-post-square-3.webp"
                    alt=""
                    className="flex-shrink-0"
                  />
                  <div>
                    <h4>
                      <a href="blog-details.html">
                        Id quia et et ut maxime similique occaecati ut
                      </a>
                    </h4>
                    <time dateTime="2020-01-01">Jan 1, 2020</time>
                  </div>
                </div>
                <div className="post-item">
                  <img
                    src="assets/img/blog/blog-post-square-4.webp"
                    alt=""
                    className="flex-shrink-0"
                  />
                  <div>
                    <h4>
                      <a href="blog-details.html">
                        Laborum corporis quo dara net para
                      </a>
                    </h4>
                    <time dateTime="2020-01-01">Jan 1, 2020</time>
                  </div>
                </div>
                {/* End recent post item*/}
                <div className="post-item">
                  <img
                    src="assets/img/blog/blog-post-square-5.webp"
                    alt=""
                    className="flex-shrink-0"
                  />
                  <div>
                    <h4>
                      <a href="blog-details.html">
                        Et dolores corrupti quae illo quod dolor
                      </a>
                    </h4>
                    <time dateTime="2020-01-01">Jan 1, 2020</time>
                  </div>
                </div>
              </div>

              {/* Categories Widget */}
              <div className="categories-widget widget-item">
                <h3 className="widget-title">Categories</h3>
                <ul className="mt-3">
                  <li>
                    <a href="#">
                      General <span>(25)</span>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      Lifestyle <span>(12)</span>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      Travel <span>(5)</span>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      Design <span>(22)</span>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      Creative <span>(8)</span>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      Educaion <span>(14)</span>
                    </a>
                  </li>
                </ul>
              </div>
              {/*/Categories Widget */}

              {/* Tags Widget */}
              <div className="tags-widget widget-item">
                <h3 className="widget-title">Tags</h3>
                <ul>
                  <li>
                    <a href="#">App</a>
                  </li>
                  <li>
                    <a href="#">IT</a>
                  </li>
                  <li>
                    <a href="#">Business</a>
                  </li>
                  <li>
                    <a href="#">Mac</a>
                  </li>
                  <li>
                    <a href="#">Design</a>
                  </li>
                  <li>
                    <a href="#">Office</a>
                  </li>
                  <li>
                    <a href="#">Creative</a>
                  </li>
                  <li>
                    <a href="#">Studio</a>
                  </li>
                  <li>
                    <a href="#">Smart</a>
                  </li>
                  <li>
                    <a href="#">Tips</a>
                  </li>
                  <li>
                    <a href="#">Marketing</a>
                  </li>
                </ul>
              </div>
              {/*/Tags Widget */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ListBlogIT;
