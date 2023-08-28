import { InboxOutlined } from "@ant-design/icons";
import { Modal, Table, notification } from "antd";
import { message, Upload } from 'antd';
import { useState } from "react";
import * as XLSX from 'xlsx';
import { callBulkCreateUser } from "../../../services/api";
const { Dragger } = Upload;
import templateFile from './data/templateFile.xlsx?url';
const UserImport = (props) => {
    const dummyRequest = ({ file, onSuccess }) => {
        setTimeout(() => {
            onSuccess("ok");
        }, 1000)
    }
    const [dataExcel, setDataExcel] = useState([]);
    const propsUpload = {
        name: 'file',
        multiple: false,
        maxCount: 1,
        accept: ".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel",
        customRequest: dummyRequest,
        onChange(info) {
            const { status } = info.file;
            if (status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (status === 'done') {
                if (info.fileList && info.fileList.length > 0) {
                    const file = info.fileList[0].originFileObj;
                    const reader = new FileReader();
                    reader.readAsArrayBuffer(file);
                    reader.onload = function (e) {
                        const data = new Uint8Array(reader.result);
                        const workbook = XLSX.read(data, { type: 'array' });
                        const sheet = workbook.Sheets[workbook.SheetNames[0]];
                        const json = XLSX.utils.sheet_to_json(sheet, {
                            header: ["fullName", "email", "phone"],
                            range: 1
                        })
                        if (json && json.length > 0) setDataExcel(json);
                        console.log("check dataExcel", dataExcel);
                    }
                }
                message.success(`${info.file.name} file uploaded successfully.`);
            } else if (status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
        onDrop(e) {
            console.log('Dropped files', e.dataTransfer.files);
        },
    };
    const { openUserImport, setOpenUserImport } = props
    const handleOk = async () => {
        const data = dataExcel.map((item) => {
            item.password = "123456";
            return item;
        })
        console.log("check data ", data);
        let res = await callBulkCreateUser(data);
        if (res.data) {
            notification.success({
                description: `Success:${res.data.countSuccess},Error:${res.data.countError}`,
                message: "Upload thành công",
            })
            setDataExcel([]);
            setOpenUserImport(false);
            props.fetchUser();
        }
        else {
            notification.error({
                description: res.message,
                message: "Đã có lỗi xảy ra"
            })
        }


    }
    const handleCancel = () => {
        setOpenUserImport(false);
        setDataExcel([]);
    }
    return (
        <>
            <div className="UserImport-container">
                <div className="UserImport">
                    <Modal title="Import data user"
                        width={"50vw"}
                        open={openUserImport}
                        onOk={handleOk}
                        onCancel={handleCancel}
                        okText="Import data"
                        maskClosable={false}
                        okButtonProps={{
                            disabled: dataExcel.length < 1
                        }
                        }
                    >
                        <Dragger {...propsUpload} >
                            <p className="ant-upload-drag-icon">
                                <InboxOutlined />
                            </p>
                            <p className="ant-upload-text">Click or drag file to this area to upload</p>
                            <p className="ant-upload-hint">
                                Support for a single upload. Only accept .csv,.xls,.xlsx .or &nbsp;
                                <a onClick={e => e.stopPropagation()}
                                    href={templateFile}
                                    download>Download Sample File</a>

                            </p>
                        </Dragger>
                        <div className="UserImport-table" style={{ paddingTop: 20 }}>
                            <Table
                                dataSource={dataExcel}
                                title={() => <span>Dữ liệu upload:</span>}
                                columns={[
                                    { dataIndex: 'fullName', title: 'Tên hiển thị' },
                                    { dataIndex: 'email', title: 'Email' },
                                    { dataIndex: 'phone', title: 'Số điện thoại' },
                                ]}

                            />
                        </div>
                    </Modal>
                </div>

            </div >
        </>
    )
}
export default UserImport;