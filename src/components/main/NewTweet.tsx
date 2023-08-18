import React, { useState } from 'react'
// firebase関連
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, db, storage } from '../../firebase'
import firebase from 'firebase/app'
import { Timestamp, addDoc, collection, doc, setDoc } from 'firebase/firestore';
// style
import styles from './NewTweet.module.css';
// material ui
import { Avatar, Button, IconButton } from '@mui/material';
// icons
import CropOriginalIcon from '@mui/icons-material/CropOriginal';
import GifBoxOutlinedIcon from '@mui/icons-material/GifBoxOutlined';
import FormatListBulletedOutlinedIcon from '@mui/icons-material/FormatListBulletedOutlined';
import SentimentSatisfiedOutlinedIcon from '@mui/icons-material/SentimentSatisfiedOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import { AddAPhoto } from '@mui/icons-material';
// uuid
import { v4 as uuidv4 } from 'uuid';
import { getDownloadURL, ref, uploadBytes, uploadBytesResumable } from 'firebase/storage';

const NewTweet = () => {
    const [user] = useAuthState(auth);
    const [tweetImage, setTweetImage] = useState<File | null>(null);
    const [tweetText, setTweetText] = useState("");

    // 画像のセット
    const onChangeImageHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files![0]) {
            setTweetImage(e.target.files![0]);
            e.target.value = ""
        }
    }

    // tweetを投稿する
    const sendTweet = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        let fileName = "";
        if (tweetImage) {
            // 一意のファイルネームを作る
            const uniqueId = uuidv4();
            console.log('A unique ID:', uniqueId);
            fileName = tweetImage.name + "_" + uniqueId;

            const storageRef = ref(storage, `images/${fileName}`)
            const uploadTask = uploadBytesResumable(storageRef, tweetImage);
            // アップロードを監視する documentからコピペ
            uploadTask.on('state_changed',
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log('Upload is ' + progress + '% done');
                    switch (snapshot.state) {
                        case 'paused':
                            console.log('Upload is paused');
                            break;
                        case 'running':
                            console.log('Upload is running');
                            break;
                    }
                },
                (error) => {
                    // Handle unsuccessful uploads
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                        console.log('File available at', downloadURL);
                        await addDoc(collection(db, "posts"), {
                            avatar: user?.photoURL,
                            image: downloadURL,
                            text: tweetText,
                            timestamp: Timestamp.fromDate(new Date()),
                            username: user?.displayName
                        });
                    });
                }
            );
        } else {
            console.log("tweet")
            await addDoc(collection(db, "posts"), {
                avatar: user?.photoURL,
                image: "",
                text: tweetText,
                timestamp: Timestamp.fromDate(new Date()),
                username: user?.displayName
            });
        }
    }
    return (
        <form onSubmit={sendTweet}>

        <div className='newTweet'>
            <div className='newTweetInput'>
                {user?.photoURL && <Avatar src={user.photoURL} />}
                <textarea
                    id="textfield"
                    placeholder='いまどうしてる？'
                    value={tweetText}
                    onChange={(e) => setTweetText(e.target.value)}
                />
            </div>
            <div className='icons-and-button'>
                <div className="smallIcons">
                    <IconButton>
                        <label className="smallIcons">
                            <CropOriginalIcon />
                            <input
                                className={styles.tweet_hiddenIcon}
                                type='file'
                                onChange={onChangeImageHandler}
                            />
                        </label>
                    </IconButton>
                    <IconButton>
                        <label className="smallIcons">
                            <GifBoxOutlinedIcon onClick={() => alert("Sorry! Not implemented yet")}/>
                        </label>
                    </IconButton>
                    <IconButton>
                        <label className="smallIcons">
                            <FormatListBulletedOutlinedIcon onClick={() => alert("Sorry! Not implemented yet")}/>
                        </label>
                    </IconButton>
                    <IconButton>
                        <label className="smallIcons">
                            <SentimentSatisfiedOutlinedIcon onClick={() => alert("Sorry! Not implemented yet")}/>
                        </label>
                    </IconButton>
                    <IconButton>
                        <label className="smallIcons">
                            <CalendarMonthOutlinedIcon onClick={() => alert("Sorry! Not implemented yet")}/>
                        </label>
                    </IconButton>
                </div>
                <Button
                    type='submit'
                    disabled={!tweetText} // textがないと押せない
                    className={
                        tweetText ? styles.tweet_sendBtn : styles.tweet_sendDisabledBtn
                    }
                    variant="contained"
                    sx={{ borderRadius: 10, p: 1, mb: 1,minWidth: 150 }}>ツイートする</Button>
            </div>
            <hr />
        </div>
        </form>
    )
}

export default NewTweet