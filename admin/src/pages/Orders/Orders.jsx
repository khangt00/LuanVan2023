import React, { useEffect } from "react";
import "./Orders.css";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
// import { BiEdit } from "react-icons/bi";
// import { AiOutlineDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import { getOrders, updateAOrder } from "../../features/auth/authSlice";

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
    title: "Sản phẩm",
    dataIndex: "product",
  },
  {
    title: "Giá tiền",
    dataIndex: "amount",
  },
  {
    title: "Ngày mua",
    dataIndex: "date",
  },

  {
    title: "Hành động",
    dataIndex: "action",
  },
];

const Orders = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOrders());
  }, []);
  const orderState = useSelector((state) => state?.auth?.orders?.orders);
  // console.log(orderState)
  const data1 = [];
  for (let i = 0; i < orderState?.length; i++) {
    data1.push({
      key: i + 1,
      name: orderState[i]?.user?.firstname,
      product: (
        <Link to={`/admin/order/${orderState[i]?._id}`}>Xem đơn hàng</Link>
      ),
      amount: orderState[i].totalPrice,
      date: new Date(orderState[i]?.createdAt).toLocaleString(),
      action: (
        <>
          <select
            name=""
            onChange={(e) =>
              updateOrderStatus(orderState[i]?._id, e.target.value)
            }
            className="form-control form-select"
            id=""
            defaultValue={orderState[i]?.orderStatus}
          >
            <option value="Đã đặt hàng" disabled selected>
              Đã đặt hàng
            </option>
            <option value="Đang xử lý">Đang xử lý</option>
            <option value="Đã bàn giao đơn vị vận chuyển">Đã bàn giao đơn vị vận chuyển</option>
            <option value="Giao hàng">Giao hàng</option>
            <option value="Đã giao hàng">Đã giao hàng</option>
          </select>
        </>
      ),
    });
  }

  const updateOrderStatus = (a, b) => {
    dispatch(updateAOrder({ id: a, status: b }));
  };

  return (
    <div>
      <h3 className="O-list-h3">Đơn hàng</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
    </div>
  );
};

export default Orders;
