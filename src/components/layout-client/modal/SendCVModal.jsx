import React, { useEffect, useState } from "react";
import { Modal, ModalFooter, ModalBody, Button, Spinner } from "reactstrap";
import CommonUtils from "../../../utils/CommonUtils";
import {
  showSuccessToast,
  showErrorToast,
} from "../../../utils/toastNotifications";
import { createNewCv } from "../../../services/cvService";
import { getDetailUserById } from "../../../services/userService";
import { getFromLocalStorage } from "../../../utils/localStorage";
import "./modal.css";

const SendCVModal = (props) => {
  const userData = getFromLocalStorage("user");
  const [isLoading, setIsLoading] = useState(false);
  const [inputValue, setInputValue] = useState({
    userId: "",
    postId: "",
    file: "",
    description: "",
    linkFile: "",
    linkFileUser: "",
    fileUser: "",
  });

  const [typeCv, setTypeCv] = useState("pcCv");

  let getFileCv = async (id) => {
    let res = await getDetailUserById(id);
    console.log("getDetailUserById: ", res);
    setInputValue({
      ...inputValue,
      ["userId"]: id,
      ["postId"]: props.postId,
      ["linkFileUser"]: res.data.userAccountData.userSettingData.file
        ? URL.createObjectURL(
            dataURLtoFile(
              res.data.userAccountData.userSettingData.file,
              "yourCV"
            )
          )
        : "",
      ["fileUser"]: res.data.userAccountData.userSettingData.file
        ? res.data.userAccountData.userSettingData.file
        : "",
    });
  };

  useEffect(() => {
    if (userData) getFileCv(userData.id);
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  const radioOnChange = (e) => {
    const { value } = e.target;
    if (value === "userCv" && !inputValue.linkFileUser) {
      showErrorToast("Hiện chưa đăng CV online cho chúng tôi");
    } else {
      setTypeCv(value);
    }
  };

  let dataURLtoFile = (dataurl, filename) => {
    var arr = dataurl.split(","),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], filename, { type: mime });
  };

  const handleOnChangeFile = async (event) => {
    let data = event.target.files;
    let file = data[0];
    if (file) {
      if (file.size > 2097152) {
        showErrorToast("File của bạn quá lớn. Chỉ gửi file dưới 2MB");
        return;
      }
      let base64 = await CommonUtils.getBase64(file);
      setInputValue({
        ...inputValue,
        ["file"]: base64,
        ["linkFile"]: URL.createObjectURL(file),
      });
    }
  };

  const handleSendCV = async () => {
    setIsLoading(true);

    // Log giá trị userId và postId để kiểm tra
    console.log("userId:", inputValue.userId);
    console.log("postId:", inputValue.postId);

    let cvSend = "";
    if (typeCv === "userCv") {
      cvSend = inputValue.fileUser;
    } else {
      cvSend = inputValue.file;
    }

    // Log giá trị cvSend để kiểm tra
    console.log("cvSend:", cvSend);

    // Log toàn bộ dữ liệu gửi lên server
    const requestData = {
      userId: inputValue.userId,
      file: cvSend,
      postId: inputValue.postId,
      description: inputValue.description,
    };
    console.log("Request Data:", requestData);

    try {
      let kq = await createNewCv(requestData);
      setIsLoading(false);
      if (kq) {
        setInputValue({
          ...inputValue,
          ["file"]: "",
          ["description"]: "",
          ["linkFile"]: "",
        });
        showSuccessToast("Đã gửi thành công");
        props.onHide();
      } else {
        // Hiển thị thông báo lỗi từ backend
        showErrorToast(kq.message || "Gửi thất bại");
      }
    } catch (error) {
      setIsLoading(false);
      console.error("Error sending CV:", error);

      // Trích xuất thông báo lỗi từ phản hồi của API
      const errorMessage =
        error.response?.data?.message || "Đã xảy ra lỗi khi gửi CV";
      showErrorToast(errorMessage);
    }
  };

  return (
    <Modal isOpen={props.isOpen} toggle={props.onHide} style={{ top: "137px" }}>
      <p className="text-center">NỘP CV CỦA BẠN CHO NHÀ TUYỂN DỤNG</p>
      <ModalBody>
        <p>Nhập lời giới thiệu gửi đến nhà tuyển dụng</p>
        <textarea
          placeholder="Giới thiệu sơ lược về bản thân để tăng sự yêu thích đối với nhà tuyển dụng"
          name="description"
          className="mt-2"
          style={{ width: "100%" }}
          rows="5"
          onChange={(event) => handleChange(event)}
        />
        <div className="d-flex" style={{ justifyContent: "space-between" }}>
          <div>
            <input
              onChange={radioOnChange}
              type="radio"
              checked={typeCv === "pcCv"}
              value="pcCv"
              name="typeCV"
            />
            <label>Tự chọn CV</label>
          </div>
        </div>
        {typeCv === "pcCv" && (
          <input
            type="file"
            className="mt-2"
            accept=".pdf"
            onChange={(event) => handleOnChangeFile(event)}
          ></input>
        )}
        {typeCv === "pcCv" && inputValue.linkFile && (
          <div>
            <a
              href={inputValue.linkFile}
              style={{ color: "blue" }}
              target="_blank"
            >
              Nhấn vào đây để xem lại CV của bạn{" "}
            </a>
          </div>
        )}
      </ModalBody>
      <ModalFooter style={{ justifyContent: "space-between" }}>
        <div className="btn-user head-btn1" onClick={() => handleSendCV()}>
          Gửi hồ sơ
        </div>
        <div className="btn-user head-btn1" onClick={props.onHide}>
          Hủy
        </div>
      </ModalFooter>
      {isLoading && (
        <Modal isOpen={true} centered contentClassName="closeBorder">
          <div
            style={{
              position: "absolute",
              right: "50%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Spinner animation="border" />
          </div>
        </Modal>
      )}
    </Modal>
  );
};

export default SendCVModal;
