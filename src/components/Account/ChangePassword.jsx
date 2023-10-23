import {
    Avatar,
    Button,
    Col,
    Row,
    Upload,
    message,
    Divider,
    Form,
    Input,
    notification,
} from "antd";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { callUpdatePassword } from "../../services/api";

const ChangePassWord = (props) => {
    const user = useSelector((state) => state.account.user);
    const [form] = Form.useForm();
    const [isSubmit, setIsSubmit] = useState(false);
    const onFinish = async (values) => {
        const { email, oldPass, newPass } = values;
        setIsSubmit(true);
        const res = await callUpdatePassword(email, oldPass, newPass);
        if (res && res.data) {
            message.success("Đổi mậu khẩu thành công");
            form.setFieldValue("oldPass", "");
            form.setFieldValue("newPass", "");
        } else {
            notification.error({
                message: "Có lỗi xảy ra ",
                description: res.message,
            });
        }
        setIsSubmit(false);
    };
    return (
        <>
            <div style={{ minHeight: 400 }}>
                <Row style={{ display: "flex", justifyContent: "center" }}>
                    <Col sm={24} md={12}>
                        <Form
                            name="basic"
                            // style={{ maxWidth: 600, margin: '0 auto' }}
                            onFinish={onFinish}
                            autoComplete="off"
                            form={form}
                        >
                            <Form.Item
                                labelCol={{ span: 24 }} //whole column
                                label="Email"
                                name="email"
                                rules={[
                                    {
                                        required: true,
                                        message: "Email không được để trống!",
                                    },
                                ]}
                                initialValue={user.email}
                            >
                                <Input disabled />
                            </Form.Item>
                            <Form.Item
                                labelCol={{ span: 24 }} //whole column
                                label="Mật khẩu hiện tại"
                                name="oldPass"
                                rules={[
                                    {
                                        required: true,
                                        message:
                                            "Mật khẩu không được để trống!",
                                    },
                                ]}
                            >
                                <Input.Password />
                            </Form.Item>
                            <Form.Item
                                labelCol={{ span: 24 }} //whole column
                                label="Mật khẩu mới"
                                name="newPass"
                                rules={[
                                    {
                                        required: true,
                                        message:
                                            "Mật khẩu không được để trống!",
                                    },
                                ]}
                            >
                                <Input.Password />
                            </Form.Item>

                            <Form.Item
                            // wrapperCol={{ offset: 6, span: 16 }}
                            >
                                <Button htmlType="submit" loading={isSubmit}>
                                    Cập nhật
                                </Button>
                            </Form.Item>
                        </Form>
                    </Col>
                </Row>
            </div>
        </>
    );
};
export default ChangePassWord;
