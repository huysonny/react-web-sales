import { Badge, Button, Descriptions, Drawer } from 'antd';
import moment from 'moment/moment';
const UserViewDetail = (props) => {
    const { dataViewDetail, setDataViewDetail, openViewDetail, setOpenViewDetail } = props;
    const onClose = () => {
        setOpenViewDetail(false);
    };
    return (
        <>
            <Drawer title="Chức năng xem chi tiết " width={"50vw"} onClose={onClose} open={openViewDetail}>
                <Descriptions title="Thông tin user" bordered column={2}>
                    <Descriptions.Item label="ID">{dataViewDetail?._id}</Descriptions.Item>
                    <Descriptions.Item label="Tên hiển thị">{dataViewDetail?.fullName}</Descriptions.Item>
                    <Descriptions.Item label="Email">{dataViewDetail?.email}</Descriptions.Item>
                    <Descriptions.Item label="Số điện thoại">{dataViewDetail?.phone}</Descriptions.Item>
                    <Descriptions.Item label="Role" span={2}>
                        <Badge status='processing' text={dataViewDetail?.role}></Badge>
                    </Descriptions.Item>
                    <Descriptions.Item label="Created At">
                        {moment(dataViewDetail?.createAt).format('DD-MM-YYYY HH:mm:ss')}
                    </Descriptions.Item>
                    <Descriptions.Item label="Update At" >
                        {moment(dataViewDetail?.updateAt).format('DD-MM-YYYY HH:mm:ss')}
                    </Descriptions.Item>
                </Descriptions>;
            </Drawer>
        </>
    )
}
export default UserViewDetail;