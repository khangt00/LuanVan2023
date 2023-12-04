import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import "./ViewEnq.css";
import {
  getAEnquiry,
  resetState,
  updateAEnquiry,
} from "../../features/enquiry/enquirySlice";
import { BiArrowBack } from "react-icons/bi";

const ViewEnq = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const getEnqId = location.pathname.split("/")[3];
  const enqState = useSelector((state) => state.enquiry);
  const { enqName, enqMobile, enqEmail, enqComment, enqStatus } = enqState;

  useEffect(() => {
    dispatch(getAEnquiry(getEnqId));
  }, [getEnqId]);
  const goBack = () => {
    navigate(-1);
  };
  const setEnquiryStatus = (e, i) => {
    console.log(e, i);
    const data = { id: i, enqData: e };
    dispatch(updateAEnquiry(data));
    dispatch(resetState());
    setTimeout(() => {
      dispatch(getAEnquiry(getEnqId));
    }, 100);
  };
  return (
    <div>
    <div className="view-enq-div-1">
      <h3 className="enq-h3">Xem yêu cầu</h3>
      <button
      className="view-enq-button-1"
      onClick={goBack}
      >
     <BiArrowBack className="icon-viewEnq" /> Trở lại
      </button>
    </div>
    <div className="view-enq-div-2">
    <div className="view-enq-div-3">
        <h6 className="h6andp-viewenq" >Số điện thoại:</h6>
        <p  className="h6andp-viewenq" >
        <a href={`tel:+92${enqMobile}`}>{enqMobile}</a>
        </p>
    </div>
    <div className="view-enq-div-3">
          <h6  className="h6andp-viewenq" >Email:</h6>
          <p className="h6andp-viewenq" >
            <a href={`mailto:${enqEmail}`}>{enqEmail}</a>
          </p>
        </div>
        <div className="view-enq-div-3">
          <h6  className="h6andp-viewenq" >Bình luận:</h6>
          <p  className="h6andp-viewenq" >{enqComment}</p>
        </div>
        <div className="view-enq-div-3">
          <h6 className="h6andp-viewenq" >Trạng thái:</h6>
          <p  className="h6andp-viewenq" >{enqStatus}</p>
        </div>
        <div className="view-enq-div-3">
          <h6  className="h6andp-viewenq" >Thay đổi trạng thái:</h6>
          <div>
            <select
              name=""
              defaultValue={enqStatus ? enqStatus : "Đã gửi"}
              className="form-control-viewEnq form-select-viewEnq"
              id=""
              onChange={(e) => setEnquiryStatus(e.target.value, getEnqId)}
            >
              <option value="Đã gửi">Đã gửi</option>
              <option value="Đã liên hệ">Đã liên hệ</option>
              <option value="Đang xử lý">Đang xử lý</option>
              <option value="Đã giải quyết">Đã giải quyết</option>
            </select>
          </div>
        </div>
    </div>
    </div>
  );
};

export default ViewEnq;
