import { Modal, ModalProps } from "antd";
import React from "react";

type ICustomModalProps = ModalProps;
const CustomModal = (props: ICustomModalProps) => {
  const { children, title, open, onOk, onCancel, width, className } = props;
  return (
    <Modal
      title={title}
      open={open}
      onOk={onOk}
      onCancel={onCancel}
      footer={null}
      width={width}
      centered={true}
      {...props}
    >
      {children}
    </Modal>
  );
};

export default CustomModal;
