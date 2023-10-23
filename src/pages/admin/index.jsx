import { useEffect, useState } from "react";
import { callFetchDashBoard } from "../../services/api";
import CountUp from 'react-countup';
import { Card, Col, Row, Statistic } from 'antd';
const AdminPage = () => {
    const [dataDashboard, setDataDashboard] = useState({
        countOrder: 0,
        countUser: 0
    })
    useEffect(() => {
        const initDashboard = async () => {
            const res = await callFetchDashBoard();
            if (res && res.data) {
                setDataDashboard(res.data);
            }
        }
        initDashboard()
    }, [])
    const formatter = (value) => <CountUp end={value} separator="," />;
    return (
        <>
            <Row gutter={[40, 40]}>
                <Col span={10}>
                    <Card title="" bordered={false}>
                        <Statistic title="Tổng số lượng người dùng"
                            value={dataDashboard.countUser}
                            formatter={formatter}
                        />
                    </Card>
                </Col>
                <Col span={10}>
                    <Card title="" bordered={false}>
                        <Statistic title="Tổng số lượng đơn hàng"
                            value={dataDashboard.countOrder}
                            formatter={formatter}
                        />
                    </Card>
                </Col>
            </Row>
        </>
    )
}
export default AdminPage;