import React, { useEffect } from "react";
import "./Orders.css";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {useLocation } from "react-router-dom";
import { getAOrder } from "../../features/auth/authSlice";

const columns = [
    {
      title: "SNo",
      dataIndex: "key",
    },
    {
      title: "Tên sản phẩm",
      dataIndex: "name",
    },
    {
      title: "Thương hiệu",
      dataIndex: "brand",
    },
    {
      title: "Số lượng",
      dataIndex: "count",
    },
    {
      title: "Phương thức thanh toán",
      dataIndex: "payment",
    },
    {
      title: "Thông tin giao hàng",
      dataIndex: "shippingInfo",
    },
    {
      title: "Màu",
      dataIndex: "color",
    },
    {
      title: "Giá tiền",
      dataIndex: "amount",
    },
  ];


const ViewOrder = () => {
  const location = useLocation();
  const orderId = location.pathname.split("/")[3];
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAOrder(orderId));
  }, []);
  const orderState = useSelector((state) => state?.auth?.singleOrder?.orders);
  const data1 = [];
  for (let i = 0; i < orderState?.orderItems?.length; i++) {
    data1.push({
      key: i + 1,
      name: orderState?.orderItems[i]?.product.title,
      brand: orderState?.orderItems[i]?.product.brand,
      count: orderState?.orderItems[i]?.quantity,
      shippingInfo: orderState?.shippingInfo?.address,
      amount: orderState?.orderItems[i]?.price,
      color: orderState?.orderItems[i]?.color?.title,
      payment: orderState?.paymentInfo?.method,
    });
  }
  return (
    <div>
      <h3 className="O-list-h3">Xem đơn hàng</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
    </div>
  );
};

export default ViewOrder;
