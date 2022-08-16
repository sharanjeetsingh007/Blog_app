import React from 'react'
import './SideBar.css'
import { NavLink } from "react-router-dom"
import CloseIcon from '@mui/icons-material/Close';
import SideBarNav from './SideBarNav';



function SideBar({ changeSidebarToggle, sidebarToggle }) {

    // change sidebar change
    const handleChangesSidebar = (event) => {
        const sidebar__main = document.getElementsByClassName("sidebar__main")
        changeSidebarToggle(true)
    }

    return (
        <div className={!sidebarToggle ? 'SideBar' : "sidebar--active"}
        >
            <div className={!sidebarToggle ? 'wrapper__sidebar' : 'wrapper__sidebar--active'}>
                <SideBarNav />

            </div>
            <CloseIcon
                fontSize='large'
                style={{ color: "white", cursor: "pointer", marginLeft: "5px" }}
                onClick={handleChangesSidebar} />
        </div>
    )
}

export default SideBar