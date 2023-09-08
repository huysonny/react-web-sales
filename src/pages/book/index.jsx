import { useLocation } from "react-router-dom";
import ViewDetail from "./ViewDetail";

const BookPage = () => {
    let location = useLocation();
    let params = new URLSearchParams(location.search);
    const id = params?.get("id");
    console.log(">>> check book id :", id);
    return (
        <>
            <ViewDetail />
        </>
    )
}
export default BookPage;