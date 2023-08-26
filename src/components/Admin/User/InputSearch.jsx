import { Input, Form, Button, Divider } from 'antd';
import './InputSearch.scss'
import { useState } from 'react';
const InputSearch = (props) => {
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [phone, setPhone] = useState();
    const handleFilter = () => {
        let query = "";
        if (name) {
            query += `&fullName=/${name}/i`;
        }
        if (email) {
            query += `&email=/${email}/i`
        }
        if (phone) {
            query += `&phone=/${phone}/i`
        }
        props.handleSearch(query);
    }
    const handleClear = () => {
        setEmail("");
        setName("");
        setPhone("");

    }
    return (
        <div className='Input-container'>
            <div className='input'>
                <div className='input-name'>
                    <span className='input-label'>Name</span>
                    <Input placeholder="Basic usage" onChange={(event) => setName(event.target.value)} value={name} />
                </div>
                <div className='input-email'>
                    <span className='input-label'>Email</span>
                    <Input placeholder="Basic usage" onChange={(event) => setEmail(event.target.value)} value={email} />
                </div>
                <div className='input-phone'>
                    <span className='input-label'>Số Điện Thoại</span>
                    <Input placeholder="Basic usage" onChange={(event) => setPhone(event.target.value)} value={phone} />
                </div>
            </div>
            <div className='button'>
                <Button type="primary" onClick={() => handleFilter()}>Search</Button>
                <Button onClick={() => handleClear()}>Clear</Button>
            </div>

        </div>
    );
};
export default InputSearch;