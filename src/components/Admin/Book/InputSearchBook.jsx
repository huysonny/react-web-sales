import { Input, Form, Button, Divider } from 'antd';
import './InputSearch.scss';
import { useState } from 'react';
const InputSearchBook = (props) => {
    const [nameBook, setNameBook] = useState();
    const [author, setAuthor] = useState();
    const [category, setCategory] = useState();

    const handleClear = () => {
        setNameBook("");
        setAuthor("");
        setCategory("");

    }
    const handleFilter = () => {
        let query = "";
        if (nameBook) {
            query += `&mainText=/${nameBook}/i`;
        }
        if (author) {
            query += `&author=/${author}/i`
        }
        if (category) {
            query += `&category=/${category}/i`
        }
        props.setFilter(query);
    }

    return (
        <>
            <div className='Input-container'>
                <div className='input'>
                    <div className='input-nameBook'>
                        <span className='input-label'>Tên Sách</span>
                        <Input placeholder="Basic usage" onChange={(event) => setNameBook(event.target.value)} value={nameBook} />
                    </div>
                    <div className='input-author'>
                        <span className='input-label'>Tác Giả</span>
                        <Input placeholder="Basic usage" onChange={(event) => setAuthor(event.target.value)} value={author} />
                    </div>
                    <div className='input-category'>
                        <span className='input-label'>Thể Loại</span>
                        <Input placeholder="Basic usage" onChange={(event) => setCategory(event.target.value)} value={category} />
                    </div>
                </div>
                <div className='button'>
                    <Button type="primary" onClick={() => handleFilter()}>Search</Button>
                    <Button onClick={() => handleClear()}>Clear</Button>
                </div>

            </div>
        </>
    )
}
export default InputSearchBook;