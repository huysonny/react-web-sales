import { useLocation } from "react-router-dom";
import ViewDetail from "./ViewDetail";
import { callFetchBookById } from "../../services/api";
import { useEffect, useState } from "react";

const BookPage = () => {
    let location = useLocation();
    let params = new URLSearchParams(location.search);
    const id = params?.get("id");
    console.log(">>> check book id :", id);
    const [dataBook, setDataBook] = useState([]);
    const fetchBook = async (id) => {
        const res = await callFetchBookById(id);
        console.log("check res", res);
        if (res && res.data) {
            let raw = res.data;
            raw.items = getImages(raw);

            setTimeout(() => {
                setDataBook(raw);
            }, 2000)
        }
    }
    useEffect(() => {
        fetchBook(id);
    }, [id])
    const getImages = (raw) => {
        const images = [];
        if (raw.thumbnail) {
            images.push({
                original: `${import.meta.env.VITE_BACKEND_URL}/images/book/${raw.thumbnail}`,
                thumbnail: `${import.meta.env.VITE_BACKEND_URL}/images/book/${raw.thumbnail}`,
                originalClass: "original-image",
                thumbnailClass: "thumbnail-image"
            })
        }
        if (raw.slider) {
            raw.slider?.map(item => {
                images.push(
                    {
                        original: `${import.meta.env.VITE_BACKEND_URL}/images/book/${item}`,
                        thumbnail: `${import.meta.env.VITE_BACKEND_URL}/images/book/${item}`,
                        originalClass: "original-image",
                        thumbnailClass: "thumbnail-image"
                    }
                )
            })
        }
        return images;
    }
    return (
        <>
            <ViewDetail dataBook={dataBook} />
        </>
    )
}
export default BookPage;