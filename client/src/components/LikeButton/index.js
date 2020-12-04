import React, { useEffect, useState } from 'react'
import { LikedIcon, UnlikedIcon } from './elements'
import { useMutation } from '@apollo/client'
import { POST_LIKE } from '../../util/graphql.querys'

function LikeButton({post: {likeCount, likes, id}, user}) {
  const [liked, setLiked] = useState(false)
  const [likePost] = useMutation(POST_LIKE, {
    variables: { postId: id }
  })

  useEffect(() => {
    if (user && likes.find(like => like.username === user.username)) {
      setLiked(true)
    } else {
      setLiked(false)
    }
  }, [user, likes, setLiked])

  const handleLikePost = () => {
    user && likePost()
  }

  const likeIcon = user 
    ? (
      liked
        ? (
          <LikedIcon />
      )
        : (
          <UnlikedIcon />
      )
    )
    : (
      <UnlikedIcon />
    )

  return (
    <>
      <div onClick={handleLikePost}>
        {likeIcon}
        {likeCount} 
      </div>
    </>
  )
}

export default LikeButton
