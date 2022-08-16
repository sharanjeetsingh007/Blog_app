import React, { useEffect, useMemo, useState, useRef } from 'react'
import './Blog.css'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import IconButton from '@mui/material/IconButton';
import EastIcon from '@mui/icons-material/East';
import WestIcon from '@mui/icons-material/West';
import { Avatar } from '@mui/material';
import Comment from '../Comment/Comment';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import ModalEdit from '../ModalEdit/ModalEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import ModalDelete from '../ModalDelete/ModalDelete';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import ModalAnt from '../AntModalLogin/Modal';
import ModalAntComment from '../AntModalLoginComment/Modal';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import CircularProgress from '@mui/material/CircularProgress';
import { useOutletContext } from 'react-router-dom';




function Blog() {

    const [postData, setPostData, changeReCallPost] = useOutletContext();


    // states 
    const { id } = useParams();
    const [blogData, setBlogData] = useState({});
    const [commentState, setCommentState] = useState(false);
    const [comment, setComment] = useState("");
    const [allComments, setAllComments] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);

    // modal state
    const [showModal, setShowModal] = useState(false);
    const [showModalDelete, setShowModalDelete] = useState(false);
    const [modalLogin, setModalLogin] = useState(false)
    const [modalLoginComment, setModalLoginComment] = useState(false)
    const [iconColorChange, setIconColorChange] = useState(false);
    const [loader, setLoader] = useState(true);
    const [loaderComment, setLoaderComment] = useState(true);
    const [loadingImage, setLoadingImage] = useState(true)
    const [bImageVerify, setBImageVerify] = useState("")


    // change state modal
    const changeModalLogin = (value) => {
        setModalLogin(value)
    }
    // change state
    const changeModalLoginComment = (value) => {
        setModalLoginComment(value)
    }

    // change edit delete background
    const changeButtonBackground = () => {
        if (blog__wrapperDoM.scrollTop >= 290) {
            setIconColorChange(true)


            // console.log(blog__wrapperDoM.scrollTop, "scroll y 🔥")

            // console.log('scroll is greater than then🎃')
        } else {
            setIconColorChange(false)

        }
    }

    // scroll functionality
    const blog__wrapperDoM = document.getElementById("blog__wrapper")
    if (blog__wrapperDoM) {
        blog__wrapperDoM.addEventListener("scroll", changeButtonBackground)

    }

    // update blogData state after new post
    const handleModalBlogUpdate = (values) => {
        setBlogData((blogData) => ({
            ...blogData,
            title: values.title,
            body: values.body,
            category: values.category,
            backgroundImage: values.backgroundImage,
        }));
    }

    // update state after submit comment
    const handleModalCommentUpdate = (values) => {
        let copyAllComments = allComments.map(data => { return { ...data } })
        copyAllComments.find(item => item._id == values.id).body = values.body;
        setAllComments(copyAllComments)
    }


    // change state input
    const handleChangeInput = (e) => {
        setComment(e.target.value)
    }



    // Modal function to close 
    const closeModal = (value) => {
        setShowModal(value)
    }

    // post comment button handle
    const handlePostComment = (idIs) => {
        if (!comment) {
            alert("Empty comment can't be posted")
            return;
        }
        const data = {
            profilePic: "",
            body: comment,
            postId: idIs,
        }
        axios.post("/comments/postComment", data, { withCredentials: true })
            .then((res) => {
                setAllComments([...allComments, res.data.data])
                setComment("")
            })
            .catch((err) => {
                alert(err, "error of posting comment")

                if (err.response.data.error == "User not authorised") {
                    setModalLoginComment(true)
                }
                setComment("")
            })
    }

    // get current blog
    useEffect(() => {
        axios.get(`/blogPost/currentBlog/${id}`)
            .then((res) => {
                // console.log(res.data.data, "blog data")
                if (res.data.data) {
                    setBlogData(res.data.data);
                    setLoader(false)
                    return;
                }
            })
            .catch((err) => {
                console.log(err)
            })

        axios.get(`/comments/${id}`)
            .then((res) => {
                setAllComments(res.data.data)
                setLoaderComment(false)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])



    //get currnet user
    useEffect(() => {
        axios.get('/auth/redirecthome', { withCredentials: true })
            .then((res) => {
                // console.log(res.data, 'current user')
                if (res.data.message) {
                    setCurrentUser(res.data.data)
                }
            })
            .catch((err) => {
                // console.log(err)
            })

    }, [!modalLoginComment, modalLoginComment])



    useEffect(() => {
        function isImage(url) {
            // console.log(/^(https|http)?:\/\//.test(url), "jijijijijijijjijijijii");
            setBImageVerify(/^(https|http)?:\/\//.test(url))
        }
        isImage(blogData.backgroundImage)
    }, [blogData.backgroundImage])



    return (<>
        {loader ? <LoadingSpinner /> :

            <div className={commentState == true ? "Blog--active" : "Blog"}>
                <ModalAnt
                    From={"comment-button"}
                    modalLogin={modalLogin}
                    changeModalLogin={changeModalLogin}

                />
                <ModalAntComment
                    modalLogin={modalLoginComment}
                    changeModalLogin={changeModalLoginComment}
                />

                <div className='blog__main'>
                    <div className='blog__wrapper' id='blog__wrapper'>
                        <div className='blog__top'>

                            {bImageVerify && <img
                                className={loadingImage ? "skeleton" : undefined}
                                style={{ display: loadingImage ? "block" : "none" }}
                            />}


                            {bImageVerify && <img
                                style={{ display: loadingImage ? "none" : "block" }}
                                src={blogData.backgroundImage}
                                alt='blog-image'
                                onLoad={() => setLoadingImage(false)}
                            />}

                            {!bImageVerify && <img
                                src="https://wallpaperaccess.com/full/1285952.jpg"
                                alt='blog___image'
                            />}
                        </div>
                        <div className='blog__bottom'>
                            <h2>{blogData.title}</h2>
                            <div className='blog__body'
                            >
                                <p dangerouslySetInnerHTML={{ __html: blogData.body }}></p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='edit__delete'
                    style={{ display: currentUser?.email == blogData.email ? "inline" : "none" }}
                >
                    <div className='edit__delete__wrapper'>
                        <div className="edit">
                            <span>
                                <IconButton aria-label="delete" size="large"
                                    onClick={() => setShowModal(true)}
                                >
                                    <BorderColorIcon
                                        style={{ color: iconColorChange ? "black" : "white" }}
                                    />
                                </IconButton></span>
                        </div>
                        <div className="delete">
                            <span>
                                <IconButton aria-label="delete" size="large"
                                    onClick={() => setShowModalDelete(true)}
                                >
                                    <DeleteIcon
                                        style={{ color: iconColorChange ? "black" : "white" }}
                                    />
                                </IconButton></span>
                        </div>
                    </div>
                </div>


                <div className="sidebar"
                    style={{ display: commentState ? "inline" : "none" }}
                >
                    <span>
                        <IconButton aria-label="delete" size="large" onClick={() => setCommentState(false)}>
                            <WestIcon
                                style={{ color: "white" }}
                            />
                        </IconButton></span>
                </div>

                <div className='comment__section'
                    style={{ display: commentState == true && "none" }}
                >
                    <IconButton aria-label="delete" size="small" onClick={() => setCommentState(true)}>
                        <EastIcon />
                    </IconButton>
                    <div className='dsiplay__responsive'>
                        <h4>Comments Section</h4>
                    </div>
                    <div className='comment__section__main'>
                        <div className='wrapper__comment__section__input'>
                            <div className='comment__section__input'>
                                <div className='upper__comment__input'>
                                    <Avatar></Avatar>
                                    <p>{currentUser?.username}</p>
                                </div>
                                <div className='lower__comment__input'>
                                    <textarea type="text"
                                        value={comment}
                                        onChange={handleChangeInput}
                                        placeholder="Comments..."
                                    />
                                    <div className='lower__comment__input__button'>
                                        <Button variant="text"
                                            onClick={() => setComment("")}
                                        >C<span>lear</span></Button>
                                        <Button variant="outlined"
                                            onClick={() => handlePostComment(id)}
                                        >
                                            C<span>omment</span>
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <hr />

                        <div className='comment__section__allcomments'>
                            <h4>Comments</h4>
                            <div className="comments__stacks">
                                {loaderComment ? <div className='loaderComment__wrapper'><CircularProgress style={{ color: "black" }} thickness={2} /> </div> : <>
                                    {allComments.length !== 0 ? allComments.map((comment) => {
                                        return <Comment
                                            key={comment._id}
                                            body={comment.body}
                                            username={comment.CommnetUserUsername}
                                            profilepic={comment.commentUserProfilePic}
                                            postId={comment.postId}
                                            date={comment.date}
                                            CommentUserEmail={comment.commentUserEmail}
                                            commentId={comment._id}
                                            handleModalCommentUpdate={handleModalCommentUpdate}
                                        />

                                    }) : <h5>No Comments</h5>}
                                </>}
                            </div>
                        </div>
                    </div>
                </div>
                <ModalEdit
                    key={blogData._id}
                    show={showModal}
                    closeModal={closeModal}
                    blogId={blogData._id}
                    body={blogData.body}
                    category={blogData.category}
                    date={blogData.date}
                    username={blogData.username}
                    title={blogData.title}
                    email={blogData.email}
                    backgroundImage={blogData.backgroundImage}
                    blogData={blogData}
                    setBlogData={setBlogData}
                    handleModalBlogUpdate={handleModalBlogUpdate}
                />
            </div>
        }
        <ModalDelete
            showModalDelete={showModalDelete}
            setShowModalDelete={setShowModalDelete}
            key={blogData._id}
            postId={blogData._id}
            userEmailBlog={blogData.email}
            changeReCallPost={changeReCallPost}

        />
    </>

    )
}

export default Blog