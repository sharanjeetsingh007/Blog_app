import { Avatar } from '@mui/material'
import React, { useEffect, useState } from 'react'
import "./Card.css"
import moment from 'moment'
import { useNavigate } from 'react-router-dom'



function Card({ title, category, email, body, backgroundImage, _id, date, username }) {

    // state
    const [loadingImage, setLoadingImage] = useState(true)
    const [bImageVerify, setBImageVerify] = useState("")
    const navigate = useNavigate();


    const handleClick = (id) => {
        navigate(`/currentBlog/${id}`)
    }

    // check if image is valid or not
    useEffect(() => {
        function isImage(url) {
            setBImageVerify(/^(https|http)?:\/\//.test(url))
        }
        isImage(backgroundImage)
    }, [])


    return (
        <div className='Card' onClick={() => handleClick(_id)}>
            <div
                className='card__top'
            >
                {bImageVerify && <img
                    className={loadingImage ? "skeleton" : undefined}
                    style={{ display: loadingImage ? "block" : "none" }}
                />}
                {bImageVerify && <img
                    style={{ display: loadingImage ? "none" : "block" }}
                    src={backgroundImage}
                    onLoad={() => {
                        setLoadingImage(false)
                    }}
                    alt='blog___image'
                />}
                {!bImageVerify && <img
                    src="https://wallpaperaccess.com/full/1285952.jpg"
                    alt='blog___image'
                />}
            </div>
            <div className='card__bottom'>
                <button>{category}</button>
                <h3>{title}</h3>
                <p dangerouslySetInnerHTML={{ __html: body }}></p>
                <div className='card__bottom__profile-date'>
                    <div className='card__bottom__profile-date__left'>
                        <Avatar></Avatar>
                        <div className='author__details'>
                            <h4>{username}</h4>
                            <p>{moment(date).format("dddd, MMMM Do YYYY")}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Card