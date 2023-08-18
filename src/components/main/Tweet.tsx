import { Avatar, Container, IconButton } from '@mui/material'
import React, { useEffect } from 'react'
// styles
import styles from './Tweet.module.css'
// icons
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import RepeatIcon from '@mui/icons-material/Repeat';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import EqualizerIcon from '@mui/icons-material/Equalizer';
import IosShareIcon from '@mui/icons-material/IosShare';


interface PROPS {
  postId: string;
  avatar: string;
  image: string;
  text: string;
  timestamp: any;
  username: string;
}

const Tweet: React.FC<PROPS> = (props) => {

  return (
    <div className={styles.tweet}>
      <div className={styles.container}>

      <Avatar
        className='avatarImage'
        src={props.avatar} />
      <Container>
        <div className={styles.name_and_date}>
          <span className={styles.tweet_username}>{props.username}</span>
          <span className={styles.date}>{new Date(props.timestamp?.toDate()).toLocaleString()}</span>
        </div>
        <p>{props.text}</p>
        <img src={props.image} alt='' className={styles.tweet_image} />

      </Container>
      </div>
        <div className={styles.smallIcons}>
          <IconButton>
            <label className="smallIcons">
              <ChatBubbleOutlineIcon onClick={() => alert("Sorry! Not implemented yet")} />
            </label>
          </IconButton>
          <IconButton>
            <label className="smallIcons">
              <RepeatIcon onClick={() => alert("Sorry! Not implemented yet")} />
            </label>
          </IconButton>
          <IconButton>
            <label className="smallIcons">
              <FavoriteBorderIcon onClick={() => alert("Sorry! Not implemented yet")} />
            </label>
          </IconButton>
          <IconButton>
            <label className="smallIcons">
              <EqualizerIcon onClick={() => alert("Sorry! Not implemented yet")} />
            </label>
          </IconButton>
          <IconButton>
            <label className="smallIcons">
              <IosShareIcon onClick={() => alert("Sorry! Not implemented yet")} />
            </label>
          </IconButton>
        </div>
    </div>
  )
}

export default Tweet