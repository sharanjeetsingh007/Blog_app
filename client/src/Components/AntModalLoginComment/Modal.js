import React, { useState } from 'react'
import { Button, Modal } from 'antd';
import "./Modal.css"
import "antd/dist/antd.css";
import Login from "../../Pages/Login"
import { Link, useLocation, useNavigate } from "react-router-dom";





function ModalAntComment({ modalLogin, changeModalLogin, From }) {
    // react-router 
    const navigate = useNavigate();
    const location = useLocation();

    // state
    const [formikChangeToInitial, setFormikChangeToInitial] = useState(false);


    // As per the login status route the user
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
            onOk={handleOk}
            okText={"Login"}
            footer={null}
            bodyStyle={{
                height: "390px"
            }}

            onCancel={() => {

                changeModalLogin(false)
                setFormikChangeToInitial(pervState => !pervState)
            }}
        >
            <div className='right__content'>
                <Login
                    currentPath={location.pathname}
                    changeModalLogin={changeModalLogin}
                    initialValueEmail={""}
                    initialValuePass={""}
                    formikChangeToInitial={formikChangeToInitial}

                />
            </div>
        </Modal >

    )
}

export default ModalAntComment