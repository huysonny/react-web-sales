import { Table } from 'antd';
import InputSearch from './InputSearch';
import { useEffect, useState } from 'react';
import { callFetchListUser } from '../../../services/api';
const UserTable = () => {
    const [listUser, setListUser] = useState([]);
    const [current, setCurrent] = useState(1);
    const [pageSize, setPageSize] = useState(2);
    const [total, setTotal] = useState(0);
    const [isLoading, setLoading] = useState(false);
    const [filter, setFilter] = useState('');
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
    }, [current, pageSize])
    const fetchUser = async (searchFilter) => {
        setLoading(true);
        let query = `current=${current}&pageSize=${pageSize}+`;
        if (searchFilter) {
            query += `&${searchFilter}`;
        }
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
        console.log('params', pagination);
    };
    const handleSearch = (query) => {
        fetchUser(query);
    }
    return (
        <>
            <div className="crud-container">
                <div className="input_filter">
                    <InputSearch handleSearch={handleSearch} />
                </div>
                <div className="table">
                    <Table columns={columns} rowKey="_id" dataSource={listUser} onChange={onChange} pagination={{ current: current, pageSize: pageSize, showSizeChanger: true, total: total }} isLoading={isLoading} />
                </div>
            </div>
        </>
    )
}
export default UserTable;