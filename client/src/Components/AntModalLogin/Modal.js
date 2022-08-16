import React from 'react'
import { Modal } from 'antd';
import Button from '@mui/material/Button';
import "./Modal.css"
import "antd/dist/antd.css";
import Login from "../../Pages/Login"
import { Link, useLocation, useNavigate } from "react-router-dom";





function ModalAnt({ modalLogin, changeModalLogin, From }) {

    const navigate = useNavigate();
    const location = useLocation();

    // console.log('hash', location.hash);
    console.log('pathname', location.pathname);
    // console.log('search', location.search);


    console.log(From, 'From from router')

    console.log(modalLogin, "modalLoginin modalAnt")

    const handleOk = () => {
        if (From == 'plus-button') {
            navigate("/createPost")
        } else {
            navigate("/")
        }
    }


    return (

        <Modal
            title="Login Required"
            centered
            visible={modalLogin}
            // onOk={handleOk}
            // okText={"Login"}
            footer={null}
            onCancel={() => changeModalLogin(false)}
        >

            {/* <div className='modal__body'> */}

            {/* <div className='left__content'>
                    left
                </div> */}
            {/* <div className='right__content'>
                    <Login From={From} />
                </div> */}
            <div className='body___custom'><h5>Login required to create blog, wanna login?</h5></div>
            {/* </div> */}
            <div className='footer__custom'>
                <Button variant="outlined"
                    style={{ border: "1px solid black", color: 'black' }}
                    onClick={() => changeModalLogin(false)}
                >C<span>ancel</span></Button>
                <Button variant="contained"
                    onClick={handleOk}
                >L<span>ogin</span></Button>

            </div>
        </Modal>

    )
}

export default ModalAnt