import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import { BsArrowDownRight, BsArrowUpRight } from "react-icons/bs";
import { Column } from "@ant-design/plots";
import { Table } from "antd";
import {useDispatch, useSelector} from "react-redux"
import { getMonthlyData, getOrders, getYearlyData } from "../../features/auth/authSlice";

const columns = [
  {
    title: "SNo ",
    dataIndex: "key",
  },
  {
    title: "Tên",
    dataIndex: "name",
  },
  {
    title: "Số lượng sản phẩm",
    dataIndex: "product",
  },
  {
    title: "Tổng giá",
    dataIndex: "price",
  },
  {
    title: "Tổng giá giảm",
    dataIndex: "dprice",
  },
  {
    title: "Trạng thái",
    dataIndex: "status",
  },
];


const Dashboard = () => {

  const dispatch = useDispatch();
  const monthlyDataState = useSelector((state)=>state?.auth?.monthlyData);
  const yearlyDataState = useSelector((state)=>state?.auth?.yearlyData);
  const orderState = useSelector((state)=>state?.auth?.orders?.orders);
  const [dataMonthly , setDataMonthly] = useState([])
  const [dataMonthlySales , setDataMonthlySales] = useState([])
  const [orderData , setOrderData] = useState([])

  const getTokenFromLocalStorage = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null;

 const config3 = {
  headers: {
    Authorization: `Bearer ${
      getTokenFromLocalStorage !== null ? getTokenFromLocalStorage.token : ""
    }`,
    Accept: "application/json",
  },
};

  useEffect(() => {
    setTimeout(() => {
      dispatch(getMonthlyData(config3))
    },500);
    setTimeout(() => {
      dispatch(getYearlyData(config3))
    },100);
    setTimeout(() => {
      dispatch(getOrders(config3))
    }, 100);
  }, [])
  console.log(orderState);
  useEffect(() => {
    let monthNames = [
      "Tháng 1",
      "Tháng 2",
      "Tháng 3",
      "Tháng 4",
      "Tháng 5",
      "Tháng 6",
      "Tháng 7",
      "Tháng 8",
      "Tháng 9",
      "Tháng 10",
      "Tháng 11",
      "Tháng 12",
    ];
    let data = [];
    let monthlyOrderCount = [];
    for (let index = 0; index < monthlyDataState?.length; index++) {
      const element = monthlyDataState[index];
      data.push({
        type:monthNames[element._id?.month],income:element?.amount
      })
      monthlyOrderCount.push({
        type:monthNames[element._id?.month],sales:element?.count

      })
    }
    setDataMonthly(data)
    setDataMonthlySales(monthlyOrderCount)

    const data1 = [];
for (let i = 0; i < orderState?.length; i++) {
  data1.push({
    key: i,
    name: orderState[i]?.user?.firstname + orderState[i]?.user?.lastname,
    product: orderState[i]?.orderItems?.length,
    price :orderState[i]?.totalPrice,
    dprice: orderState[i]?.totalPriceAfterDiscount,
    status: orderState[i]?.orderStatus,
  });
}
  setOrderData(data1)
  }, [monthlyDataState,yearlyDataState])


  const config = {
    data : dataMonthly,
    xField: "type",
    yField: "income",
    color: ({ type }) => {
      return "#ffd333";
    },
    label: {
      position: "middle",
      style: {
        fill: "#FFFFFF",
        opacity: 0.6,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      type: {
        alias: "Month",
      },
      sales: {
        alias: "Income",
      },
    },
  };
  const config2 = {
    data : dataMonthlySales,
    xField: "type",
    yField: "sales",
    color: ({ type }) => {
      return "#ffd333";
    },
    label: {
      position: "middle",
      style: {
        fill: "#FFFFFF",
        opacity: 0.6,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      type: {
        alias: "Month",
      },
      sales: {
        alias: "Sales",
      },
    },
  };
  return (
    <div>
      <h3 className="dash-h3">Dashboard</h3>
      <div className="dash-div-1">
        <div className="dash-div-2">
          <div>
            <p className="desc">Tổng thu nhập</p> <h2 className="dash-h2 sub-title">VND  {yearlyDataState && yearlyDataState[0]?.amount}</h2>
          </div>
          <div className="dash-div-5">
            <p className="desc" style={{ marginBottom: 0 }}>Tổng thu nhập hằng năm</p>
          </div>
        </div>
        <div className="dash-div-3">
          <div>
            <p className="desc">Tổng đơn hàng</p> <h2 className="dash-h2 sub-title">{yearlyDataState && yearlyDataState[0]?.count}</h2>
          </div>
          <div className="dash-div-5">
            <p className="desc" style={{ marginBottom: 0 }}>Tổng đơn hàng hằng năm</p>
          </div>
        </div>
      </div>
      <div className="mo-or">
      <div style={{ marginTop: "1.5rem" ,"flexGrow":1 , "width" :"50%"}}>
        <h3 className="dashh-h3">Thống kê thu nhập</h3>
        <div>
          <Column {...config} />
        </div>
      </div>
      <div style={{ marginTop: "1.5rem" ,"flexGrow":1 , "width" :"50%"}}>
        <h3 className="dashh-h3">Thống kê đơn hàng</h3>
        <div>
          <Column {...config2} />
        </div>
      </div>
      </div>
      <div style={{ marginTop: "1.5rem"}}>
        <h3 className="dashh-h3">Đơn hàng gần đây</h3>
        <div>
        <Table columns={columns} dataSource={orderData} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
