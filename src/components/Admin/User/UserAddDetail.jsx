import { Button, Modal, Form, Input, message, notification } from 'antd';
import { useState } from 'react';
import { callCreateUser } from '../../../services/api';
const UserAddDetail = (props) => {
    const { openAddDetail, setOpenAddDetail } = props;
    const [form] = Form.useForm();
    const [isSubmit, setIsSubmit] = useState(false);
    const handleOk = () => {

    }
    const handleCancel = () => {
        setOpenAddDetail(false);
    }
    const onFinish = async (values) => {
        const { fullName, email, password, phone } = values;
        const res = await callCreateUser(fullName, password, email, phone);
        if (res && res.data) {
            message.success("Tạo mới user thành công");
            form.resetFields();
            setOpenAddDetail(false);
            await props.fetchUser();
        }
        else {
            notification({
                message: 'Đã có lỗi xảy ra ',
                description:
                    res.message && Array.isArray(res.message) ? res.message[0] : res.message,
                duration: 5
            })
        }
    }
    return (
        <>
            <Modal title="Thêm mới người dùng" open={openAddDetail} onOk={() => form.submit()} onCancel={handleCancel} okText="Tạo mới" cancelText={"Hủy"} confirmLoading={isSubmit}>
                <Form
                    name="basic"
                    form={form}
                    // style={{ maxWidth: 600, margin: '0 auto' }}
                    onFinish={onFinish}
                    autoComplete="off"
                >
                    <Form.Item
                        labelCol={{ span: 24 }} //whole column
                        label="Họ tên"
                        name="fullName"
                        rules={[{ required: true, message: 'Họ tên không được để trống!' }]}
                    >
                        <Input />
                    </Form.Item>


                    <Form.Item
                        labelCol={{ span: 24 }} //whole column
                        label="Email"
                        name="email"
                        rules={[{ required: true, message: 'Email không được để trống!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        labelCol={{ span: 24 }} //whole column
                        label="Mật khẩu"
                        name="password"
                        rules={[{ required: true, message: 'Mật khẩu không được để trống!' }]}
                    >
                        <Input.Password />
                    </Form.Item>
                    <Form.Item
                        labelCol={{ span: 24 }} //whole column
                        label="Số điện thoại"
                        name="phone"
                        rules={[{ required: true, message: 'Số điện thoại không được để trống!' }]}
                    >
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}
export default UserAddDetail;