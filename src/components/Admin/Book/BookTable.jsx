import { useEffect, useState } from "react";
import InputSearchBook from "./InputSearchBook";
import { callDeleteBook, callFetchListBook } from "../../../services/api";
import { Button, Popconfirm, Table, message, notification } from 'antd';
import { DeleteTwoTone, EditTwoTone, ExportOutlined, PlusOutlined, ReloadOutlined } from "@ant-design/icons";
import moment from 'moment/moment';
import BookViewDetail from "./BookViewDetail";
import BookModalCreate from "./BookModalCreate";
import BookModalUpdate from "./BookModalUpdate";
import * as XLSX from 'xlsx';
const BookTable = (props) => {
    const [listBook, setListBook] = useState([]);
    const [current, setCurrent] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [total, setTotal] = useState(0);
    const [isLoading, setLoading] = useState(false);
    const [filter, setFilter] = useState('');
    const [sortQuery, setSortQuery] = useState("sort=-updatedAt");
    const [openViewDetail, setOpenViewDetail] = useState(false);
    const [dataViewDetail, setDataViewDetail] = useState();
    const [openModalCreateBook, setOpenModalCreateBook] = useState(false);
    const [openModalUpdateBook, setOpenModalUpdateBook] = useState(false);
    const [dataUpdate, setDataUpdate] = useState([]);
    const columns = [
        {
            title: 'Id',
            dataIndex: '_id',
            render: (text, record, index) => {
                return (
                    <a href='#' onClick={() => {
                        setOpenViewDetail(true);
                        setDataViewDetail(record);
                    }}>{record._id}</a>
                )
            }
        },
        {
            title: 'Tên sách',
            dataIndex: 'mainText',
            sorter: true
        },
        {
            title: 'Thể loại',
            dataIndex: 'category',
            sorter: true
        },
        {
            title: 'Tác giả',
            dataIndex: 'author',
            sorter: true
        },
        {
            title: 'Giá tiền',
            dataIndex: 'price',
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
        {
            title: 'Action',
            render: (text, record, index) => {
                return (
                    <>
                        <Popconfirm
                            placement='leftTop'
                            title={"xác nhận xóa user"}
                            description={"Bạn có chắc chắn muốn xóa user này ? "}
                            onConfirm={() => handleDelteUser(record._id)}
                            okText="Xác nhận"
                            cancelText="Hủy"
                        >
                            <span style={{
                                cursor: "pointer", margin: "0 20px"
                            }}>
                                <DeleteTwoTone twoToneColor="#ff4df" />
                            </span>
                        </Popconfirm>
                        <span style={{
                            cursor: "pointer", margin: "0 20px"
                        }} onClick={() => {
                            setDataUpdate(record);
                            setOpenModalUpdateBook(true);
                        }}>
                            <EditTwoTone
                                twoToneColor="#f57800"
                                style={{ cursor: "pointer" }
                                }

                            />
                        </span>
                    </>
                )
            }
        },
    ];
    const handleDelteUser = async (id) => {
        let res = await callDeleteBook(id);
        if (res && res.data) {
            message.success("Xóa thành công")
            fetchListBook();
        } else {
            notification.error({
                message: 'Có lỗi xảy ra',
                description: res.message
            })
        }
    }
    const handleExportData = () => {
        if (listBook.length > 0) {
            const worksheet = XLSX.utils.json_to_sheet(listBook);
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
            XLSX.writeFile(workbook, "ExportUser.csv");
        }
    }
    useEffect(() => {
        fetchListBook();
    }, [current, pageSize, filter, sortQuery])
    const fetchListBook = async () => {
        setLoading(true);
        let query = `current=${current}&pageSize=${pageSize}&${filter}&${sortQuery}`;
        let res = await callFetchListBook(query);
        if (res && res.data) {
            setListBook(res.data.result);
            setTotal(res.data.meta.total);
        }
    }
    const handleReload = () => {
        setFilter("");
        setSortQuery("");
    }
    const renderHeader = () => {
        return (
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Table List Users</span>
                <span style={{ display: 'flex', gap: 15 }}>
                    <Button icon={<ExportOutlined />} type='primary' onClick={() => handleExportData()}>
                        Export
                    </Button>
                    <Button icon={<PlusOutlined />} type='primary' onClick={() => setOpenModalCreateBook(true)}>
                        Thêm mới
                    </Button>
                    <Button type='ghost' onClick={() => handleReload()}>
                        <ReloadOutlined />
                    </Button>
                </span>
            </div>
        )
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
                <div className="input_filter">
                    <InputSearchBook setFilter={setFilter} />
                </div>
                <div className="table">
                    <Table columns={columns} rowKey="_id" dataSource={listBook} onChange={onChange}
                        title={renderHeader}
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
            <BookViewDetail
                dataViewDetail={dataViewDetail}
                setDataViewDetail={setDataViewDetail}
                openViewDetail={openViewDetail}
                setOpenViewDetail={setOpenViewDetail}
            />
            <BookModalCreate
                openModalCreateBook={openModalCreateBook}
                setOpenModalCreateBook={setOpenModalCreateBook}
                fetchListBook={fetchListBook}
            />
            <BookModalUpdate
                openModalUpdateBook={openModalUpdateBook}
                setOpenModalUpdateBook={setOpenModalUpdateBook}
                dataUpdate={dataUpdate}
                setDataUpdate={dataUpdate}
                fetchListBook={fetchListBook}
            />
        </>
    )
}
export default BookTable;