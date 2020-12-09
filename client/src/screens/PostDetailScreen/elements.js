import styled from 'styled-components'
import { Button } from '../../elements'

export const Container = styled.div`
  padding: .8em;
  margin: 2em auto;
  max-width: 600px;
  min-height: 100vh;

  border: 1px solid #f2f2f2;

`

export const Card = styled.div`

`

export const Body = styled.p`
  margin: .7em 0;
  font-size: 1.1em;
  line-height: 0.7;
  letter-spacing: 0.046em;
  font-weight: 100;

`

export const Info = styled.div`
  margin-top: .5em;
  display: flex;
  flex-direction: column;

  & > span {
    font-size: .7em;
    font-style: italic;
  }
`

export const Username = styled.h4`
  font-size: 1.8em;
`

export const Comments  = styled.div`
  margin-top: 1.3em;
`
export const Form = styled.form`
  display: flex;
  flex-direction: column;
  & > * {
    margin-top: .5em;
  }
`

export const CommentInput = styled.textarea`
  border: 1px solid #e2e2e2;
  padding: .3em;
  font-family: Helvetica, sans-serif;
  min-height: 60px;
  max-height: 220px;
  max-width: 100%;
  min-width: 100%;
`

export const CommentButton = styled(Button)`
  font-size: .8em;
  padding: 8px 12px;
  max-width: 150px;
  text-overflow: ellipsis;
`

export const CommentCard = styled.div`
  padding: .7em 0;
  border-bottom: 1px solid #f4f4f4;
`

export const CommentCardUser = styled.div`
  font-weight: bold;
`

export const CommentCardDate = styled.div`
  font-size: .8em;
  color: lightgray;
`

export const CommentCardBody = styled.div`
  font-size: .9em;
  padding-top: .6em;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
  white-space: nowrap;
`

export const NoComments = styled.div`
  text-align: center;
  font-style: italic;
  font-size: 1em;
  color: lightgray;
  padding: 1em 0;
`

