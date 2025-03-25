// App implementation
import React from 'react';
import LikeButton from './LIkeButton';

function App()
{
  return (
    <div>
      <h1>Like Button Example</h1>
      <LikeButton postId = "post-1"/>
      <LikeButton postId = "post-2"/>
      <LikeButton postId = "post-3"/>
    </div>

  );
}

export default App;

// Like Button implementation
import React, { useState, useEffect } from "react";

function LikeButton({postId})
{
    const [isLiked, setIsLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(0);

    // local storage key
    const localStorageKey = `likeData-${postId}`;

    // Load data from local storage on component mount
    useEffect(() => {
        const storedData = localStorage.getItem(localStorageKey);
        if(storedData)
        {
            const { liked, count } = JSON.parse(storedData);    // parse - to store data
            setIsLiked(liked);
            setLikeCount(count);
        }
    }, [localStorageKey]);

    // Save data to local storage whenever isLiked or likeCount changes
    useEffect(() => {
        localStorage.setItem(
            localStorageKey,
            JSON.stringify({ liked: isLiked, count: likeCount })
        )
    }, [isLiked, likeCount, localStorageKey]);

    // Handle button click
    const handleLikeClick = () => {
        setIsLiked(!isLiked);
        setLikeCount(isLiked ? likeCount - 1 : likeCount + 1);
    };

    return (
        <button
        onClick={handleLikeClick}
        style={{
          backgroundColor: isLiked ? 'blue' : 'lightgray',
          color: 'white',
          padding: '10px 20px',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '5px'
        }}
      >
        <span role="img" aria-label="like-icon">
          {isLiked ? '❤️' : '🤍'}
        </span>
        {isLiked ? 'Liked' : 'Like'} ({likeCount})
      </button>
    );
}

export default LikeButton;
