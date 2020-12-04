import styled, { css, keyframes } from 'styled-components'
import { Link } from 'react-router-dom'
import { AiFillHeart, AiOutlineHeart, AiOutlineComment, AiOutlineClose } from 'react-icons/ai'

const transitionGroup = keyframes`
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
`

export const PostContainer = styled.div`
  padding: .5em .3em;
  border: 1px solid rgba(0,0,0,.1);
  animation: ${transitionGroup} 350ms ease-in forwards;
`

export const PostInfo = styled.div`
  display: flex;
  justify-content: flex-end;
  & > * {
    margin-left: .3em;
  }
`

export const PostUsername = styled.span`
  font-weight: bold;
`

export const PostBody = styled(Link)`
  display: block;
  text-decoration: none;
  font-size: .9em;
  color: #606060;
` 



export const CommentIcon = styled(AiOutlineComment)`
  font-size: 1em;
  cursor: pointer;
`

export const DeleteIcon = styled(AiOutlineClose)`
  
`

