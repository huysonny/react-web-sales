import { DeleteOutlined } from "@ant-design/icons";
import { Col, Divider, InputNumber, Row } from "antd";
import './order.scss';
import { useDispatch, useSelector } from "react-redux";
import { doDeleteItemCartAction, doUpdateCartAction } from "../../redux/order/orderSlice";
import { useEffect, useState } from "react";
import { Empty, Steps } from 'antd';
import Payment from "./Payment";
import Result from "./Result";
const ViewOder = (props) => {
    const carts = useSelector(state => state.order.carts);
    const dispatch = useDispatch();
    //console.log("check carts>>>", carts);
    const [totalPrice, setTotalPrice] = useState(0);
    const { currentStep, setCurrentStep } = props;
    useEffect(() => {
        if (carts && carts.length > 0) {
            let sum = 0;
            carts.map(item => {
                sum += item.quantity * item.detail.price;
            })
            setTotalPrice(sum);
        } else {
            setTotalPrice(0);
        }
    }, [carts])
    const handleOnChangeInput = (value, book) => {
        if (!value || value < 1) return;
        if (!isNaN(value)) {
            dispatch(doUpdateCartAction({ quantity: value, detail: book, _id: book._id }));
        }
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
                                    <span>  Tạm tính</span>
                                    <span>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(totalPrice)}</span>
                                </div>
                                <Divider style={{ margin: "10px 0" }} />
                                <div className='calculate'>
                                    <span> Tổng tiền</span>
                                    <span className='sum-final'> {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(totalPrice)}</span>
                                </div>
                                <Divider style={{ margin: "10px 0" }} />
                                <button onClick={() => setCurrentStep(1)}>Mua Hàng ({carts.length})</button>
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>
        </>
    )
}
export default ViewOder;