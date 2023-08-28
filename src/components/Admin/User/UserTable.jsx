import { Button, Table } from 'antd';
import InputSearch from './InputSearch';
import { useEffect, useState } from 'react';
import { callFetchListUser } from '../../../services/api';
import { ExportOutlined, ImportOutlined, PlusOutlined, ReloadOutlined } from '@ant-design/icons';
import './UserTable.scss'
import UserViewDetail from './UserViewDetail';
import UserAddDetail from './UserAddDetail';
import UserImport from './UserImport';
const UserTable = () => {
    const [listUser, setListUser] = useState([]);
    const [current, setCurrent] = useState(1);
    const [pageSize, setPageSize] = useState(2);
    const [total, setTotal] = useState(0);
    const [isLoading, setLoading] = useState(false);
    const [filter, setFilter] = useState('');
    const [sorter, setSorter] = useState('');
    const [openViewDetail, setOpenViewDetail] = useState(false);
    const [dataViewDetail, setDataViewDetail] = useState();
    const [openAddDetail, setOpenAddDetail] = useState(false);
    const [openUserImport, setOpenUserImport] = useState(false);
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
                        <button>Delte</button>
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
    const handleReload = () => {
        setFilter("");
        setSorter("");
    }
    const renderHeader = () => {
        return (
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Table List Users</span>
                <span style={{ display: 'flex', gap: 15 }}>
                    <Button icon={<ExportOutlined />} type='primary'>
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

        </>
    )
}
export default UserTable;