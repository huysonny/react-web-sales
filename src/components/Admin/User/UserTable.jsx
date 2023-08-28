import { Button, Popconfirm, Table, message, notification } from 'antd';
import InputSearch from './InputSearch';
import { useEffect, useState } from 'react';
import { callFetchListUser, deleteUser } from '../../../services/api';
import { DeleteTwoTone, EditTwoTone, ExportOutlined, ImportOutlined, PlusOutlined, ReloadOutlined } from '@ant-design/icons';
import './UserTable.scss'
import UserViewDetail from './UserViewDetail';
import UserAddDetail from './UserAddDetail';
import UserImport from './UserImport';
import * as XLSX from 'xlsx';
import UserUpdateDetail from './UserUpdateDetail';
const UserTable = () => {
    const [listUser, setListUser] = useState([]);
    const [current, setCurrent] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [total, setTotal] = useState(0);
    const [isLoading, setLoading] = useState(false);
    const [filter, setFilter] = useState('');
    const [sorter, setSorter] = useState('');
    const [openViewDetail, setOpenViewDetail] = useState(false);
    const [dataViewDetail, setDataViewDetail] = useState();
    const [openAddDetail, setOpenAddDetail] = useState(false);
    const [openUserImport, setOpenUserImport] = useState(false);
    const [dataUpdate, setDataUpdate] = useState([]);
    const [openUpdateDetail, SetOpenUpdateDetail] = useState(false);
    const handleDelteUser = async (id) => {
        let res = await deleteUser(id);
        if (res && res.data) {
            message.success("Xóa user thành công")
            fetchUser();
        } else {
            notification.error({
                message: 'Có lỗi xảy ra',
                description: res.message
            })
        }

    }
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
            title: 'Tên hiển thị',
            dataIndex: 'fullName',
            sorter: true
        },
        {
            title: 'Email',
            dataIndex: 'email',
            sorter: true
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'phone',
            sorter: true
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
                            SetOpenUpdateDetail(true);
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
    useEffect(() => {
        fetchUser();
    }, [current, pageSize, filter, sorter])
    const fetchUser = async () => {
        setLoading(true);
        let query = `current=${current}&pageSize=${pageSize}&${filter}&${sorter}`;
        let res = await callFetchListUser(query);
        if (res && res.data) {
            setListUser(res.data.result);
            setTotal(res.data.meta.total);
        }
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
            setSorter(q);
        }
    };
    const handleExportData = () => {
        if (listUser.length > 0) {
            const worksheet = XLSX.utils.json_to_sheet(listUser);
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
            XLSX.writeFile(workbook, "ExportUser.csv");
        }
    }
    const handleReload = () => {
        setFilter("");
        setSorter("");
    }
    const renderHeader = () => {
        return (
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Table List Users</span>
                <span style={{ display: 'flex', gap: 15 }}>
                    <Button icon={<ExportOutlined />} type='primary' onClick={() => handleExportData()}>
                        Export
                    </Button>
                    <Button icon={<ImportOutlined />} type='primary' onClick={() => setOpenUserImport(true)}>
                        Import
                    </Button>
                    <Button icon={<PlusOutlined />} type='primary' onClick={() => setOpenAddDetail(true)}>
                        Thêm mới
                    </Button>
                    <Button type='ghost' onClick={() => handleReload()}>
                        <ReloadOutlined />
                    </Button>
                </span>
            </div>
        )
    }

    return (
        <>
            <div className="crud-container">
                <div className="input_filter">
                    <InputSearch setFilter={setFilter} />
                </div>
                <div className="table">
                    <Table columns={columns} rowKey="_id" dataSource={listUser} onChange={onChange}
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
            <UserViewDetail
                dataViewDetail={dataViewDetail}
                setDataViewDetail={setDataViewDetail}
                openViewDetail={openViewDetail}
                setOpenViewDetail={setOpenViewDetail} />
            <UserAddDetail
                openAddDetail={openAddDetail}
                setOpenAddDetail={setOpenAddDetail}
                fetchUser={fetchUser} />
            <UserImport
                openUserImport={openUserImport}
                setOpenUserImport={setOpenUserImport}
                fetchUser={fetchUser}
            />
            <UserUpdateDetail
                dataUpdate={dataUpdate}
                setDataUpdate={setDataUpdate}
                openUpdateDetail={openUpdateDetail}
                SetOpenUpdateDetail={SetOpenUpdateDetail}
                fetchUser={fetchUser}
            />

        </>
    )
}
export default UserTable;