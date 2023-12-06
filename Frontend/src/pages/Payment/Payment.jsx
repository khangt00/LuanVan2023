import React from "react";
import "./Payment.css"
const Payment = ({ closeModal, handlePaymentOption }) => {
  const handlePayment = (option) => {
    handlePaymentOption(option);
    closeModal();
  };

  return (
    <div className="payment-modal-overlay">
      <div className="payment-modal">
        <h2>Chọn hình thức thanh toán</h2>
        <div className="payment-options">
          {/* <button onClick={() => handlePayment("vnpay")}>
            Thanh toán VNPAY
          </button> */}
          {/* <button onClick={() => handlePayment("paystack")}>
            Pay with PayStack
          </button> */}
          <button onClick={() => handlePayment("cod")}>
            Thanh toán khi nhận hàng
          </button>
        </div>
        <button className="close-button" onClick={closeModal}>
          Đóng
        </button>
      </div>
    </div>
  );
};

export default Payment;
