import React from 'react'
import './SideBar.css'
import { NavLink } from "react-router-dom"
import CloseIcon from '@mui/icons-material/Close';


function SideBarNav() {
    return (
        <div className='sidebar__main'>
            <h4>The Writer</h4>

            <nav>
                <ul>
                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            isActive ? "activeClassName" : undefined
                        }
                    >
                        <li>
                            Home
                        </li>
                    </NavLink>
                    <NavLink
                        to="/createPost"
                        className={({ isActive }) =>
                            isActive ? "activeClassName" : undefined
                        }
                    >
                        <li>
                            CreatePost
                        </li>
                    </NavLink>
                    <NavLink
                        to="/login"
                        className={({ isActive }) =>
                            isActive ? "activeClassName" : undefined
                        }
                    >
                        <li>
                            Login
                        </li></NavLink>
                    <NavLink
                        to="/register"
                        className={({ isActive }) =>
                            isActive ? "activeClassName" : undefined
                        }
                    >
                        <li>
                            Register
                        </li>
                    </NavLink>
                </ul>

            </nav>


        </div>
    )
}

export default SideBarNav