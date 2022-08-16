import React from 'react'
import { Modal } from 'antd';
import Button from '@mui/material/Button';
import "./Modal.css"
import "antd/dist/antd.css";
import { useNavigate } from "react-router-dom";




function ModalAnt({ modalLogin, changeModalLogin, From }) {

    const navigate = useNavigate();

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
            footer={null}
            onCancel={() => changeModalLogin(false)}
        >
            <div className='body___custom'><h5>Login required to create blog, wanna login?</h5></div>
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