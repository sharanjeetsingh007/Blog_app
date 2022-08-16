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
// import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
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










    const changeModalLogin = (value) => {
        setModalLogin(value)
    }
    const changeModalLoginComment = (value) => {
        setModalLoginComment(value)
    }

    const changeButtonBackground = () => {
        if (blog__wrapperDoM.scrollTop >= 290) {
            setIconColorChange(true)


            console.log(blog__wrapperDoM.scrollTop, "scroll y 🔥")

            console.log('scroll is greater than then🎃')
        } else {
            setIconColorChange(false)

        }
    }
    // console.log(id, 'id in blog')
    // console.log(blogData, 'blogData')
    const blog__wrapperDoM = document.getElementById("blog__wrapper")

    console.log(blog__wrapperDoM, "BLOG WRAPPER")
    if (blog__wrapperDoM) {
        blog__wrapperDoM.addEventListener("scroll", changeButtonBackground)

    }

    const handleModalBlogUpdate = (values) => {
        console.log(values.title, "clicked update ")
        setBlogData((blogData) => ({

            ...blogData,
            title: values.title,
            body: values.body,
            category: values.category,
            backgroundImage: values.backgroundImage,



        }));
    }

    // setAllComments([...allComments, res.data.data])
    const handleModalCommentUpdate = (values) => {

        let copyAllComments = allComments.map(data => { return { ...data } })
        // console.log(copyAllComments.find(item => item._id == values.id), "find")
        copyAllComments.find(item => item._id == values.id).body = values.body;
        // console.log(copyAllComments, 'array2')
        setAllComments(copyAllComments)
    }


    // console.log(allComments, 'allcomments')

    const handleChangeInput = (e) => {
        // console.log("value changed")
        setComment(e.target.value)
    }



    // Modal function to close 
    const closeModal = (value) => {
        setShowModal(value)
    }


    const handlePostComment = (idIs) => {

        if (!comment) {
            alert("Empty comment can't be posted")
            return;
        }
        // console.log("clicked post comment")
        const data = {
            profilePic: "",
            body: comment,
            postId: idIs,
        }
        axios.post("/comments/postComment", data, { withCredentials: true })
            .then((res) => {
                // console.log(res, "response of posting comment")

                setAllComments([...allComments, res.data.data])
                setComment("")
            })
            .catch((err) => {
                console.log(err, "error of posting comment")
                // alert(err.response.data.error)

                if (err.response.data.error == "User not authorised") {
                    setModalLoginComment(true)
                }
                setComment("")

            })
    }


    // useEffect(() => {

    //     axios.get(`http://localhost:9000/blogPost/currentBlog/${id}`)
    //         .then((res) => {
    //             console.log(res.data.data)
    //             if (res.data.data) {
    //                 setBlogData(res.data.data);
    //                 return;
    //             }
    //         })
    //         .catch((err) => {
    //             alert(err)
    //         })

    // }, [handleModalBlogUpdate])

    useEffect(() => {

        axios.get(`/blogPost/currentBlog/${id}`)
            .then((res) => {
                console.log(res.data.data, "blog data")
                if (res.data.data) {
                    setBlogData(res.data.data);
                    setLoader(false)
                    return;
                }
            })
            .catch((err) => {
                alert(err)
                // setLoader(false)
            })

        // to get current user details
        // axios.get('http://localhost:9000/auth/redirecthome', { withCredentials: true })
        //     .then((res) => {
        //         console.log(res.data, 'current user')
        //         if (res.data.message) {
        //             // console.log(res.data.data, 'current user')
        //             setCurrentUser(res.data.data)


        //         }
        //     })
        //     .catch((err) => {
        //         console.log(err)
        //     })


        axios.get(`/comments/${id}`)
            .then((res) => {

                // console.log(res.data.data, "in all comments")
                setAllComments(res.data.data)
                setLoaderComment(false)
                // setAllComments(state => [...state, res.data.data])

            })
            .catch((err) => {
                alert(err)
            })

    }, [])




    useEffect(() => {
        //get currnet user
        axios.get('/auth/redirecthome', { withCredentials: true })
            .then((res) => {
                console.log(res.data, 'current user')
                if (res.data.message) {
                    // console.log(res.data.data, 'current user')
                    setCurrentUser(res.data.data)


                }
            })
            .catch((err) => {
                console.log(err)
            })

    }, [!modalLoginComment, modalLoginComment])



    useEffect(() => {
        function isImage(url) {
            console.log(/^(https|http)?:\/\//.test(url), "jijijijijijijjijijijii");
            setBImageVerify(/^(https|http)?:\/\//.test(url))
        }
        isImage(blogData.backgroundImage)
    }, [blogData.backgroundImage])



    console.log(currentUser, 'current userrrrr')
    console.log(allComments, 'allComments ')

    return (<>
        {/* {showModalDelete ? <ModalDelete /> : */}
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
                            // src={backgroundImage}
                            // onLoad={() => setLoadingImage(false)}
                            />}


                            {bImageVerify && <img
                                // className={loadingImage && 'skeleton'}
                                style={{ display: loadingImage ? "none" : "block" }}
                                src={blogData.backgroundImage}
                                alt='blog-image'
                                onLoad={() => setLoadingImage(false)}
                            />}

                            {!bImageVerify && <img
                                // className={loadingImage ? "skeleton" : undefined}
                                // style={{ display: loadingImage ? "none" : "block" }}
                                src="https://wallpaperaccess.com/full/1285952.jpg"

                                alt='blog___image'

                            />}


                            {/* {!bImageVerify && <img
                                src="https://wallpaperaccess.com/full/1285952.jpg"
                                alt='blog-image'
                            />} */}
                        </div>
                        <div className='blog__bottom'>
                            <h2>{blogData.title}</h2>
                            <div className='blog__body'
                            // style={{ width: commentState ? "1100px" : "870px" }}

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

        {/* } */}
    </>

    )
}

export default Blog