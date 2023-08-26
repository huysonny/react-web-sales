import { Table } from 'antd';
import InputSearch from './InputSearch';
import { useEffect, useState } from 'react';
import { callFetchListUser } from '../../../services/api';
import { ReloadOutlined } from '@ant-design/icons';
import './UserTable.scss'
const UserTable = () => {
    const [listUser, setListUser] = useState([]);
    const [current, setCurrent] = useState(1);
    const [pageSize, setPageSize] = useState(2);
    const [total, setTotal] = useState(0);
    const [isLoading, setLoading] = useState(false);
    const [filter, setFilter] = useState('');
    const [sorter, setSorter] = useState('');
    const columns = [
        {
            title: 'Id',
            dataIndex: '_id',
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
        fetchUser();
    }

    return (
        <>
            <div className="crud-container">
                <div className="input_filter">
                    <InputSearch setFilter={setFilter} />
                </div>
                <div className='icon'>
                    <div onClick={() => handleReload()} >
                        <ReloadOutlined />
                    </div>
                </div>
                <div className="table">
                    <Table columns={columns} rowKey="_id" dataSource={listUser} onChange={onChange}
                        pagination={{ current: current, pageSize: pageSize, showSizeChanger: true, total: total }}
                        isLoading={isLoading} />
                </div>
            </div>
        </>
    )
}
export default UserTable;