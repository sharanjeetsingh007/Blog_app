import axios from 'axios'
import React, { useEffect, useState } from 'react'
import './Home.css'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import Card from '../Card/Card'
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import { useOutletContext } from "react-router-dom";
import ModalAnt from '../AntModalLogin/Modal';
import { Button, Modal } from 'antd';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';




function Home() {
    // redux state
    const user = useSelector(state => state.reducer.userLogin);
    // react-router
    const navigate = useNavigate();
    const [postData, setPostData] = useOutletContext();


    // states
    const [modalLogin, setModalLogin] = useState(false)


    const changeModalLogin = (value) => {
        setModalLogin(value)
    }

    // router as per the login status
    const handlePlusButton = () => {
        if (!user) {
            setModalLogin(true)
        } else {
            navigate("createPost")
        }
    }

    return (
        <div className='Home'>
            <div className='home__main'>
                <div className='home__card__main'>
                    <ModalAnt
                        From={"plus-button"}
                        modalLogin={modalLogin}
                        changeModalLogin={changeModalLogin}
                    />
                    {postData.length == 0 ? <div className='no__data'><h3>No blogs</h3></div> : postData.map((post, index) => {
                        return <Card
                            title={post.title}
                            category={post.category}
                            backgroundImage={post.backgroundImage}
                            body={post.body}
                            email={post.email}
                            _id={post._id}
                            key={post._id}
                            date={post.date}
                            username={post.username}
                        />
                    })}
                </div>
                <div className='plus__button'
                    onClick={handlePlusButton}
                >
                    <IconButton className='yoo' aria-label="add an alarm">
                        <AddIcon style={{ color: 'white', fontSize: '29px' }} />
                    </IconButton>
                </div>
            </div>
        </div>
    )
}

export default Home