import React, { useContext, useEffect, useState } from "react";
import FormRow from "../../components/admin/FormRow";
import FormRowSelect from "../../components/admin/FormRowSelect";
import Wrapper from "../../assets/wrappers/DashboardFormPage";
import axiosInstance from "../../libs/axiosInterceptor";
import {
  showSuccessToast,
  showErrorToast,
} from "../../utils/toastNotifications";
import { getFromLocalStorage } from "../../utils/localStorage";
import { Form } from "reactstrap";
import { GlobalContext } from "../../contexts/GlobalProviders";

const CandidateInfo = () => {
  const userStorage = getFromLocalStorage("user");
  const { setUser, setCandidate } = useContext(GlobalContext);
  const [user, setLocalUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [genderOptions, setGenderOptions] = useState([]);

  useEffect(() => {
    const fetchGenderOptions = async () => {
      try {
        const response = await axiosInstance.get(
          "/list-allcodes?type=GENDER&limit=10&offset=0"
        );
        if (response.status === 200) {
          console.log("Gender options:", response.data.data.rows);
          setGenderOptions(response.data.data.rows);
          console.log(genderOptions);
        }
      } catch (error) {
        console.error("Lỗi khi lấy danh sách giới tính:", error);
        showErrorToast("Không thể tải danh sách giới tính.");
      }
    };
    fetchGenderOptions();
  }, []);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const userId = userStorage.id;
        const response = await axiosInstance.get(
          `/auth/detail-user?userId=${userId}`
        );
        if (response.status === 200) {
          const userData = response.data.data;
          const savedImageUrl = localStorage.getItem("candidateImage");
          if (savedImageUrl) {
            userData.image = savedImageUrl;
            userData.imageReview = savedImageUrl;
          }

          console.log("User data fetched:", userData);
          setLocalUser(userData);
        }
      } catch (error) {
        console.error("Lỗi khi lấy thông tin người dùng:", error);
        showErrorToast("Không thể tải thông tin người dùng.");
      } finally {
        setLoading(false);
      }
    };
    fetchUserProfile();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log(`Input changed: ${name} = ${value}`);
    if (["firstName", "lastName", "address", "phonenumber"].includes(name)) {
      setLocalUser((prevUser) => ({
        ...prevUser,
        userAccountData: {
          ...prevUser.userAccountData,
          [name]: value,
        },
      }));
    } else {
      setLocalUser((prevUser) => ({
        ...prevUser,
        [name]: value,
      }));
    }
  };

  const uploadImage = async (file) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const response = await axiosInstance.post(
        "/media/upload/single",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      if (response.data && response.data.url) {
        return response.data.url;
      } else {
        throw new Error("Không thể upload ảnh");
      }
    } catch (error) {
      console.error("Lỗi khi upload ảnh:", error);
      throw error;
    }
  };

  const handleOnChangeImage = async (event) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;
    const file = files[0];
    const maxSize = 512 * 1024;
    if (file.size > maxSize) {
      showErrorToast("Ảnh đại diện vượt quá kích thước 0.5MB!");
      return;
    }
    try {
      const objectUrl = URL.createObjectURL(file);
      setLocalUser((prevUser) => ({
        ...prevUser,
        imageReview: objectUrl,
      }));
      const imageUrl = await uploadImage(file);
      setLocalUser((prevUser) => ({
        ...prevUser,
        image: imageUrl,
        imageReview: imageUrl,
      }));
      localStorage.setItem("candidateImage", imageUrl);

      setUser((prevUser) => ({
        ...prevUser,
        avatar: imageUrl,
        name: `${user.userAccountData.firstName} ${user.userAccountData.lastName}`.trim(),
      }));

      setCandidate((prevCandidate) => ({
        ...prevCandidate,
        avatar: imageUrl,
        name: `${user.userAccountData.firstName} ${user.userAccountData.lastName}`.trim(),
      }));
    } catch (error) {
      showErrorToast("Không thể upload ảnh");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userData = {
        id: userStorage.id,
        firstName: user.userAccountData.firstName || "",
        lastName: user.userAccountData.lastName || "",
        address: user.userAccountData.address || "",
        phonenumber: user.userAccountData.phonenumber || "",
        email: user.email || "",
        genderCode: user.genderCode || "", // "M" hoặc "FE"
        dob: user.dob || "",
        image: user.image || "",
      };

      console.log("Data to send:", userData);

      const response = await axiosInstance.patch(
        "/auth/update-user",
        userData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Cập nhật company trong GlobalContext
      setCandidate({
        name: `${userData.firstName} ${userData.lastName}`.trim(),
        avatar: userData.image,
      });

      setUser({
        name: `${userData.firstName} ${userData.lastName}`.trim(),
        avatar: userData.image,
      });

      const updatedUserStorage = {
        ...userStorage,
        ...userData,
      };
      localStorage.setItem("user", JSON.stringify(updatedUserStorage));

      showSuccessToast(
        response.data.message || "Cập nhật thông tin thành công"
      );
    } catch (error) {
      console.error("Lỗi khi cập nhật thông tin:", error);
      if (error.response) {
        console.log("Server response:", error.response.data);
      }
      showErrorToast(
        "Cập nhật thất bại: " + (error.message || "Lỗi không xác định")
      );
    }
  };

  if (loading) return <Wrapper>Đang tải...</Wrapper>;
  if (!user) return <Wrapper>Không tìm thấy thông tin người dùng.</Wrapper>;

  return (
    <section className="candidate-info-area" style={{ margin: "2rem 0" }}>
      <div
        className="container"
        style={{
          boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
        }}
      >
        <Wrapper>
          <Form method="post" className="form" onSubmit={handleSubmit}>
            <h4 className="form-title">Thông tin cá nhân</h4>
            <div className="form-center">
              <FormRow
                type="text"
                name="firstName"
                labelText="Họ"
                value={user.userAccountData.firstName}
                onChange={handleInputChange}
              />
              <FormRow
                type="text"
                name="lastName"
                labelText="Tên"
                value={user.userAccountData.lastName}
                onChange={handleInputChange}
              />
              <FormRow
                type="email"
                name="email"
                labelText="Email"
                value={user.email}
                onChange={handleInputChange}
              />
              <FormRow
                type="text"
                name="address"
                labelText="Địa chỉ"
                value={user.userAccountData.address}
                onChange={handleInputChange}
              />
              <FormRow
                type="text"
                name="phonenumber"
                labelText="Số điện thoại"
                value={user.userAccountData.phonenumber}
                onChange={handleInputChange}
              />
              <FormRowSelect
                name="genderCode"
                labelText="Giới tính"
                list={genderOptions.map((item) => ({
                  value: item.code, // "M" hoặc "FE"
                  label: item.value, // "Nam" hoặc "Nữ"
                }))}
                value={user.genderCode} // "M" hoặc "FE"
                onChange={handleInputChange}
              />
              <FormRow
                type="date"
                name="dob"
                labelText="Ngày sinh"
                value={user.dob || ""}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-center">
              <div
                className="form-row form-select-image"
                style={{ marginTop: "16px" }}
              >
                <div style={{ display: "flex", gap: "1.4rem" }}>
                  <label className="form-label">Ảnh đại diện</label>
                  {user.image ? (
                    <img
                      src={user.image}
                      alt="Ảnh đại diện"
                      className="company-image"
                      style={{
                        width: "100px",
                        height: "100px",
                        objectFit: "cover",
                      }}
                    />
                  ) : (
                    <p>Không có ảnh đại diện</p>
                  )}
                </div>

                <input
                  type="file"
                  name="image"
                  className="form-input"
                  onChange={handleOnChangeImage}
                />
              </div>
            </div>

            <div
              className="form-center"
              style={{ marginTop: "16px", textAlign: "right" }}
            >
              <button
                type="submit"
                className="btn btn-block"
                style={{ backgroundColor: "#38a4ff", marginTop: "24px" }}
              >
                Lưu
              </button>
            </div>
          </Form>
        </Wrapper>
      </div>
    </section>
  );
};

export default CandidateInfo;
