import React, { useContext, useState, useEffect, useRef } from 'react'
import { useQuery } from '@apollo/client'
import { GET_POST_QUERY } from '../../util/graphql.querys'
import { AuthContext } from '../../context/auth'
import formatDate from '../../util/formatDate'
import Loader from '../../components/Loader'
import LikeButton from '../../components/LikeButton'
import * as Post from './elements'
import DeletePostButton from '../../components/DeletePostButton'

function PostDetailScreen({ match, history }) {
  const { params: { id } } = match
  const { user } = useContext(AuthContext)
  const [postOwner, setPostOwner] = useState(false)

  const { data: { getPost: singlePost } = {} } = useQuery(GET_POST_QUERY, {
    variables: {
      postId: id
    }
  })
  
  useEffect(function() {
    if (singlePost && user && user.username === singlePost.username) {
      setPostOwner(true)
    } else {
      setPostOwner(false)
    }
  })
    
  let singlePostJSX
  if (!singlePost) {
    singlePostJSX = <Loader />
  } else {
    const { id, body, username, createdAt, comments, likes, likeCount} = singlePost
    singlePostJSX = (
      <Post.Card>
        {postOwner && (
          <DeletePostButton postId={id} cb={() => history.push('/')} updateCache={true}/>
        )}
        <Post.Username>{username}</Post.Username>
        <Post.Body>{body}</Post.Body>
        <Post.Info>
          <span>{formatDate(createdAt)}</span>
          <LikeButton post={{id, likes, likeCount}} user={user} />
        </Post.Info>
        <Post.CommentContainer>
          <Post.CommentInput />
        </Post.CommentContainer>
      </Post.Card>
    )
  }

  return (
    <Post.Container>
      {singlePostJSX}
    </Post.Container>
  )
}

export default PostDetailScreen
