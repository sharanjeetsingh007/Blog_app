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

    const navigate = useNavigate()

    const dispatch = useDispatch()
    const reCall = useSelector(state => console.log(state.reCall, 'statetttt'))

    const [sidebarToggle, setSidebarToggle] = useState(false)
    const [postData, setPostData] = useState([])
    const [copyPostData, setCopyPostData] = useState([])
    const [loader, setLoader] = useState(true);
    const [reCallPost, setReCallPost] = useState(false)

    const changeReCallPost = (value) => {
        setReCallPost(value => !value)
    }

    // const changePostData = (value) => {
    //     setPostData(value)
    // }


    const changeSidebarToggle = (value) => {
        setSidebarToggle(value => !value)
    }

    const SearchFilterStateChange = (value) => {
        setPostData(value)
    }


    console.log(reCallPost, 'reCallPost ')

    useEffect(() => {
        setReCallPost(reCall)
    }, [])


    useEffect(() => {
        const getPost = () => {
            axios.get("/blogPost/")
                .then((res) => {
                    // console.log(res, 'res in getting data')
                    setPostData(res.data.Result)
                    setCopyPostData(res.data.Result)
                    setLoader(false)
                })
                .catch((err) => {
                    // console.log(err, "err in getting post data")
                    alert(err)
                })
        }
        getPost()
    }, [])

    useEffect(() => {
        const getPost = () => {
            axios.get("/blogPost/")
                .then((res) => {
                    // console.log(res, 'res in getting data')
                    setPostData(res.data.Result)
                    setCopyPostData(res.data.Result)
                    setLoader(false)
                })
                .catch((err) => {
                    // console.log(err, "err in getting post data")
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
                        {/* {sidebarToggle && */}

                        <SideBar
                            changeSidebarToggle={changeSidebarToggle} sidebarToggle={sidebarToggle} />
                        {/* } */}

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