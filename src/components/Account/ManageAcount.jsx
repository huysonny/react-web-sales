import React, { useState } from "react";
import { Button, Modal, Tabs } from "antd";
import UserInfo from "./UserInfo";
import ChangePassWord from "./ChangePassword";
import { useSelector } from "react-redux";

const ManageAcount = (props) => {
  const { isModalOpen, setIsModalOpen, tempAvatar, setTempAvatar } = props;
  const user = useSelector((state) => state.account.user);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    console.log(user.avatar);
    setIsModalOpen(false);
    setTempAvatar(user?.avatar);
  };
  const items = [
    {
      key: "info",
      label: "Cập nhật thông tin",
      children: (
        <UserInfo tempAvatar={tempAvatar} setTempAvatar={setTempAvatar} />
      ),
    },
    {
      key: "password",
      label: "Đổi mật khẩu",
      children: <ChangePassWord />,
    },
  ];
  return (
    <>
      <Modal
        title={"Quản lí tài khoản "}
        open={isModalOpen}
        footer={null}
        onCancel={() => setIsModalOpen(false)}
        maskClosable={false}
        width={"60vw"}
      >
        <Tabs defaultActiveKey="info" items={items} />
      </Modal>
    </>
  );
};
export default ManageAcount;
