import React from 'react'
import './BackButton.css'
import Button from '@mui/material/Button';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { useNavigate, useLocation } from 'react-router-dom'


function BackButton() {

    const navigate = useNavigate();

    return (
        <Button
            onClick={() => navigate("/")}
            variant="contained"
            size="small"
            id='back-button'
            style={{ backgroundColor: "white", border: "1px solid black", color: "black" }}
            startIcon={<ChevronLeftIcon />}>
            B<span>ack</span>
        </Button>
    )
}

export default BackButton