import React, { useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../../firebase'
import { Avatar, Button, TextField } from '@mui/material';
import CropOriginalIcon from '@mui/icons-material/CropOriginal';
import GifBoxOutlinedIcon from '@mui/icons-material/GifBoxOutlined';
import FormatListBulletedOutlinedIcon from '@mui/icons-material/FormatListBulletedOutlined';
import SentimentSatisfiedOutlinedIcon from '@mui/icons-material/SentimentSatisfiedOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';

const NewTweet = () => {
    const [user] = useAuthState(auth);
    const [post, setPost] = useState("いまどうしてる？");
    return (
        <div className='newTweet'>
            <div className='newTweetInput'>
                {user?.photoURL && <Avatar src={user.photoURL} />}
                <textarea
                    id="textfield"
                    value={post}
                    onChange={(e) => setPost(e.target.value)}
                />
            </div>
            <div className='icons-and-button'>
                <div className="smallIcons">
                    <CropOriginalIcon />
                    <GifBoxOutlinedIcon />
                    <FormatListBulletedOutlinedIcon />
                    <SentimentSatisfiedOutlinedIcon />
                    <CalendarMonthOutlinedIcon />
                </div>
                <Button
                    variant="contained"
                    sx={{ borderRadius: 10, p: 1, minWidth: 150 }}>ツイートする</Button>
            </div>
            <hr />
        </div>
    )
}

export default NewTweet