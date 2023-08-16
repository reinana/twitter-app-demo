import React from 'react'
import { auth } from '../../firebase'
import { useAuthState } from 'react-firebase-hooks/auth';
import { Avatar } from '@mui/material';


const SidebarIcon = () => {
  const [user] = useAuthState(auth);
  return (
    <div className='sidebarIcon'>
      {user?.photoURL && 
      <Avatar 
        src={user.photoURL}
        alt='' 
        sx={{ width: 56, height: 56 }}
      />}
      {/* <p>{user?.displayName}</p> */}
    </div>
  )
}

export default SidebarIcon
