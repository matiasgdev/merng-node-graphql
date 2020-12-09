import React from 'react'
import { useMutation } from '@apollo/client'
import { DELETE_POST, GET_POSTS_QUERY, DELETE_COMMENT } from '../../util/graphql.querys'
import { AiOutlineClose } from 'react-icons/ai'
import styled from 'styled-components'

const DeleteIcon = styled(AiOutlineClose)`
  float: right;
  cursor: pointer;
  font-size: .750em;
`

function DeleteButton({ postId, cb, updateCache, commentId }) {
  const mutation = commentId ? DELETE_COMMENT : DELETE_POST
  const [deleteAction] = useMutation(mutation,{
    update: (cache) => {
      // condition for delete post/comment
      if (updateCache && !commentId) {
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
    variables: { postId, commentId }
  })

  const handleDeleteAction = () => {
    let confirmDelete = window.confirm('Do you wanna delete this?')
    confirmDelete &&  deleteAction()
  }
  
  return <DeleteIcon onClick={handleDeleteAction} />
}

export default DeleteButton