import React, { useState, useEffect } from 'react'
//firebase関連
import { QuerySnapshot, collection, doc, getDoc, getDocs, limit, onSnapshot, orderBy, query } from "firebase/firestore";

import Tweet from './Tweet'
import { db } from '../../firebase';
const TweetList: React.FC = () => {
  const [posts, setPosts] = useState([{
    id: "",
    avatar: "",
    image: "",
    text: "",
    timestamp: null,
    username: ""
  }])

  useEffect(() => {
    const postsRef = collection(db, 'posts');
    // const docSnap = getDocs(postsRef) // postsを取得 promise
    const q = query(postsRef, orderBy("timestamp", "desc"), limit(50));
    const unSub = onSnapshot(q, (snapshot) => 
      setPosts(
        snapshot.docs.map((doc:any) => ({        
            id: doc.id,
            avatar: doc.data().avatar,
            image: doc.data().image,
            text: doc.data().text,
            timestamp: doc.data().timestamp,
            username: doc.data().username
        }))
      )
    );
    return () => unSub();
  }, [])
  return (
    <div>
      {posts[0]?.id && (
        <>
          {posts.map((post) => (
            <Tweet
              key={post.id}
              postId={post.id}
              avatar={post.avatar}
              image={post.image}
              text={post.text}
              timestamp={post.timestamp}
              username={post.username}
            />
          ))}
        </>
      )}
    </div>
  )
}

export default TweetList