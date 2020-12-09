import styled, { css } from 'styled-components'
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai'


export const Container = styled.div`
  cursor: pointer;
  max-width: min-content;
  display: inline-flex;
  align-items: center;
  padding: .3em 0;

  & > *:first-child {
    margin-right: .2em;
  }
`

export const Unliked  = styled(AiOutlineHeart, )`
  font-size: 1em;
  color: var(--black);
  cursor: pointer;
`

export const Liked = styled(AiFillHeart)`
  font-size: 1em;
  color: red;
`
export const Count = styled.span`
  font-size: .7em;
  font-weight: bold;
`

