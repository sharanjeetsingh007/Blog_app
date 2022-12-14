import "./ModalEdit.css"
// import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
// import "https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css";
import React, { useState, useEffect } from 'react'
// import '../CreatePost/CreatePost.css'
import TextField from '@mui/material/TextField';
import JodiText from '../JodiText/JodiText';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import BackButton from '../BackButton/BackButton';
import SendIcon from '@mui/icons-material/Send';
import Button from '@mui/material/Button';




function ModalEdit({ handleModalBlogUpdate, setBlogData, blogData, show, closeModal, blogId, body, category, date, username, title, email, backgroundImage }) {

    const [modalBody, setModalBody] = useState(title);
    const [modalTitle, setModalTitle] = useState("")
    const [modalCategory, setModalCategory] = useState("")
    const [modalUserEmailIs, setModalUserEmailIs] = useState("")
    const [modalBImage, setModalBImage] = useState("")


    // handel update blog
    const updateBlog = (idIs) => {
        if (modalTitle !== title || modalCategory !== category || modalBody !== body || modalBImage !== backgroundImage) {
            const data = {
                "title": modalTitle,
                "category": modalCategory,
                "body": modalBody,
                "backgroundImage": modalBImage,
                "emailUserCurrentBlog": email,
            }
            axios.put(`/blogPost/updateCurrentBlog/${idIs}`, data, { withCredentials: true })
                .then((res) => {
                    const dataIs = res.data.data;
                    handleModalBlogUpdate({
                        "title": dataIs.title,
                        "body": dataIs.body,
                        "category": dataIs.category,
                        "backgroundImage": dataIs.backgroundImage
                    })
                })
                .then(() => {
                    closeModal(false)
                })
                .catch((err) => {
                    alert(err.response.data.error)
                })
        } else {
            alert("The data need to be changed for update")
        }
    }

    // set blog input on render
    useEffect(() => {
        setModalBody(body);
        setModalTitle(title);
        setModalCategory(category);
        setModalBImage(backgroundImage);
    }, [body, title, category, email, username, backgroundImage])


    return <Modal show={show} fullscreen={true} onHide={() => closeModal(false)}>
        <Modal.Header closeButton>
            <Modal.Title>Edit</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div className='modalEdit'>
                <div className='modalEdit__main'>
                    <div className='buttons__modalEdit'>
                        <Button variant="contained" endIcon={<SendIcon />}
                            onClick={() => updateBlog(blogId)}
                        >
                            Update
                        </Button>
                    </div>
                    <div className='blog__creater__wrapper'>
                        <div className='textfield__wrapper'>
                            <label>Title</label>
                            <TextField id="standard-basic" variant="standard" autoComplete='off' fullWidth value={modalTitle} onChange={e => setModalTitle(e.target.value)} />
                        </div>
                        <div className='textfield__wrapper'>
                            <label>Category</label>
                            <TextField id="standard-basic" variant="standard" autoComplete='off' fullWidth value={modalCategory} onChange={e => setModalCategory(e.target.value)} />
                        </div>
                        <div className='textfield__wrapper'>
                            <label>Background Image</label>
                            <TextField id="standard-basic" variant="standard" autoComplete='off' fullWidth value={modalBImage} onChange={e => setModalBImage(e.target.value)} />
                        </div>
                        <div className='textfield__wrapper__body'>
                            <div className='textfield__wrapper__body__row'>
                                <label>Body</label>
                            </div>
                            <div className='jodi'>
                                <JodiText setValue={setModalBody} valueIs={modalBody} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Modal.Body>
    </Modal>
}

export default ModalEdit