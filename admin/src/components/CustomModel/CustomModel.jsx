import React from "react";
import { Modal } from "antd";

const CustomModal = (props) => {
  const { open, hideModal, performAction, title } = props;
  return (
    <Modal
      title="Xác nhận"
      open={open}
      onOk={performAction}
      onCancel={hideModal}
      okText="Đồng ý"
      cancelText="Hủy"
    >
      <p>{title}</p>
    </Modal>
  );
};

export default CustomModal;
