import { Navigate } from "react-router-dom"

const PrivateRoute = ({ isAllowed, children, redirectPath = '/login' }) => {
    if (isAllowed && !isAllowed()) {
        return <Navigate to={redirectPath} replace />
    }
    return children ? children : <Outlet />
}

export default PrivateRoute