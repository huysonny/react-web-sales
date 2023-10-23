import { useEffect, useState } from "react";
import moment from 'moment/moment';

import { Button, Popconfirm, Table, message, notification } from 'antd';
import { DeleteTwoTone, EditTwoTone, ExportOutlined, PlusOutlined, ReloadOutlined } from "@ant-design/icons";
import { callListOrder } from "../../../services/api";
const Order = (props) => {
    const [listOrder, setListOrder] = useState([]);
    const [current, setCurrent] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [total, setTotal] = useState(0);
    const [isLoading, setLoading] = useState(false);
    const [filter, setFilter] = useState('');
    const [sortQuery, setSortQuery] = useState("sort=-updatedAt");
    const columns = [
        {
            title: 'Id',
            dataIndex: '_id',
        },
        {
            title: 'Tổng số tiền',
            dataIndex: 'totalPrice',
            sorter: true,
            render: (text) => {
                const formattedPrice = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(text);
                return formattedPrice;
            }
        },
        {
            title: 'Họ tên',
            dataIndex: 'name',
            sorter: true
        },
        {
            title: 'Adress',
            dataIndex: 'address',
            sorter: true
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'phone',
            sorter: true,
            render: (text) => {
                const formattedPrice = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(text);
                return formattedPrice;
            }
        },
        {
            title: 'Ngày cập nhật',
            dataIndex: 'createdAt',
            sorter: true,
            render: (text, record) => {
                const formattedDate = moment(text).format('DD/MM/YYYY HH:mm:ss'); // Định dạng ngày tháng theo mong muốn
                return formattedDate;
            }
        },

    ];
    const handleDelteUser = async (id) => {
        let res = await callDeleteBook(id);
        if (res && res.data) {
            message.success("Xóa thành công")
            fetchListOrder();
        } else {
            notification.error({
                message: 'Có lỗi xảy ra',
                description: res.message
            })
        }
    }

    useEffect(() => {
        fetchListOrder();
    }, [current, pageSize, filter, sortQuery])
    const fetchListOrder = async () => {
        setLoading(true);
        let query = `current=${current}&pageSize=${pageSize}&${filter}&${sortQuery}`;
        let res = await callListOrder(query);
        if (res && res.data) {
            setListOrder(res.data.result);
            setTotal(res.data.meta.total);
        }
    }
    const handleReload = () => {
        setFilter("");
        setSortQuery("");
    }

    const onChange = (pagination, filters, sorter, extra) => {
        if (pagination && pagination.current !== current) {
            setCurrent(pagination.current);
        }
        if (pagination && pagination.pageSize !== pageSize) {
            setPageSize(pagination.pageSize);
            setCurrent(1);
        }
        if (sorter && sorter.field) {
            const q = sorter.order === `ascend` ? `sort=${sorter.field}` : `sort=-${sorter.field}`;
            setSortQuery(q);
        }
    };
    return (
        <>
            <div className="crud-container">
                <div className="table" style={{ marginTop: "50px" }}>
                    <Table columns={columns} rowKey="_id" dataSource={listOrder} onChange={onChange}

                        pagination={{
                            current: current,
                            pageSize: pageSize,
                            showSizeChanger: true,
                            total: total,
                            showTotal: (total, range) => { return (<div> {range[0]}-{range[1]} trên {total} rows</div>) }
                        }}
                        isLoading={isLoading} />
                </div>
            </div>
        </>
    )
}
export default Order;