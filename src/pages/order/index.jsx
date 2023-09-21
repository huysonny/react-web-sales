import { useState } from "react";
import { Button, Result, Steps } from 'antd';
import "./order.scss";
import ViewOder from "./ViewOder";
import Payment from "./Payment";
import { SmileOutlined } from "@ant-design/icons";
const OrderPage = (props) => {
    const [currentStep, setCurrentStep] = useState(0);
    return (
        <div style={{ background: "#efefef", padding: "20px 0" }}>
            <div className="order-container" style={{ maxWidth: 1440, margin: '0 auto', height: "100vh" }}>
                <div className="order-steps">
                    <Steps
                        size="small"
                        current={currentStep}
                        status={"finish"}
                        items={[
                            {
                                title: 'Đơn Hàng',

                            },
                            {
                                title: 'Đặt Hàng',

                            },
                            {
                                title: 'Thanh Toán',

                            },
                        ]}
                    />
                </div>
                {currentStep === 0 &&
                    <ViewOder currentStep={currentStep} setCurrentStep={setCurrentStep} />
                }
                {
                    currentStep === 1 &&
                    <Payment currentStep={currentStep} setCurrentStep={setCurrentStep} />
                }
                {
                    currentStep === 2 &&
                    <Result
                        icon={<SmileOutlined />}
                        title="Đơn hàng đã được đặt thành công !"
                        extra={<Button type="primary">Xem lịch sử</Button>}
                    />
                }
            </div>
        </div>
    )
}
export default OrderPage;