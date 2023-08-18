import React from 'react'
import { auth } from '../../firebase'
import { useAuthState } from 'react-firebase-hooks/auth';
import { Avatar } from '@mui/material';
import { useSelector } from 'react-redux';
import { selectUser } from '../../features/userSlice';


const SidebarIcon = () => {
  const user = useSelector(selectUser)
  return (
    <div className='sidebarIcon'>
      {user?.photoUrl && 
      <Avatar 
        src={user.photoUrl}
        alt='' 
        sx={{ width: 56, height: 56 }}
      />}
      <p>{user?.displayName}</p>
    </div>
  )
}

export default SidebarIcon
