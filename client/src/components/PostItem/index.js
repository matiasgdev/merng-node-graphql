import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../context/auth'
import LikeButton from '../LikeButton'
import DeleteButton from '../DeleteButton'
import { Link } from 'react-router-dom'
import {
  CommentIcon,
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
        <DeleteButton postId={id} updateCache={true}/>
      )}
      <PostUsername>{username}</PostUsername>
      <PostBody to ={`/post/${id}`}>{body}</PostBody>
      <PostInfo>
        <LikeButton post={{id, likes, likeCount}} user={user}/>
        <Link to={`/post/${id}`}>
          <CommentIcon /> {commentCount}
        </Link>
      </PostInfo>
    </PostContainer>
  )
}

export default React.memo(PostItem)
