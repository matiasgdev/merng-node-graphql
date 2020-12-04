import React from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import styled from 'styled-components'

const DeleteIcon = styled(AiOutlineClose)`
  float: right;
  cursor: pointer;
  font-size: .750em;
`

function DeletePostButton({ postId }) {
  
  const handleDeletePost = () => {
    console.log("delete post " + postId)
  }
  
  return <DeleteIcon onClick={handleDeletePost}/>
  
}

export default DeletePostButton