import React, { useEffect, useState } from "react";
import "./ColorList.css";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { BiEdit } from "react-icons/bi";
import { AiOutlineDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import { getColors, deleteAColor, resetState } from "../../../../features/color/colorSlice";
import CustomModel from "../../../../components/CustomModel/CustomModel"
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
    title: "Hành động",
    dataIndex: "action",
  },
];
const ColorList = () => {
  const [open, setOpen] = useState(false);
  const [colorId, setcolorId] = useState("");
  const showModal = (e) => {
    setOpen(true);
    setcolorId(e);
  };

  const hideModal = () => {
    setOpen(false);
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetState())
    dispatch(getColors());
  }, []);
  const colorState = useSelector((state) => state.color.colors);
  const data1 = [];
  for (let i = 0; i < colorState?.length; i++) {
    data1.push({
      key: i + 1,
      name: colorState[i].title,
      action: (
        <>
          <Link to={`/admin/color/${colorState[i]._id}`} className="pl-icon-1">
            <BiEdit />
          </Link>
          <button
            className="pl-icon-2 brandlist-icon-2"
            onClick={() => showModal(colorState[i]._id)}
          >
            <AiOutlineDelete />
          </button>
        </>
      ),
    });
  }
  const deleteColor = (e) => {
    dispatch(deleteAColor(e));
    setOpen(false);
    setTimeout(() => {
      dispatch(getColors());
    }, 100);
  };

  return (
    <div>
      <h3 className="Color-list-h3">Danh mục màu</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
      <CustomModel
        hideModal={hideModal}
        open={open}
        performAction={() => {
          deleteColor(colorId);
        }}
        title="Bạn chắc xóa màu này?"
      />
    </div>
  );
};

export default ColorList;
