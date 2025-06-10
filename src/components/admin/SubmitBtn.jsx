import { useNavigation } from "react-router-dom";

const SubmitBtn = ({ formBtn, submitText = "Submit" }) => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <button
      type="submit"
      className={`btn btn-block ${formBtn && "form-btn"}`}
      disabled={isSubmitting}
      style={{ fontSize: "14px" }}
    >
      {isSubmitting ? "Đang gửi..." : submitText}
    </button>
  );
};

export default SubmitBtn;
