import React, { useState, useEffect } from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import './Registration.css'
import { useFormik, Field, Form, Formik, ErrorMessage } from 'formik';
import schema from '../Schema/index'
import { styled } from "@mui/material/styles";
import { outlinedInputClasses } from "@mui/material/OutlinedInput";
import { inputLabelClasses } from "@mui/material/InputLabel";
import axios from 'axios';
import loginSchema from '../Schema/login';
import { useNavigate, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import signIn from '../redux/actions';
import signOut from '../redux/action2';
import logo from '../assets/images/The_Writer.png'
import { Link } from 'react-router-dom'
import './Login.css'



function Login({ From, currentPath, changeModalLogin, formikChangeToInitial }) {

    // react-router
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // handel login
    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: loginSchema,
        onSubmit: (values) => {
            const data = {
                email: values.email,
                password: values.password,
            }
            axios.post('/auth/login', data, { withCredentials: true })
                .then((res) => {
                    alert(res.data.message || res.data.error)
                    if (res.data.message) {
                        dispatch(signIn());
                        if (location.state?.from) {
                            navigate(location.state.from);
                        } else {
                            if (currentPath) {
                                changeModalLogin(false)
                            } else {
                                navigate("/")
                            }
                        }
                    }
                })
                .catch((err) => {
                    alert(err.response.data.error)
                })
        }
    })

    useEffect(() => {
        if (formikChangeToInitial == false) {
            formik.handleReset();
            formik.resetForm();
        }

    }, [formikChangeToInitial])

    return (
        <div className='Registration'>
            <div className='login'>
                <div className='registration__main'>
                    <div className='image__logo'>
                        <img alt='logo' src={logo} />
                    </div>
                    <form onSubmit={formik.handleSubmit}>
                        <div className='textfield__wrapper'>
                            <TextField
                                error={formik.errors.email && formik.touched.email ? true : false}
                                className='mui__textfield' id="email" name="email" label="Email" variant="standard"
                                value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur}
                                helperText={formik.touched.email ? formik.errors.email : ""}
                            />
                        </div>
                        <div className='textfield__wrapper'>
                            <TextField
                                error={formik.errors.password && formik.touched.password ? true : false}
                                className='mui__textfield' id="password" name="password" label="Password" variant="standard"
                                value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur}
                                helperText={formik.touched.password ? formik.errors.password : ""}
                            />
                        </div>
                        <Button type='submit' variant="contained">Login</Button>
                        <Link to="/register">  <p style={{ marginTop: '10px' }}>Register</p></Link>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login