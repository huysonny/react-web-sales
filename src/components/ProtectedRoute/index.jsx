import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = (props) => {
    const dispatch = useDispatch();
    const isAuthenticated = useSelector(state => state.account.isAuthenticated);
    return (
        <>
            {isAuthenticated === true ? <>{props.children}</> : <Navigate to='/login' replace />}
        </>
    )
}
export default ProtectedRoute;