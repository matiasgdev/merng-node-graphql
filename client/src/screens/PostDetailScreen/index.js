import React from 'react'
import { useQuery } from '@apollo/client'
import { GET_POST_QUERY } from '../../util/graphql.querys'

function PostDetailScreen({match}) {
  const { params: { id } } = match

  const { data: { getPost: singlePost } = {} } = useQuery(GET_POST_QUERY, {
    variables: {
      postId: id
    }
  })

  let postJSX
  if (!singlePost) {
    postJSX = <p>Loading...</p>
  } else {
    const { id, body, username, createdAt, comments, likes, likeCount, commentCount} = singlePost
    postJSX = (
      <div>
        <div>{id}</div>
        <div>{username}</div>
        <div>{body}</div>
      </div>
    )
  }

  return postJSX
}

export default PostDetailScreen
