import React from 'react'
import Sidebar from './sidebar/Sidebar'
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';
import Header from './header/Header';
import Main from './main/Main';


const Home = () => {
  return (
    <div>
        <Header />
        <div className='contents'>
            <Sidebar/>
            <Main />
        </div>
    </div>
  )
}

export default Home