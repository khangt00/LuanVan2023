import React, { useEffect, useState } from "react";
import "./Enquiries.css";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineDelete, AiOutlineEye } from "react-icons/ai";
import { Link } from "react-router-dom";
import {
  deleteAEnquiry,
  getEnquiries,
  resetState,
  updateAEnquiry,
} from "../../features/enquiry/enquirySlice";
import CustomModel from "../../components/CustomModel/CustomModel";

const columns = [
  {
    title: "SNo",
    dataIndex: "key",
  },
  {
    title: "Tên",
    dataIndex: "name",
  },
  {
    title: "Email",
    dataIndex: "email",
  },
  {
    title: "Số điện thoại",
    dataIndex: "mobile",
  },
  {
    title: "Bình luận",
    dataIndex: "comment",
  },
  {
    title: "Trạng thái",
    dataIndex: "status",
  },

  {
    title: "Hành động",
    dataIndex: "action",
  },
];

const Enquiries = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [enqId, setenqId] = useState("");
  const showModal = (e) => {
    setOpen(true);
    setenqId(e);
  };

  const hideModal = () => {
    setOpen(false);
  };

  useEffect(() => {
    dispatch(resetState());
    dispatch(getEnquiries());
  }, []);
  const enqState = useSelector((state) => state.enquiry.enquiries);
  const data1 = [];
  for (let i = 0; i < enqState.length; i++) {
    data1.push({
      key: i + 1,
      name: enqState[i].name,
      email: enqState[i].email,
      mobile: enqState[i].mobile,
      comment: enqState[i].comment,
      status: (
        <>
          <select
            name=""
            defaultValue={enqState[i].status ? enqState[i].status : "Đã gửi"}
            className="form-control form-select"
            id=""
            onChange={(e) => setEnquiryStatus(e.target.value, enqState[i]._id)}
          >
            <option value="Đã gửi">Đã gửi</option>
            <option value="Đã liên hệ">Đã liên hệ</option>
            <option value="Đang xử lý">Đang xử lý</option>
            <option value="Đã giải quyết">Đã giải quyết</option>
          </select>
        </>
      ),
      action: (
        <>
        <Link   to={`/admin/enquiries/${enqState[i]._id}`} className="pl-icon-1">
            <AiOutlineEye />
          </Link>
          <button
            className="pl-icon-2 brandlist-icon-2"
            onClick={() => showModal(enqState[i]._id)}
          >
            <AiOutlineDelete />
          </button>
        </>
      ),
    });
  }

  const setEnquiryStatus = (e, i) => {
    console.log(e, i);
    const data = { id: i, enqData: e };
    dispatch(updateAEnquiry(data));
  };
  const deleteEnq = (e) => {
    dispatch(deleteAEnquiry(e));
    setOpen(false);
    setTimeout(() => {
      dispatch(getEnquiries());
    }, 100);
  };
  return (
    <div>
      <h3 className="enq-h3">Yêu cầu</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
      <CustomModel
        hideModal={hideModal}
        open={open}
        performAction={() => {
          deleteEnq(enqId);
        }}
        title="Bạn có chắc muốn xóa yêu cầu này"
      />
    </div>
  );
};

export default Enquiries;
