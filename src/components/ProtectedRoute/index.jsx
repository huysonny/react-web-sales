import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import NotePermitted from "./NotePermitted";


const RoleBaseRoute = (props) => {
    const isAdminRoute = window.location.pathname.startsWith('/admin');
    const user = useSelector(state => state.account.user);
    const userRole = user.role;
    if (isAdminRoute && userRole === 'ADMIN' || !isAdminRoute && (userRole === 'User' || userRole === 'ADMIN')) {
        return (
            <>
                {props.children}
            </>
        )
    } else {
        return (
            <>
                <NotePermitted />
            </>
        )
    }
}
const ProtectedRoute = (props) => {
    const dispatch = useDispatch();
    const isAuthenticated = useSelector(state => state.account.isAuthenticated);
    return (
        <>
            {isAuthenticated === true ? <>
                <RoleBaseRoute>
                    {props.children}
                </RoleBaseRoute>
            </> : <Navigate to='/login' replace />}
        </>
    )
}
export default ProtectedRoute;