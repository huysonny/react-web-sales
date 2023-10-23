import { useState } from "react";
import { VscSearchFuzzy } from 'react-icons/vsc';
import { FaReact } from 'react-icons/fa'
import { Drawer, Divider, Badge, message, Avatar, Popover, Button } from 'antd';
import { FiShoppingCart } from 'react-icons/fi';
import { useDispatch, useSelector } from "react-redux";
import { Dropdown, Space } from 'antd';
import './header.scss'
import { Link, useNavigate } from "react-router-dom";
import { DownOutlined } from '@ant-design/icons';
import { callLogout } from "../../services/api";
import { doLogOutAction } from "../../redux/account/accountSlice";
import ManageAcount from "../Account/ManageAcount";

const Header = (props) => {
    const [OpenDrawer, setOpenDrawer] = useState(false);
    const isAuthenticated = useSelector(state => state.account.isAuthenticated);
    const user = useSelector(state => state.account.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const carts = useSelector(state => state.order.carts);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [tempAvatar, setTempAvatar] = useState();
    let itemsDropsdown = [
        {
            label: <label style={{ cursor: 'pointer' }} onClick={() => setIsModalOpen(true)}>Quản lý tài khoản</label>,
            key: 'account',
        },
        {
            label: <label
                style={{ cursor: 'pointer' }} onClick={() => navigate("history")}
            >Lịch Sử Mua Hàng</label>,
            key: 'logout',
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
    const urlAvatar = `${import.meta.env.VITE_BACKEND_URL}/images/avatar/${tempAvatar || user?.avatar}`;
    const order = () => {
        if (isAuthenticated === false) {
            navigate("/login");
            message.error("Vui lòng đăng nhập để xem được giỏ hàng ");
        }
        else {
            navigate("order");
        }
    }
    const contentPopover = (
        <div className="pop-cart-body">
            <div className="pop-cart-content">
                {carts?.map((book, index) => {
                    return (
                        <div className="book" key={`book-${index}`}>
                            <img src={`${import.meta.env.VITE_BACKEND_URL}/images/book/${book?.detail?.thumbnail}`} />
                            <div>{book.detail.mainText}</div>
                            <div style={{ color: "red" }}> {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(book?.detail?.price ?? 0)}</div>
                        </div>
                    )
                })}
            </div>
            <div className="pop-cart-footer">
                <Button type="primary" danger onClick={() => order()}>Xem Giỏ Hàng</Button>
            </div>
        </div>
    );
    return (
        <>
            <div className="header-container">
                <header className="page-header">
                    <div className="page-header__top">
                        <div className="page-header__toggle" onClick={() => {
                            setOpenDrawer(true)
                        }}>☰</div>
                        <div className="page-header__logo">
                            <span className="logo" onClick={() => navigate('/')}>
                                <FaReact className='rotate icon-react' /> Thanh Huy
                                <VscSearchFuzzy className='icon-search' />
                            </span>
                            <input className="input-search" value={props.searchTearm} type={'text'} placeholder="Bạn tìm gì hôm nay" onChange={(e) => props.setSearchTerm(e.target.value)} />
                        </div>
                    </div>
                    <nav className="page-header__bottom">
                        <ul id="navigation" className="navigation">
                            <li className="navigation__item">
                                <Popover
                                    className="popover-carts"
                                    placement="topRight"
                                    rootClassName="popover-carts"
                                    title={"Sản phẩm mới thêm"}
                                    content={contentPopover}
                                    arrow={true}
                                >
                                    <Badge
                                        count={carts?.length ?? 0}
                                        size={"small"}
                                    >
                                        <FiShoppingCart className='icon-cart' />
                                    </Badge>
                                </Popover>
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
            <ManageAcount isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} tempAvatar={tempAvatar} setTempAvatar={setTempAvatar} />
        </>
    )
}
export default Header;
