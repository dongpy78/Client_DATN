import React, { useEffect, useState } from "react";
import { Input } from "antd";
import ReactPaginate from "react-paginate";
import { getDetailCompanyById } from "../../services/userService";
import CommonUtils from "../../utils/CommonUtils";
import { showErrorToast } from "../../utils/toastNotifications";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import moment from "moment";

const calculateDaysRemaining = (endDate) => {
  const now = new Date(); // Ngày hiện tại
  const end = new Date(endDate); // Ngày kết thúc
  const timeDiff = end - now; // Hiệu số thời gian (milliseconds)
  const daysRemaining = Math.ceil(timeDiff / (1000 * 60 * 60 * 24)); // Chuyển đổi sang ngày
  return daysRemaining;
};

// Styled Components
const Container = styled.div`
  background-color: #e5e5e5;
`;

const CompanyCover = styled.div`
  margin-bottom: 16px;

  @media (max-width: 740px) {
  }
`;

const CoverWrapper = styled.div`
  height: 236px;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const CompanyDetailOverview = styled.div`
  display: flex;
  align-items: center;
  background: #fff;
  padding: 10px 24px;
  position: relative;

  @media (max-width: 740px) {
    flex-wrap: wrap;
  }
`;

const CompanyLogo = styled.div`
  width: 140px;
  height: 110px;
  margin-right: 24px;
`;

const CompanyImageLogo = styled.div`
  width: 140px;
  height: 140px;
  background: #fff;
  border: 5px solid #fff;
  border-radius: 10px;
  position: relative;
  top: -65px;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 100%;
    height: 100%;
    border: 1px solid #eee;
    border-radius: 10px;
    object-fit: cover;
  }
`;

const CompanyInfo = styled.div`
  flex: 1;
  padding-top: 5px;
  word-break: break-word;

  @media (max-width: 740px) {
    display: flex;
    flex-direction: column;

    .website-and-amount {
      flex-direction: column;
    }
  }
`;

const CompanyDetailName = styled.h1`
  color: #333;
  font-size: 24px;
  margin: 0;
`;

const Website = styled.p`
  font-size: 15px;
  margin: 0;
  padding-right: 40px;

  a {
    color: black;
    text-decoration: none;
  }
`;

const CompanySize = styled.p`
  font-size: 15px;
  margin: 0;
`;

const BoxFollow = styled.div`
  margin-left: auto;
`;

const FollowButton = styled.a`
  background: ${(props) =>
    props.censorCode === "CS2"
      ? "yellow"
      : props.censorCode !== "CS1"
      ? "red"
      : "#00b14f"};
  color: black;
  padding: 6px 12px;
  border-radius: 4px;
  font-size: 14px;
  text-decoration: none;
  display: inline-block;
`;

const Detail = styled.div`
  padding: 24px 0;
`;

const BoxWhite = styled.div`
  background: #fff;
  border: 1px solid #eee;
  border-radius: 5px;
  box-shadow: -1px 1px 6px rgba(102, 56, 56, 0.05);
  margin-bottom: 16px;
  padding: 24px;
`;

const Title = styled.h4`
  border-left: 5px solid #00b14f;
  padding-left: 8px;
`;

const BoxBody = styled.div`
  padding-top: 19px;
`;

const JobItem = styled.div`
  background: #fff;
  border: 1px solid #f4f4f4;
  border-radius: 5px;
  display: flex;
  margin-bottom: 16px;
  padding: 16px;
  transition: box-shadow 0.3s;

  &:hover {
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
  }
`;

const Avatar = styled.div`
  width: 80px;
  height: 80px;
  overflow: hidden;

  img {
    width: 100%;
    height: auto;
    border-radius: 5px;
  }
`;

const Body = styled.div`
  flex: 1;
  margin-left: 12px;
`;

const Content = styled.div`
  display: flex;
  justify-content: space-between;
`;

const MlAuto = styled.div`
  flex: 1;
`;

const MrAuto = styled.div`
  min-width: 100px;
  text-align: right;
`;

const Deadline = styled.p`
  margin: 0;
  color: #333;
  font-size: 14px;
`;

const LabelContent = styled.div`
  display: flex;
  margin: 10px 0;
`;

const Label = styled.label`
  background: #edeef0;
  border-radius: 3px;
  color: #636d78;
  font-size: 12px;
  padding: 2px 8px;
  margin-right: 10px;
`;

const BoxAddress = styled(BoxWhite)``;

const BoxSharing = styled(BoxWhite)``;

const BoxCopy = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 16px;
`;

const UrlCopy = styled.input`
  background: #fafafa;
  border: none;
  border-radius: 5px;
  flex: 1;
  padding: 8px;
  font-size: 12px;
`;

const BtnCopy = styled.button`
  background: #f2fbf6;
  border: none;
  border-radius: 5px;
  width: 40px;
  height: 40px;
  margin-left: 8px;
  cursor: pointer;

  i {
    color: #00b14f;
    font-size: 18px;
  }
`;

const BoxShare = styled.div`
  display: flex;
  gap: 16px;

  a {
    text-decoration: none;
  }
`;

// Component chính
const DetailCompany = () => {
  const [dataCompany, setDataCompany] = useState({});
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      let fetchCompany = async () => {
        let res = await getDetailCompanyById(id);

        if (res) {
          setDataCompany(res.data);
          console.log(dataCompany);
        }
      };
      fetchCompany();
    }
  }, []);

  const copyLink = () => {
    let copyText = document.getElementById("mylink");

    /* Select the text field */
    copyText.select();
    copyText.setSelectionRange(0, 99999); /* For mobile devices */

    /* Copy the text inside the text field */
    navigator.clipboard.writeText(copyText.value);
  };

  return (
    <Container>
      <CompanyCover>
        <div className="container">
          <CoverWrapper>
            <img
              src={dataCompany.coverimage}
              alt="Company Cover"
              className="img-responsive"
            />
          </CoverWrapper>
          <CompanyDetailOverview>
            <CompanyLogo>
              <CompanyImageLogo>
                <img
                  src={dataCompany.thumbnail}
                  alt="Company Logo"
                  className="img-responsive"
                />
              </CompanyImageLogo>
            </CompanyLogo>
            <CompanyInfo>
              <CompanyDetailName>{dataCompany.name}</CompanyDetailName>
              <div className="d-flex website-and-amount">
                <Website>
                  <i className="fas fa-globe-americas"></i>
                  <a
                    href={dataCompany.website}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {dataCompany.website}
                  </a>
                </Website>
                <CompanySize>
                  <i className="far fa-building"></i>
                  {dataCompany.amountEmployer}+ nhân viên
                </CompanySize>
              </div>
            </CompanyInfo>
            <BoxFollow>
              <FollowButton
                censorCode={dataCompany.censorData?.code}
                className="btn btn-follow btn-primary-hover"
              >
                {dataCompany.censorData?.value}
              </FollowButton>
            </BoxFollow>
          </CompanyDetailOverview>
        </div>
      </CompanyCover>
      <Detail>
        <div className="container">
          <div className="row">
            <div className="col-md-8">
              <BoxWhite>
                <Title>Giới thiệu công ty</Title>
                <BoxBody>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: dataCompany.descriptionHTML,
                    }}
                  ></p>
                </BoxBody>
              </BoxWhite>
              <BoxWhite>
                <Title>Tuyển dụng</Title>
                <BoxBody>
                  {dataCompany.postData?.length > 0 ? (
                    dataCompany.postData.map((item, index) => (
                      <Link
                        to={`/detail-job/${item.id}`}
                        key={index}
                        className="company-logo"
                      >
                        <JobItem>
                          <Avatar>
                            <img
                              src={dataCompany.thumbnail}
                              alt="Company Logo"
                            />
                          </Avatar>
                          <Body>
                            <Content>
                              <MlAuto>
                                <h4 className="title-job">
                                  <Link to={`/detail-job/${item.id}`}>
                                    <span className="bold transform-job-title">
                                      {item.postDetailData.name}
                                    </span>
                                    <i
                                      className="fa-solid fa-circle-check"
                                      title="Tin từ nhà tuyển dụng đã xác thực"
                                    />
                                  </Link>
                                </h4>
                              </MlAuto>
                              <MrAuto>
                                <Deadline>
                                  {calculateDaysRemaining(item.timeEnd) <= 0 ? (
                                    <div>Hết hạn ứng tuyển</div>
                                  ) : (
                                    <div>
                                      Còn{" "}
                                      <strong>
                                        {calculateDaysRemaining(item.timeEnd)}
                                      </strong>{" "}
                                      ngày
                                    </div>
                                  )}
                                </Deadline>
                              </MrAuto>
                            </Content>
                            <LabelContent>
                              <Label className="salary">
                                {item.postDetailData.salaryTypePostData.value}
                              </Label>
                              <Label className="address">
                                {item.postDetailData.provincePostData.value}
                              </Label>
                              <Label className="time">
                                {moment(item.createdAt).fromNow()}
                              </Label>
                            </LabelContent>
                          </Body>
                        </JobItem>
                      </Link>
                    ))
                  ) : (
                    <div style={{ textAlign: "center" }}>
                      Không có bài đăng nào
                    </div>
                  )}
                </BoxBody>
              </BoxWhite>
            </div>
            <div className="col-md-4">
              <BoxAddress>
                <Title>Địa chỉ công ty</Title>
                <BoxBody>
                  <p className="text-dark-gray">
                    <i className="fas fa-map-marker-alt" />
                    {dataCompany.address}
                  </p>
                  <div className="company-map">
                    <p className="map">Bản đồ trụ sở chính :</p>
                    <iframe
                      width="100%"
                      height={270}
                      frameBorder={0}
                      style={{ border: 0 }}
                      src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyCVgO8KzHQ8iKcfqXgrMnUIGlD-piWiPpo&q=${dataCompany.address}&zoom=15&language=vi`}
                      allowFullScreen
                    ></iframe>
                  </div>
                </BoxBody>
              </BoxAddress>
              <BoxSharing>
                <Title>Chia sẻ công ty tới bạn bè</Title>
                <BoxBody>
                  <p>Sao chép đường dẫn</p>
                  <BoxCopy>
                    <UrlCopy
                      id="mylink"
                      type="text"
                      defaultValue={window.location.href}
                      readOnly
                    />
                    <BtnCopy onClick={copyLink}>
                      <i className="fa-regular fa-copy" />
                    </BtnCopy>
                  </BoxCopy>
                  <p>Chia sẻ qua mạng xã hội</p>
                  <BoxShare>
                    <a
                      href={`http://www.facebook.com/sharer/sharer.php?u=${window.location.href}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <img
                        src="https://www.topcv.vn/v4/image/job-detail/share/facebook.png"
                        alt="Facebook"
                      />
                    </a>
                    <a
                      href={`https://twitter.com/intent/tweet?url=${window.location.href}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <img
                        src="https://www.topcv.vn/v4/image/job-detail/share/twitter.png"
                        alt="Twitter"
                      />
                    </a>
                    <a
                      href={`https://www.linkedin.com/cws/share?url=${window.location.href}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <img
                        src="https://www.topcv.vn/v4/image/job-detail/share/linkedin.png"
                        alt="LinkedIn"
                      />
                    </a>
                  </BoxShare>
                </BoxBody>
              </BoxSharing>
            </div>
          </div>
        </div>
      </Detail>
    </Container>
  );
};

export default DetailCompany;
