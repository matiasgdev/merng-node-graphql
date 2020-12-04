import styled, { css } from 'styled-components'
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai'

export const UnlikedIcon = styled(AiOutlineHeart, )`
font-size: 1em;
color: var(--black);
cursor: pointer;
`

export const LikedIcon = styled(AiFillHeart)`
font-size: 1em;
color: red;
cursor: pointer;
`