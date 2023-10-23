import { AntDesignOutlined, UploadOutlined } from "@ant-design/icons";
import {
    Avatar,
    Button,
    Col,
    Row,
    Upload,
    message,
    Form,
    Input,
    notification,
} from "antd";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { callUpdateAvatar, callUpdateUserInfo } from "../../services/api";
import {
    doUpdateAvatarAction,
    doUpdateUserInfoAction,
} from "../../redux/account/accountSlice";

const UserInfo = (props) => {
    console.log("check props", props);
    const { tempAvatar, setTempAvatar } = props;
    const user = useSelector((state) => state.account.user);
    const [userAvatar, setUserAvartar] = useState(user?.avatar ?? "");
    const [isSubmit, setIsSubmit] = useState(false);
    const dispatch = useDispatch();
    const urlAvatar = `${import.meta.env.VITE_BACKEND_URL}/images/avatar/${
        tempAvatar || user?.avatar
    }`;
    const handleUploadAvatar = async ({ file, onSuccess, onError }) => {
        const res = await callUpdateAvatar(file);
        console.log("check res", res);
        if (res && res.data) {
            const newAvatar = res.data.fileUploaded;
            console.log(newAvatar);
            dispatch(doUpdateAvatarAction({ avatar: newAvatar }));
            setUserAvartar(newAvatar);
            console.log(userAvatar);
            setTempAvatar(newAvatar);
            onSuccess("ok");
        } else {
            onError("Đã có lỗi khi upload file");
        }
    };
    const propsUpload = {
        maxCount: 1,
        multiple: false,
        showUploadList: false,
        customRequest: handleUploadAvatar,
        onChange(info) {
            console.log("info", info);
            if (info.file.status !== "uploading") {
            }
            if (info.file.status === "done") {
                message.success(`upload file thành công`);
            } else if (info.file.status === "error") {
                message.error("upload file thất bại");
            }
        },
    };
    const onFinish = async (values) => {
        const { _id, fullName, email, phone } = values;
        setIsSubmit(true);
        const res = await callUpdateUserInfo(_id, phone, fullName, userAvatar);
        if (res && res.data) {
            dispatch(
                doUpdateUserInfoAction({ avatar: userAvatar, phone, fullName })
            );
            message.success("Cập nhật thông tin user thành công");
            // renew token
            localStorage.removeItem("access_token");
        } else {
            notification.error({
                message: "Đã có lỗi xảy ra ",
                description: res.message,
            });
        }
        setIsSubmit(false);
    };
    console.log("check user", user.email);
    return (
        <>
            <div style={{ minHeight: 400 }}>
                <Row>
                    <Col sm={24} md={12}>
                        <Row gutter={[30, 30]}>
                            <Col span={24}>
                                <Avatar
                                    size={{
                                        xs: 32,
                                        sm: 64,
                                        md: 80,
                                        lg: 12,
                                        xl: 160,
                                        xxl: 200,
                                    }}
                                    icon={<AntDesignOutlined />}
                                    src={urlAvatar}
                                    shape="circle"
                                />
                            </Col>
                            <Col span={24}>
                                <Upload {...propsUpload}>
                                    <Button icon={<UploadOutlined />}>
                                        Upload Avatar
                                    </Button>
                                </Upload>
                            </Col>
                        </Row>
                    </Col>
                    <Col sm={24} md={12}>
                        <Form
                            name="basic"
                            // style={{ maxWidth: 600, margin: '0 auto' }}
                            onFinish={onFinish}
                            autoComplete="off"
                        >
                            <Form.Item
                                labelCol={{ span: 24 }} //whole column
                                label="Email"
                                name="_id"
                                rules={[
                                    {
                                        required: true,
                                        message: "Email không được để trống!",
                                    },
                                ]}
                                initialValue={user.id}
                                hidden
                            >
                                <Input />
                            </Form.Item>
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
                                label="Họ tên"
                                name="fullName"
                                rules={[
                                    {
                                        required: true,
                                        message: "Họ tên không được để trống!",
                                    },
                                ]}
                                initialValue={user?.fullName}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                labelCol={{ span: 24 }} //whole column
                                label="Số điện thoại"
                                name="phone"
                                rules={[
                                    {
                                        required: true,
                                        message:
                                            "Số điện thoại không được để trống!",
                                    },
                                ]}
                                initialValue={user?.phone}
                            >
                                <Input />
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
export default UserInfo;
