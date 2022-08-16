import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Home from './Components/Home/Home'
import SideBar from './Components/SideBar/SideBar';
import { useNavigate } from 'react-router-dom';
import Header from './Components/Header/Header';
import { Outlet } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import './Layout.css'
import LoadingSpinner from './Components/LoadingSpinner/LoadingSpinner';



function Layout() {


    const reCall = useSelector(state => console.log(state.reCall))

    const [sidebarToggle, setSidebarToggle] = useState(false)
    const [postData, setPostData] = useState([])
    const [copyPostData, setCopyPostData] = useState([])
    const [loader, setLoader] = useState(true);
    const [reCallPost, setReCallPost] = useState(false)

    const changeReCallPost = (value) => {
        setReCallPost(value => !value)
    }


    const changeSidebarToggle = (value) => {
        setSidebarToggle(value => !value)
    }

    const SearchFilterStateChange = (value) => {
        setPostData(value)
    }



    useEffect(() => {
        setReCallPost(reCall)
    }, [])


    useEffect(() => {
        const getPost = () => {
            axios.get("/blogPost/")
                .then((res) => {
                    setPostData(res.data.Result)
                    setCopyPostData(res.data.Result)
                    setLoader(false)
                })
                .catch((err) => {
                    alert(err)
                })
        }
        getPost()
    }, [])

    useEffect(() => {
        const getPost = () => {
            axios.get("/blogPost/")
                .then((res) => {
                    setPostData(res.data.Result)
                    setCopyPostData(res.data.Result)
                    setLoader(false)
                })
                .catch((err) => {
                    alert(err)
                })
        }
        getPost()
    }, [reCall, reCallPost])

    return (<>
        {loader ? <LoadingSpinner /> :
            <div className='Layout'>
                <Header sidebarToggle={sidebarToggle} changeSidebarToggle={changeSidebarToggle} postData={postData} setPostData={setPostData} SearchFilterStateChange={SearchFilterStateChange} copyPostData={copyPostData} />
                <div className='layout__body'>
                    {loader ? <LoadingSpinner /> : <>
                        <SideBar
                            changeSidebarToggle={changeSidebarToggle} sidebarToggle={sidebarToggle} />
                        <Outlet context={[postData, setPostData, changeReCallPost]} />
                    </>
                    }
                </div>
            </div>
        }
    </>
    )
}

export default Layout