import React from 'react'
import "./ModalDelete.css"
import ClearIcon from '@mui/icons-material/Clear';
import IconButton from '@mui/material/IconButton';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';



function ModalDelete({ setShowModalDelete, showModalDelete, postId, userEmailBlog, changeReCallPost }) {

    // react-router
    const navigate = useNavigate();

    // delete post with comments
    const deletePostWithComments = (idIs) => {

        const data = {
            userEmailBlog: userEmailBlog
        }

        axios.delete(`/blogPost/delete/${idIs}`, { withCredentials: true, data: data })
            .then((res) => {
                changeReCallPost(true)
                navigate("/")
            })
            .catch((err) => {
                if (err.response.data.error) {
                    return alert(err.response.data.error)
                }
                alert(err)
            })
    }
    return (
        <div
            className={showModalDelete ? "ModalDelete--active" : "ModalDelete"}
            onClick={() => setShowModalDelete(false)}
        >
            <div className='modalDelete__wpapper'>
                <div className='modalDelete__main'>
                    <div className='modaldelete__modal'
                        onClick={e => e.stopPropagation()}
                    >
                        <div className='header'>
                            <div className='header__main'>
                                <h5>Delete</h5>
                                <IconButton aria-label="clear" size='small'
                                    onClick={() => setShowModalDelete(false)}
                                >
                                    <ClearIcon />
                                </IconButton>
                            </div>
                        </div>
                        <div className='body'>
                            Are you sure you want to delete this blog?
                        </div>
                        <div className='footer'>
                            <div className='footer__main'>
                                <Button variant="outlined"
                                    style={{ color: "black", borderColor: "black" }}
                                    onClick={() => setShowModalDelete(false)}
                                >C<span>ancel</span></Button>
                                <Button variant="outlined"
                                    color='error'
                                    onClick={() => deletePostWithComments(postId)}
                                >D<span>elete</span></Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ModalDelete