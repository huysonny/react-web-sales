import { Space, Table, Tag } from 'antd';
import { useEffect } from 'react';
import { callHistory } from '../../services/api';
import { useState } from 'react';
import ReactJson from 'react-json-view';
import moment from 'moment/moment';
const OrderHistory = (props) => {
    const [listHistoryOrder, setListHistoryOrder] = useState([]);
    const columns = [
        {
            title: 'STT',
            dataIndex: 'index',
            render: (text, record, index) => index + 1, // Tạo STT ảo từ index + 
        },
        {
            title: 'Thời gian',
            dataIndex: 'createdAt',
            render: (text, record) => {
                const formattedDate = moment(text).format('DD/MM/YYYY HH:mm:ss'); // Định dạng ngày tháng theo mong muốn
                return formattedDate;
            }
        },
        {
            title: 'Tổng số tiền',
            dataIndex: 'totalPrice',
            render: (text) => {
                const formattedPrice = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(text);
                return formattedPrice;
            }
        },
        {
            title: 'Trạng Thái',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Tag color="volcano">Thành Công</Tag>
                </Space>
            ),
        },
        {
            title: 'Chi tiết đơn hàng',
            dataIndex: 'detail',
            render: (detail) => {
                return (
                    <ReactJson
                        src={detail}
                        name="chi tiết đơn hàng"
                        theme="rjv-default"
                        collapsed={true}
                        enableClipboard={false}
                        displayDataTypes={false}

                    />
                );
            },
        }

    ];
    useEffect(() => {
        getHistory();
    }, [])
    const getHistory = async () => {
        let res = await callHistory();
        console.log("check res", res);
        setListHistoryOrder(res.data);
    }
    return (
        <>
            <div style={{ marginTop: "100px" }}>
                <Table columns={columns} dataSource={listHistoryOrder} />
            </div>
        </>
    )
}
export default OrderHistory;