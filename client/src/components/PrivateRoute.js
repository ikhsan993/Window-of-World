import {React,useContext} from 'react'
import {Route, Redirect} from 'react-router-dom';
import { UserContext } from "../context/userContext";
function PrivateRoute({ component : Component, ...rest }) {
    const [state, dispatch] = useContext(UserContext);
        return (
            <>
                {<Route {...rest} render ={(props) =>
                    state.isLogin ? <Component {...props} /> : <Redirect to ="/" />}
                />}
            </>
        )
    }
export default PrivateRoute;
