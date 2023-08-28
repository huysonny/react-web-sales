import { Modal, Form, Input, message, notification } from 'antd';
import { useEffect } from 'react';
import { callUpdateUser } from '../../../services/api';
const UserUpdateDetail = (props) => {
    const { dataUpdate, setDataUpdate, openUpdateDetail, SetOpenUpdateDetail } = props;
    const [form] = Form.useForm();
    const handleOk = () => {
        SetOpenUpdateDetail(false);
    };
    const handleCancel = () => {
        SetOpenUpdateDetail(false);
        setDataUpdate(null);
    };
    useEffect(() => {
        form.setFieldsValue(dataUpdate);

    }, [dataUpdate])
    const onFinish = async (value) => {
        const { fullName, _id, phone } = value;
        let res = await callUpdateUser(_id, fullName, phone);
        if (res.data) {
            message.success("Cập nhật thành công");
            SetOpenUpdateDetail(false);
            props.fetchUser();
        }
        else {
            notification.error({
                message: 'Đã có lỗi xảy ra',
                description: res.message
            })
        }
    }
    return (
        <>
            <Modal title="Basic Modal" open={openUpdateDetail} onOk={() => { form.submit() }} onCancel={handleCancel} >
                <Form
                    name="basic"
                    form={form}
                    style={{ maxWidth: 600 }}
                    onFinish={onFinish}
                    autoComplete="off"
                >
                    <Form.Item
                        hidden
                        labelCol={{ span: 24 }} //whole column
                        label="Id"
                        name="_id"
                        rules={[{ required: true, message: 'Vui lòng nhập Id!' }]}
                    >
                        <Input />
                    </Form.Item>
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
                        <Input disabled />
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
export default UserUpdateDetail;