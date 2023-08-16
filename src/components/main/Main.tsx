import React from 'react'
import NewTweet from './NewTweet'
import TweetList from './TweetList'

const Main = () => {
  return (
    <div className='main'>
        <NewTweet/>
        <TweetList />
    </div>
  )
}

export default Main