import React, { useEffect, useState } from "react";
import "./Cart.css";
import Meta from "../../components/Meta/Meta";
import BreadCrumb from "../../components/BreadCrumb/BreadCrumb";
import { AiOutlineDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCartProduct,
  getUserCart,
  updateCartProduct,
} from "../../features/user/userSlice";
import { useLocation } from "react-router-dom";

const Cart = () => {
  const location = useLocation();
  const selectedSize = location.state?.selectedSize;

  const isVideo = (url) => {
    if (url) {
      console.log("url: ", url);
      console.log(url.endsWith(".mp4"));
      return url.endsWith(".mp4");
    }
  };
  const getTokenFromLocalStorage = localStorage.getItem("customer")
  ? JSON.parse(localStorage.getItem("customer"))
  : null;

 const config2 = {
  headers: {
    Authorization: `Bearer ${
      getTokenFromLocalStorage !== null ? getTokenFromLocalStorage.token : ""
    }`,
    Accept: "application/json",
  },
};

  const dispatch = useDispatch();

  const [productUpdateDetail, setProductUpdateDetail] = useState(null);
  const [totalAmount, setTotalAmount] = useState(null);
  const userCartState = useSelector((state) => state?.auth?.cartProducts);
  useEffect(() => {
    dispatch(getUserCart(config2));
  }, []);

  useEffect(() => {
    if (productUpdateDetail !== null) {
      dispatch(
        updateCartProduct({
          cartItemId: productUpdateDetail?.cartItemId,
          quantity: productUpdateDetail?.quantity,
        })
      );
      setTimeout(() => {
        dispatch(getUserCart(config2));
      }, 300);
    }
  }, [productUpdateDetail,dispatch]);

  const deleteACartProduct = (id) => {
    dispatch(deleteCartProduct({id:id,config2:config2}));
    setTimeout(() => {
      dispatch(getUserCart(config2));
    }, 300);
  };

  useEffect(() => {
    let sum = 0;
    for (let index = 0; index < userCartState?.length; index++) {
      sum =
        sum +
        Number(userCartState[index]?.quantity) * userCartState[index]?.price;
      setTotalAmount(sum);
    }
  }, [userCartState]);

  return (
    <>
      <Meta title={"Giỏ hàng"} />
      <BreadCrumb title="Giỏ hàng" />
      <section className="cart-wrapper home-wrapper-02">
        <div className="cart-container-01">
          <div className="cart-row-01">
            <div className="cart-coloum-1">
              <div className="cart-div-01">
                <h4 className="cart-coloum-01">Sản phẩm</h4>
                <h4 className="cart-coloum-02">Tiền</h4>
                <h4 className="cart-coloum-03">Số lượng</h4>
                <h4 className="cart-coloum-04">Tổng</h4>
              </div>
              {userCartState &&
                userCartState?.map((item, index) => {
                  return (
                    <div className="cart-data" key={index}>
                      <div className="cart-coloum-01">
                        <div className="cart-div-02">
                          {isVideo(item?.productId?.images[0]?.url) ? (
                            <video className="cart-img-01">
                              <source
                                src={item?.productId?.images[0]?.url}
                                type="video/mp4"
                              />
                            </video>
                          ) : (
                            <div className="product-image">
                              <img
                                className="cart-img-01"
                                src={item?.productId?.images[0]?.url ? item?.productId?.images[0]?.url : "/images/watch.jpg"}
                                alt="product"
                              />
                            </div>
                          )}
                          {/* <img
                            className="cart-img-01"
                            src={item?.productId?.images[0]?.url ? item?.productId?.images[0]?.url : "/images/watch.jpg"}
                            alt="watch"
                          /> */}
                        </div>
                        <div className="cart-div-03">
                          <p style={{ marginBottom: "20px" }}>
                            {item?.productId?.title}
                          </p>
                          <p
                            style={{
                              marginTop: "20px",
                              marginBottom: "15px",
                              display: "flex",
                              gap: "1rem",
                            }}
                          >
                            Màu :
                            <ul className="colors">
                              <li
                                style={{ backgroundColor: item?.color?.title }}
                              ></li>
                            </ul>
                          </p>
                          <p 
                           style={{
                              marginTop: "20px",
                              marginBottom: "15px",
                              display: "flex",
                              gap: "1rem",
                            }}
                            >
                            Tình trạng : {selectedSize}
                          </p>
                        </div>
                      </div>
                      <div className="cart-coloum-02">
                        <h5 className="price">VND {item?.price}</h5>
                      </div>
                      <div className="cart-coloum-03">
                        <div>
                          <input
                            width={50}
                            min={1}
                            max={20}
                            className="form-control-cart"
                            type="number"
                            name={"quantity"+item?._id}
                            id={"cart"+item?._id}
                            value={
                             item?.quantity
                            }
                            onChange={(e) => {
                              setProductUpdateDetail({
                                cartItemId: item?._id,
                                quantity: e.target.value,
                              });
                            }}
                          />
                        </div>
                        <div>
                          <AiOutlineDelete
                            onClick={() => {
                              deleteACartProduct(item?._id);
                            }}
                            className="cart-ai-button"
                          />
                        </div>
                      </div>
                      <div className="cart-coloum-04">
                        <h5 className="price">
                          VND {item?.price * item?.quantity}
                        </h5>
                      </div>
                    </div>
                  );
                })}
            </div>
            <div className="cart-2-coloum-1">
              <div className="cart-div-04">
                <Link id="cart-link-no-1" to="/product" className="button">
                  Tiếp tục mua hàng
                </Link>
                {(totalAmount !== null || totalAmount !== 0) && (
                  <div className="cart-div-05">
                    <h4 className="cart-p-h">Tổng tiền : VND {totalAmount} </h4>
                    <p className="cart-p-h">
                      Phí vận chuyển được tính khi thanh toán
                    </p>
                    <Link id="cart-link-no-2" to="/checkout" className="button">
                      Thanh toán
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Cart;
