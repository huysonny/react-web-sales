import React, { useState } from 'react';
import { Button, Modal, Tabs } from 'antd';
import UserInfo from './UserInfo';
import ChangePassWord from './ChangePassword';

const ManageAcount = (props) => {
  const { isModalOpen, setIsModalOpen, tempAvatar, setTempAvatar } = props;
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const items = [
    {
      key: 'info',
      label: 'Cập nhật thông tin',
      children: <UserInfo tempAvatar={tempAvatar} setTempAvatar={setTempAvatar} />,
    },
    {
      key: 'password',
      label: 'Đổi mật khẩu',
      children: <ChangePassWord />
    }
  ]
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
        <Tabs
          defaultActiveKey='info'
          items={items}
        />
      </Modal>

    </>
  )
}
export default ManageAcount;
