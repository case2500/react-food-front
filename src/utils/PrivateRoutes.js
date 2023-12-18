import { Outlet, Navigate } from 'react-router-dom'

const PrivateRoutes = () => {
    // let auth = {'token':false}
    let checkauth = localStorage.getItem("token");


    


    return(
        checkauth ? <Outlet/> : <Navigate to="/login"/>
    )
}

export default PrivateRoutes