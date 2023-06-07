import React from "react";
import { useContext } from "react";
import { Navigate} from "react-router-native";
import { UserContext } from "../../core/contexts";
import { isTokenValid } from "../../core/services";

const PrivateRoute = (props) => {

    const { user } = useContext(UserContext);
    return(
        <>
            {(isTokenValid(user.token) ? props.children : <Navigate to='/login' /> )}
        </>
        
    )
}


export default PrivateRoute;