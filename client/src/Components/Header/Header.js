import React, { useState, useEffect } from 'react'
import './Header.css'
import { useNavigate, Navigate, Outlet, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import signOut from '../../redux/action2';
import axios from 'axios';
import Logo from "../../assets/images/The_Writer.png"
import DensityMediumIcon from '@mui/icons-material/DensityMedium';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import Button from '@mui/material/Button';
import { borderColor } from '@mui/system';
import debounce from "lodash/debounce";
import { set } from 'lodash';





function Header({ changeSidebarToggle, sidebarToggle, postData, setPostData, SearchFilterStateChange, copyPostData }) {

    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const user = useSelector(state => state.reducer.userLogin)

    const [searchInput, setSearchInput] = useState("");
    // const [copyPostData, setCopyPostData] = useState([]);


    // useEffect(() => {
    //     setCopyPostData(postData)
    // }, [postData])

    // console.log(copyPostData, 'copyPostData')



    // console.log(postData)
    const handleSearch = (e) => {
        setSearchInput(e.target.value)
        const lowerCase = e.target.value.toLowerCase()
        const upperCase = e.target.value.toUpperCase()
        // console.log(lowerCase, "lowercase")
        const filterData = postData.filter((data) => data.title.toLowerCase().includes(lowerCase || upperCase))
        console.log(filterData, 'filterData is it')
        console.log(e.target.value, 'searchInput is it')
        SearchFilterStateChange(filterData)
        if (e.target.value == "") {
            console.log('empty search')
            SearchFilterStateChange(copyPostData)
        }
    }




    const handleLogout = () => {
        dispatch(signOut());

        axios.get("/auth/logout", { withCredentials: true })
            .then((res) => {
                // console.log(res, "res on logout delete cookie")
                alert(res.data.message)
                if (location.state?.from) {
                    location.state.from = ""
                    // console.log(location.state.from, "header ");

                } else {
                    // console.log("no ");
                    navigate("/")
                }
            })
            .catch((err) => {
                console.log(err, "err in logout cookie")
                alert(err)
            })

        // if (location.state?.from) {
        //     location.state.from = ""
        //     // console.log(location.state.from, "header ");

        // } else {
        //     // console.log("no ");
        //     navigate("/")
        // }

    }

    // useEffect(() => {
    //     // to get current user details
    //     axios.get('http://localhost:9000/auth/redirecthome', { withCredentials: true })
    //         .then((res) => {
    //             console.log(res.data, 'current user')
    //             if (res.data.message) {
    //                 // console.log(res.data.data, 'current user')
    //                 setCurrentUser(res.data.data.email)


    //             }
    //         })
    //         .catch((err) => {
    //             console.log(err)
    //         })

    // }, [])

    const handleSidebarChange = (event) => {
        console.log(event.currentTarget.style, "event clicked sidebar")

        event.currentTarget.style.animation = 'unset';
        event.currentTarget.style.animation = 'App-logo-spin 2s linear';

        changeSidebarToggle(true)
    }
    // console.log(sidebarToggle, "sidebar toggle")
    return (
        <div className='Header'>
            <div className='header__main'>
                <div className='header__left'>
                    <div className='sidebar__logo'>
                        <IconButton aria-label="delete"
                            value={sidebarToggle}
                            onClick={handleSidebarChange}
                        >
                            <DensityMediumIcon
                                style={{ color: "black" }}
                            />
                        </IconButton>
                    </div>
                    <div className='header__search'>
                        <SearchIcon className='icon__saerch__input' />
                        <input type="text" placeholder='Search Blog...'
                            value={searchInput}
                            onChange={handleSearch}

                        />
                    </div>
                </div>
                <div className='header__center'>

                    <img src={Logo} alt='the_writer_logo' />

                </div>
                <div className='header__right'>

                    {user ? <Button
                        onClick={handleLogout}
                        style={{
                            fontSize: '12px',
                            width: '100px',
                            color: "black",
                            borderColor: "black"

                        }}
                        variant="outlined">L<span>og out</span></Button>

                        : <> <Button
                            style={{
                                fontSize: '12px',
                                width: '100px',
                                color: "black",
                                borderColor: "black"

                            }}
                            onClick={() => navigate("/login")}
                            variant="outlined">L<span>og In</span></Button>
                            <Button
                                className='register__button__header'
                                style={{
                                    fontSize: '12px',
                                    width: '100px',
                                    color: "black",
                                    borderColor: "black",
                                    marginLeft: "5px"
                                }}
                                onClick={() => navigate("/register")}
                                variant="outlined">R<span>egister</span></Button>
                        </>}


                    {/* <button onClick={handleLogout}>Log out</button> */}

                </div>


            </div>
        </div>
    )
}

export default Header