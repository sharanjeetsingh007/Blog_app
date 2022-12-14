import { Avatar, Input } from '@mui/material'
import React, { useEffect, useState } from 'react'
import './Comment.css'
import moment from 'moment'
import axios from 'axios'
import Button from '@mui/material/Button';
import { useSelector } from 'react-redux'




const Comment = ({ postId, body, username, date, profilePic, CommentUserEmail, commentId, handleModalCommentUpdate }) => {




    // states
    const [currentUser, setCurrentUser] = useState(null)
    const [commentUpdate, setCommentUpdate] = useState("")
    const [commentUpdateInput, setCommentUpdateInput] = useState(false)


    // comment update handle
    const handleCommentUpdate = (idIs) => {
        if (commentUpdate == "") {
            return alert("can't update empty field")
        }
        const data = {
            CommentUserEmail: CommentUserEmail,
            body: commentUpdate,
        }

        axios.put(`/comments/updateCurrentCommment/${idIs}`, data, { withCredentials: true })
            .then((res) => {
                handleModalCommentUpdate({
                    id: idIs,
                    body: res.data.data.body,
                }
                )
                setCommentUpdateInput(false)
                setCommentUpdate("")
            })
            .catch((err) => {
                alert(err)
            })
    }

    // get cuurent user details
    useEffect(() => {
        axios.get('/auth/redirecthome', { withCredentials: true })
            .then((res) => {
                console.log(res.data, 'current user')
                if (res.data.message) {
                    setCurrentUser(res.data.data.email)
                }
            })
            .catch((err) => {
                // console.log(err)
            })
    }, [CommentUserEmail, currentUser, handleCommentUpdate])

    return (
        <div className='Comment'>
            <div className='header__comment'>
                <Avatar></Avatar>
                <div className='name__date'>
                    <p>{username}</p>
                    <p>{moment(date).format("dddd, MMMM Do YYYY")}</p>
                </div>
            </div>
            <div className='body__cemment'>
                <p>{body}</p>
            </div>
            <div className='footer__comment'
                style={{
                    display: currentUser == CommentUserEmail ? "flex" : "none",
                    justifyContent: commentUpdateInput ? "space-between" : 'flex-end'
                }}
            >
                <Input
                    style={{ display: commentUpdateInput ? "inline" : 'none', fontSize: "12px", width: "100%" }}
                    type='text' onChange={e => setCommentUpdate(e.target.value)} value={commentUpdate}
                    placeholder="Update..."
                />
                <Button variant="outlined"
                    style={{ display: commentUpdateInput ? "none" : 'inline' }}

                    onClick={() => setCommentUpdateInput(true)}
                >E<span>dit</span></Button>
                <Button variant="outlined"
                    style={{ display: commentUpdateInput ? "inline" : 'none' }}
                    onClick={() => handleCommentUpdate(commentId)}
                >U<span>pdate</span></Button>
            </div>
        </div>
    )
}

export default React.memo(Comment)