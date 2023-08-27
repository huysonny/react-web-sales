
import { AppstoreAddOutlined, UserOutlined, TeamOutlined, ExceptionOutlined, DollarCircleOutlined, MenuUnfoldOutlined, DownOutlined, HeartTwoTone } from '@ant-design/icons';
import { Layout, Menu, Dropdown, Space, message, Avatar } from 'antd';
import Sider from 'antd/es/layout/Sider';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
const { Content, Footer, sider } = Layout;
import { Outlet, useNavigate, Link } from "react-router-dom";
import './LayoutAdmin.scss';
import { callLogout } from '../../services/api';
import { doLogOutAction } from '../../redux/account/accountSlice';
const items = [
    {
        label: <Link to="/admin">Dashboard</Link>,
        key: 'dashboard',
        icon: <AppstoreAddOutlined />
    },
    {
        label: <span>Manage Users</span>,
        icon: <UserOutlined />,
        children: [
            {
                label: <Link to="/admin/user">CRUD</Link>,
                key: 'crud',
                icon: <TeamOutlined />
            },
            {
                label: 'Files1',
                key: 'file1',
                icon: <TeamOutlined />
            }
        ]
    },
    {
        label: <Link to='/admin/book'>Manage Books</Link>,
        key: 'book',
        icon: <ExceptionOutlined />
    },
    {
        label: <Link to='/admin/order'>Manage Orders</Link>,
        key: 'order',
        icon: <DollarCircleOutlined />
    },

]
const LayoutAdmin = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [activeMenu, setActiveMenu] = useState('dashboard');
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const itemsDropsdown = [
        {
            label: <label style={{ cursor: 'pointer' }}>Quản lý tài khoản</label>,
            key: 'account',
        },
        {
            label: <label
                style={{ cursor: 'pointer' }} onClick={() => handleLogout()}
            >Đăng xuất</label>,
            key: 'logout',
        }
    ]
    const handleLogout = async () => {
        let res = await callLogout();
        if (res && res.data) {
            message.success("Đăng Xuất Thành Công");
            navigate("/");
            dispatch(doLogOutAction());
        }
    }
    const user = useSelector(state => state.account.user);
    const urlAvatar = `${import.meta.env.VITE_BACKEND_URL}/images/avatar/${user?.avatar}`;
    return (
        <>
            <Layout style={{ minHeight: '100vh' }} className='layout-admin'>
                <Sider theme='light' collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                    <div style={{ height: 32, margin: 16, textAlign: 'center' }}>Admin</div>
                    <Menu
                        defaultSelectedKeys={[activeMenu]}
                        mode='inline'
                        items={items}
                        onClick={(e) => setActiveMenu(e.key)}
                    >

                    </Menu>
                </Sider>
                <Layout>
                    <div className='admin-header'>
                        <span >
                            <MenuUnfoldOutlined className="trigger" onClick={() => setCollapsed(!collapsed)} />
                        </span>
                        <Dropdown menu={{ items: itemsDropsdown }} trigger={['click']}>
                            <a onClick={(e) => e.preventDefault()}>
                                <Space>
                                    <Avatar src={urlAvatar} /> {user?.fullName}
                                    <DownOutlined />
                                </Space>
                            </a>
                        </Dropdown>
                    </div>
                    <Content>
                        <Outlet />
                    </Content>
                    <Footer style={{ padding: 0 }}>
                        {/* React Test Fresher &copy; Hỏi Dân IT - Made with <HeartTwoTone /> */}
                    </Footer>
                </Layout>
            </Layout>
        </>
    )
}
export default LayoutAdmin;