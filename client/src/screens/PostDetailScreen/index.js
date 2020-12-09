import React, { useContext, useState, useEffect, useRef } from 'react'
import { useQuery } from '@apollo/client'
import { GET_POST_QUERY } from '../../util/graphql.querys'
import { AuthContext } from '../../context/auth'
import formatDate from '../../util/formatDate'
import Loader from '../../components/Loader'
import LikeButton from '../../components/LikeButton'
import Form from './Form'
import * as Post from './elements'
import DeleteButton from '../../components/DeleteButton'

function PostDetailScreen({ match, history }) {
  const { params: { id } } = match
  const { user } = useContext(AuthContext)
  const [ postOwner, setPostOwner ] = useState(false)
 
  const { data: { getPost: singlePost } = {} } = useQuery(GET_POST_QUERY, {
    variables: {
      postId: id
    }
  })
  
  useEffect(function() {
    const isPostOwner = singlePost && user && user.username === singlePost.username
    if (isPostOwner) {
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
          <DeleteButton
            postId={id} 
            cb={() => history.push('/')} 
            updateCache={true}
          />
        )}
        <Post.Username>{username}</Post.Username>
        <Post.Info>
          <span>{formatDate(createdAt)}</span>
          <LikeButton post={{id, likes, likeCount}} user={user}   />
        </Post.Info>
        <Post.Body>{body}</Post.Body>
        {user && (
          <Form postId={id}/>
        )}
        <Post.Comments>
          {comments.length > 0 
            ? comments.map(c => (
              <Post.CommentCard key={c.id}>
                {user && user.username === c.username && (
                  <DeleteButton commentId={c.id} postId={id}/>
                )}
                <Post.CommentCardUser>
                  {c.username}
                </Post.CommentCardUser>
                <Post.CommentCardDate>
                  {formatDate(c.createdAt)}
                </Post.CommentCardDate>
                <Post.CommentCardBody>
                  {c.body}
                </Post.CommentCardBody>
              </Post.CommentCard>
            ))
            : (
              <Post.NoComments>
                No comments yet. Soyez le premier
              </Post.NoComments>
          )}
        </Post.Comments>
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
