import React, { useEffect } from "react";
import "./Orders.css";
import BreadCrumb from "../../components/BreadCrumb/BreadCrumb";
import { useDispatch, useSelector } from "react-redux";
import { getOrders } from "../../features/user/userSlice";
import Meta from "../../components/Meta/Meta"
const Orders = () => {
  const dispatch = useDispatch();
  const orderState = useSelector(
    (state) => state?.auth?.getOrderedProduct?.orders
  );
  console.log(orderState);
  useEffect(() => {
    dispatch(getOrders());
  }, []);
  return (
    <>
      <BreadCrumb title="Đơn hàng" />
      <Meta title="Đơn hàng"/>
      <div className="order-page home-wrapper-02">
        <div className="order-page-container-1">
          <div className="order-page-row-1">
            <div className="order-page-coloum-1">
              <div className="order-page-row-2">
                <div className="order-page-coloum-2">
                  <h4 className="heading">Mã đơn hàng</h4>
                </div>
                <div className="order-page-coloum-3">
                  <h4 className="heading">Tổng tiền</h4>
                </div>
                <div className="order-page-coloum-3">
                  <h4 className="heading">Tổng tiền giảm giá</h4>
                </div>
                <div className="order-page-coloum-3">
                  <h4 className="heading">Trạng thái</h4>
                </div>
                <div className="order-page-coloum-3">
                  <h4 className="heading">Thông tin nhận hàng</h4>
                </div>
              </div>
              <div className="order-page-coloum-4">
                {orderState &&
                  orderState?.map((item, index) => {
                    return (
                      <div
                        style={{ backgroundColor: "#febd69","paddingTop":"0.75rem" }}
                        className="order-page-row-2"
                        key={index}
                      >
                        <div className="order-page-coloum-2" id="remo">
                          <p className="pad">{item?._id}</p>
                        </div>
                        <div className="order-page-coloum-3" id="remo">
                          <p>{item?.totalPrice}</p>
                        </div>
                        <div className="order-page-coloum-3" id="remo">
                          <p>{item?.totalPriceAfterDiscount}</p>
                        </div>
                        <div className="order-page-coloum-3" id="remo">
                          <p>{item?.orderStatus}</p>
                        </div>
                        <div className="order-page-coloum-3" id="remo">
                          <p>{item?.shippingInfo?.address}</p>
                        </div>
                        <div className="order-page-coloum-5">
                          <div className="order-page-row-3">
                            <div className="order-page-coloum-2">
                              <p className="pad">Tên sản phẩm</p>
                            </div>
                            <div className="order-page-coloum-3">
                              <p>Số lượng</p>
                            </div>
                            <div className="order-page-coloum-3">
                              <p>Giá tiền</p>
                            </div>
                            <div className="order-page-coloum-3">
                              <p>Màu</p>
                            </div>
                            {item?.orderItems?.map((i, index) => {
                              return (
                                <div className="order-page-coloum-5" key={index}>
                                  <div className="order-page-row-3">
                                    <div className="order-page-coloum-2">
                                      <p className="pad">{i?.product?.title}</p>
                                    </div>
                                    <div className="order-page-coloum-3">
                                      <p>{i?.quantity}</p>
                                    </div>
                                    <div className="order-page-coloum-3">
                                      <p>{i.price}</p>
                                    </div>
                                    <ul className="colors">
                                      <li
                                        style={{
                                          backgroundColor: i?.color.title,
                                        }}
                                      ></li>
                                    </ul>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Orders;
