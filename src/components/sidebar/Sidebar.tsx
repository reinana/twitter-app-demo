import React from 'react'
import { SidebarData } from './SidebarData'
import SidebarIcon from './SidebarIcon'
import { Button } from '@mui/material'
import { auth } from '../../firebase'

const Sidebar = () => {
    return (
        <div className='sidebar'>
            <ul className='sidebarList'>
                {SidebarData.map((value, key) => {
                    return (
                        <li
                        key={key}
                        id={window.location.pathname == value.link ? "active" : ""}
                        className='row'
                        onClick={() => {
                            window.location.pathname = value.link
                        }}
                        >
                            <div id='icon'>{value.icon}</div>
                            <div id='title'>{value.title}</div>
                        </li>
                    )
                })}
            </ul>
            <SidebarIcon />
            <Button variant="contained" onClick={() => auth.signOut()}>サインアウト</Button>
        </div>
    )
}

export default Sidebar