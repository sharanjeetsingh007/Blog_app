import React, { useState, useEffect } from 'react'
import './CreatePost.css'
import TextField from '@mui/material/TextField';
import JodiText from '../JodiText/JodiText';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import BackButton from '../BackButton/BackButton';
import SendIcon from '@mui/icons-material/Send';
import Button from '@mui/material/Button';
import { useOutletContext } from "react-router-dom";
import { useDispatch } from 'react-redux';
import reCall from '../../redux/action3';






function CreatePost() {


    const [postData, setPostData, changeReCallPost] = useOutletContext();


    // react-router
    const navigate = useNavigate();
    const dispatch = useDispatch()

    // states
    const [body, setBody] = useState("");
    const [title, setTitle] = useState("")
    const [category, setCategory] = useState("")
    const [userEmailIs, setUserEmailIs] = useState("")
    const [bImage, setBImage] = useState("")


    // post the blog
    const handlePublish = () => {
        if (!title || !category || !body || !bImage) {
            return alert('All fields are mandatory for publishing the blog')
        }
        const data = {
            title: title,
            category: category,
            body: body,
            email: userEmailIs,
            backgroundImage: bImage,
        }
        axios.post("/blogPost/blogtopost", data, { withCredentials: true })
            .then((res) => {
                alert(res.data.message)
                setTitle("")
                setBImage("")
                setBody("")
                setCategory("")
            })
            .then(() => {
                dispatch(reCall())
                changeReCallPost(true)
                navigate("/")
            })
            .catch((err) => {
                alert(err.response.data.error)
            })
    }

    // get currnet user
    useEffect(() => {
        axios.get('/auth/redirecthome', { withCredentials: true })
            .then((res) => {
                console.log(res, 'response')
                if (res.data.message) {
                    const userEmail = res.data.data.email;
                    setUserEmailIs(userEmail);
                }
            })
            .catch((err) => {
                console.log(err)
                navigate('/login')
            })
    }, [])

    return (
        <div className='CreatePost'>
            <div className='cratepost__main'>
                <div className='buttons__createpost'>
                    <BackButton className="back__button" />
                    <Button variant="contained" endIcon={<SendIcon />}
                        onClick={handlePublish}
                    >
                        Publish
                    </Button>
                </div>
                <div className='blog__creater__wrapper'>
                    <div className='textfield__wrapper'>
                        <label>Title</label>
                        <TextField id="standard-basic" variant="standard" autoComplete='off' fullWidth value={title} onChange={e => setTitle(e.target.value)} />
                    </div>
                    <div className='textfield__wrapper'>
                        <label>Category</label>
                        <TextField id="standard-basic" variant="standard" autoComplete='off' fullWidth value={category} onChange={e => setCategory(e.target.value)} />
                    </div>
                    <div className='textfield__wrapper'>
                        <label>Background Image</label>
                        <TextField id="standard-basic" variant="standard" autoComplete='off' fullWidth value={bImage} onChange={e => setBImage(e.target.value)} />
                    </div>
                    <div className='textfield__wrapper__body'>
                        <div className='textfield__wrapper__body__row'>
                            <label>Body</label>
                        </div>
                        <div className='jodi'>
                            <JodiText setValue={setBody} valueIs={body} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreatePost