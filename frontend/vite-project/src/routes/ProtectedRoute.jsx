import { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

// see https://www.robinwieruch.de/react-router-private-routes/
function ProtectedRoute({ redirectPath = '/login', children }) {
    const {email} = useContext(UserContext)
    
    if (!email) {
        return <Navigate to={redirectPath} replace />;
        
    }

    return children ? children : <Outlet/>;
    /* return <div>{email}</div> */
}

export default ProtectedRoute