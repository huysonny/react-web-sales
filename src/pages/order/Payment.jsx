import { DeleteOutlined } from "@ant-design/icons";
import { Col, Divider, Form, InputNumber, Row, Input, Button, Checkbox } from "antd";
import './order.scss';
import { useDispatch, useSelector } from "react-redux";
import { doDeleteItemCartAction, doOrderAction, doUpdateCartAction } from "../../redux/order/orderSlice";
import { useEffect, useState } from "react";
import { Empty, Steps } from 'antd';
const Payment = (props) => {
    const carts = useSelector(state => state.order.carts);
    const dispatch = useDispatch();
    const { currentStep, setCurrentStep } = props;
    const [totalPrice, setTotalPrice] = useState(0);
    const user = useSelector(state => state.account.user);
    console.log("check", user);
    const onFinish = (values) => {
        console.log("check", values)
    }
    const { TextArea } = Input;
    const order = () => {
        setCurrentStep(2);
        dispatch(doOrderAction());
    }
    return (
        <>
            <div style={{ background: "#efefef", padding: "20px 0" }}>
                <div className="order-container" style={{ maxWidth: 1440, margin: '0 auto' }}>
                    <Row gutter={[20, 20]}>
                        <Col md={18} xs={24}>
                            {carts.map((book, index) => {
                                return (
                                    <div className="order-book" key={`book-${index}`}>
                                        <div className="book-content">
                                            <img src={`${import.meta.env.VITE_BACKEND_URL}/images/book/${book?.detail?.thumbnail}`} />
                                            <div className="title">
                                                {book.detail.mainText}
                                            </div>
                                            <div className="price">
                                                {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(book?.detail?.price ?? 0)}
                                            </div>
                                        </div>
                                        <div className="action">
                                            <div className="quantity">
                                                <InputNumber value={book.quantity} onChange={(value) => handleOnChangeInput(value, book)} />
                                            </div>
                                            <div className='sum'>
                                                Tổng: {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(book.quantity * book?.detail?.price)}
                                            </div>
                                            <DeleteOutlined
                                                style={{ cursor: "pointer" }}
                                                onClick={() => dispatch(doDeleteItemCartAction({ _id: book._id }))}
                                                twoToneColor="#eb2f96"
                                            />
                                        </div>
                                    </div>
                                )
                            })}
                            {carts.length === 0 &&
                                <div className="order-book-empty">
                                    <Empty description="Không có sản phẩm trong giỏ hàng" />
                                </div>
                            }
                        </Col>
                        <Col md={6} xs={24}>
                            <div className='order-sum'>
                                <div className='calculate'>
                                    <Form
                                        name="basic"
                                        // style={{ maxWidth: 600, margin: '0 auto' }}
                                        onFinish={onFinish}
                                        autoComplete="off"
                                    >
                                        <Form.Item
                                            labelCol={{ span: 24 }} //whole column
                                            label="Tên người nhận"
                                            name="name"
                                            rules={[{ required: true, message: 'Tên người nhận không để trống' }]}
                                        >
                                            <Input defaultValue={user.fullName} />
                                        </Form.Item>

                                        <Form.Item
                                            labelCol={{ span: 24 }} //whole column
                                            label="Số Điện Thoại"
                                            name="numberPhone"
                                            rules={[{ required: true, message: 'Không được để trống số điện thoại' }]}
                                        >
                                            <Input defaultValue={user.phone} />
                                        </Form.Item>
                                        <Form.Item
                                            labelCol={{ span: 24 }} //whole column
                                            label="Địa chỉ"
                                            name="address"
                                            rules={[{ required: true, message: 'Không được để trống địa chỉ' }]}
                                        >
                                            <TextArea rows={4} style={{
                                                resize: 'none',
                                            }} />
                                        </Form.Item>
                                        <Form.Item
                                            labelCol={{ span: 24 }} //whole column
                                            label="Hình thức thanh toán "
                                            name="
                                            payments"
                                        >
                                            <Checkbox checked={true}>Thanh toán khi nhận hàng</Checkbox>
                                        </Form.Item>
                                    </Form>
                                </div>
                                <Divider style={{ margin: "10px 0" }} />
                                <button onClick={() => order()}>Mua Hàng ({carts.length})</button>
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>
        </>
    )
}
export default Payment;