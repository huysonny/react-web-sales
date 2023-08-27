import { useState } from "react";
import { VscSearchFuzzy } from 'react-icons/vsc';
import { FaReact } from 'react-icons/fa'
import { Drawer, Divider, Badge, message, Avatar } from 'antd';
import { FiShoppingCart } from 'react-icons/fi';
import { useDispatch, useSelector } from "react-redux";
import { Dropdown, Space } from 'antd';
import './header.scss'
import { Link, useNavigate } from "react-router-dom";
import { DownOutlined } from '@ant-design/icons';
import { callLogout } from "../../services/api";
import { doLogOutAction } from "../../redux/account/accountSlice";
const Header = () => {
    const [OpenDrawer, setOpenDrawer] = useState(false);
    const isAuthenticated = useSelector(state => state.account.isAuthenticated);
    const user = useSelector(state => state.account.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    let itemsDropsdown = [
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
    if (user?.role === 'ADMIN') {
        itemsDropsdown.unshift({ label: <Link to="/admin">Trang quản trị</Link>, key: 'admin' })
    }
    const handleLogout = async () => {
        let res = await callLogout();
        if (res && res.data) {
            message.success("Đăng Xuất Thành Công");
            navigate("/");
            dispatch(doLogOutAction());
        }
    }
    const urlAvatar = `${import.meta.env.VITE_BACKEND_URL}/images/avatar/${user?.avatar}`;
    return (
        <>
            <div className="header-container">
                <header className="page-header">
                    <div className="page-header__top">
                        <div className="page-header__toggle" onClick={() => {
                            setOpenDrawer(true)
                        }}>☰</div>
                        <div className="page-header__logo">
                            <span className="logo">
                                <FaReact className='rotate icon-react' /> Thanh Huy
                                <VscSearchFuzzy className='icon-search' />
                            </span>
                            <input className="input-search" type={'text'} placeholder="Bạn tìm gì hôm nay" />
                        </div>
                    </div>
                    <nav className="page-header__bottom">
                        <ul id="navigation" className="navigation">
                            <li className="navigation__item">
                                <Badge
                                    count={5}
                                    size={"small"}
                                >
                                    <FiShoppingCart className='icon-cart' />
                                </Badge>
                            </li>
                            <li className="navigation__item mobile"><Divider type='vertical' /></li>
                            <li className="navigation__item mobile">
                                {!isAuthenticated ?
                                    <span onClick={() => navigate('/login')}> Tài Khoản</span>
                                    :
                                    <Dropdown menu={{ items: itemsDropsdown }} trigger={['click']}>
                                        <a onClick={(e) => e.preventDefault()}>
                                            <Space>
                                                <Avatar src={urlAvatar} />
                                                {user?.fullName}
                                                <DownOutlined />
                                            </Space>
                                        </a>
                                    </Dropdown>
                                }
                            </li>
                        </ul>
                    </nav>
                </header>
            </div>
            <Drawer title="Menu chức năng" placement="left" onClose={() => setOpenDrawer(false)} open={OpenDrawer}>
                <p>Quản lý tài khoản</p>
                <Divider />

                <p>Đăng xuất</p>
                <Divider />
            </Drawer>
        </>
    )
}
export default Header;