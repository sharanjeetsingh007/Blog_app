import React from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import './Registration.css'
import { useFormik, Field, Form, Formik, ErrorMessage } from 'formik';
import schema from '../Schema/index'
import { styled } from "@mui/material/styles";
import { outlinedInputClasses } from "@mui/material/OutlinedInput";
import { inputLabelClasses } from "@mui/material/InputLabel";
import { useNavigate } from 'react-router-dom';
import logo from '../assets/images/The_Writer.png'

import axios from 'axios';


function Registration() {
    const navigate = useNavigate();
    // handle registration
    const formik = useFormik({
        initialValues: {
            username: "",
            email: "",
            password: "",
            renterpassword: "",
        },
        validationSchema: schema,

        onSubmit: values => {
            const data = {
                username: values.username,
                email: values.email,
                password: values.password,
            }

            axios.post('/auth/register', data)
                .then((res) => {
                    alert(res.data.message || res.data.error)
                    navigate("/")
                })
                .catch((err) => {
                    alert(err.response.data.error)
                })
        }
    })

    return (
        <div className='Registration'>
            <div className='registration__main'>
                <div className='image__logo'>
                    <img alt='logo' src={logo} />
                </div>
                <form onSubmit={formik.handleSubmit}>
                    <div className='textfield__wrapper'>
                        <TextField
                            error={formik.errors.username && formik.touched.username ? true : false}
                            className='mui__textfield' id="name" name="username" label="Username" variant="standard"
                            value={formik.values.username}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            helperText={formik.touched.username ? formik.errors.username : ""}
                        />
                    </div>
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
                    <div className='textfield__wrapper'>
                        <TextField
                            error={formik.errors.renterpassword && formik.touched.renterpassword ? true : false}
                            className='mui__textfield' id="rrenterpassword" name="renterpassword" label="Renter-password" variant="standard"
                            value={formik.values.renterpassword} onChange={formik.handleChange} onBlur={formik.handleBlur}
                            helperText={formik.touched.renterpassword ? formik.errors.renterpassword : ""}
                        />
                    </div>
                    <Button type='submit' variant="contained">Register</Button>
                </form>
            </div>
        </div>
    )
}

export default Registration