import React from 'react'
import { useMutation } from '@apollo/client'
import { DELETE_POST, GET_POSTS_QUERY } from '../../util/graphql.querys'
import { useHistory } from 'react-router-dom'

import { AiOutlineClose } from 'react-icons/ai'
import styled from 'styled-components'

const DeleteIcon = styled(AiOutlineClose)`
  float: right;
  cursor: pointer;
  font-size: .750em;
`

function DeletePostButton({ postId, cb, updateCache }) {
  const [deletePost] = useMutation(DELETE_POST,{
    update: (cache) => {
      if (updateCache) {
        const { getPosts: currentPosts }  = cache.readQuery({
          query: GET_POSTS_QUERY
        })
  
        cache.writeQuery({
          query: GET_POSTS_QUERY,
          data: {
            getPosts: currentPosts.filter(p => p.id !== postId)
          }
        })
      }
      cb && cb()
    },
    variables: { postId }
  })

  const handleDeletePost = () => {
    let confirmDelete = window.confirm('Do you wanna delete this post?')
    confirmDelete &&  deletePost()
  }
  
  return <DeleteIcon onClick={handleDeletePost} />
  
}

export default DeletePostButton