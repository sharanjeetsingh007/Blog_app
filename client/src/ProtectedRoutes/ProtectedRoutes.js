import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate, Navigate, Outlet, useLocation, useOutletContext } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import signIn from '../redux/actions';
import signOut from '../redux/action2';




function ProtectedRoutes() {
    const location = useLocation();

    const dispatch = useDispatch();

    const [postData, setPostData, changeReCallPost] = useOutletContext();


    const user = useSelector(state => state.reducer.userLogin)

    useEffect(() => {
        axios.get('/auth/redirecthome', { withCredentials: true })
            .then((res) => {
                // console.log(res.data, 'response in protected routes')
                if (res.data.message) {
                    dispatch(signIn())
                }
            })
            // .then((res) => {

            // })
            .catch((err) => {
                console.log(err)
                dispatch(signOut())
            })
    }, [])

    // console.log(user, "user in protected routes")

    return user == true ? <Outlet context={[postData, setPostData, changeReCallPost]} /> : <Navigate to="/login" replace state={{ from: location }} />

}

export default ProtectedRoutes;