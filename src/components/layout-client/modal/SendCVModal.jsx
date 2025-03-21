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

function SendCVModal(props) {
  const userData = getFromLocalStorage("user");
  console.log("userData:", userData);
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

  let bufferToBase64 = (bufferObj) => {
    if (bufferObj && bufferObj.type === "Buffer" && bufferObj.data) {
      const uint8Array = new Uint8Array(bufferObj.data);
      const binaryString = String.fromCharCode.apply(null, uint8Array);
      return `data:application/pdf;base64,${btoa(binaryString)}`;
    }
    return bufferObj;
  };

  let dataURLtoFile = (dataurl, filename) => {
    if (!dataurl || typeof dataurl !== "string" || !dataurl.includes("data:")) {
      console.error("Invalid data URL:", dataurl);
      return null;
    }
    try {
      var arr = dataurl.split(",");
      var mime = arr[0].match(/:(.*?);/)[1];
      var bstr = atob(arr[1]);
      var n = bstr.length;
      var u8arr = new Uint8Array(n);

      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new File([u8arr], filename, { type: mime });
    } catch (error) {
      console.error("Error converting data URL to file:", error);
      return null;
    }
  };

  let getFileCv = async (id) => {
    try {
      let res = await getDetailUserById(id);
      // console.log("getDetailUserById response:", res);
      if (res && res.data) {
        const userFileRaw =
          res.data.userAccountData?.userSettingData?.file || "";
        const userFile =
          typeof userFileRaw === "object"
            ? bufferToBase64(userFileRaw)
            : userFileRaw;

        setInputValue({
          ...inputValue,
          userId: id,
          postId: props.postId,
          linkFileUser: userFile
            ? URL.createObjectURL(dataURLtoFile(userFile, "yourCV"))
            : "",
          fileUser: userFile,
        });
      } else {
        console.error("No data returned from getDetailUserById");
      }
    } catch (error) {
      console.error("Error fetching user CV:", error);
      setInputValue((prev) => ({
        ...prev,
        userId: userData?.id || "",
        postId: props.postId || "",
      }));
    }
  };

  useEffect(() => {
    console.log(
      "useEffect running with userData:",
      userData,
      "postId:",
      props.postId
    );
    if (userData && props.postId) {
      getFileCv(userData.id);
    } else {
      console.error("Missing userData or postId:", {
        userData,
        postId: props.postId,
      });
    }
  }, [userData, props.postId]);

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
        file: base64,
        linkFile: URL.createObjectURL(file),
      });
    }
  };

  const handleSendCV = async () => {
    setIsLoading(true);

    console.log("userId:", inputValue.userId);
    console.log("postId:", inputValue.postId);

    let cvSend = typeCv === "userCv" ? inputValue.fileUser : inputValue.file;
    console.log("cvSend:", cvSend);

    if (!inputValue.userId || !inputValue.postId || !cvSend) {
      showErrorToast(
        "Vui lòng cung cấp đầy đủ thông tin (userId, postId, file CV)"
      );
      setIsLoading(false);
      return;
    }

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
          file: "",
          description: "",
          linkFile: "",
        });
        showSuccessToast("Đã gửi thành công");
        props.onHide();
      } else {
        showErrorToast(kq.message || "Gửi thất bại");
      }
    } catch (error) {
      setIsLoading(false);
      console.error("Error sending CV:", error);
      showErrorToast(
        error.response?.data?.message || "Đã xảy ra lỗi khi gửi CV"
      );
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
          onChange={handleChange}
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
            onChange={handleOnChangeFile}
          />
        )}
        {typeCv === "pcCv" && inputValue.linkFile && (
          <div>
            <a
              href={inputValue.linkFile}
              style={{ color: "blue" }}
              target="_blank"
            >
              Nhấn vào đây để xem lại CV của bạn
            </a>
          </div>
        )}
      </ModalBody>
      <ModalFooter style={{ justifyContent: "space-between" }}>
        <div className="btn-user head-btn1" onClick={handleSendCV}>
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
}

export default SendCVModal;
