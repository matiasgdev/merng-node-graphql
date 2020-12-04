import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../context/auth'
import LikeButton from '../LikeButton'
import DeletePostButton from '../DeletePostButton'
import {
  CommentIcon,
  UnlikedIcon,
  PostContainer,
  PostInfo,
  PostUsername,
  PostBody
} from './elements'

const PostItem = ({
  id,
  body,
  username,
  likeCount,
  likes,
  commentCount 
}) => {

  const { user } = useContext(AuthContext)
  const [postOwner, setPostOwner] = useState(false)

  const likePost = () => {
    console.log('Like post')
  }

  const commentPost = () => {
    console.log('Comment post')
  }


  useEffect(function() {
    if (user && user.username === username) {
      setPostOwner(true)
    } else {
      setPostOwner(false)
    }
  })

  return (
    <PostContainer>
      {postOwner && (
        <DeletePostButton postId={id}/>
      )}
      <PostUsername>{username}</PostUsername>
      <PostBody to ={`/post/${id}`}>{body}</PostBody>
      <PostInfo>
        <LikeButton post={{id, likes, likeCount}} user={user}/>
        <CommentIcon onClick={commentPost} /> {commentCount}
      </PostInfo>
    </PostContainer>
  )
}

export default React.memo(PostItem)
