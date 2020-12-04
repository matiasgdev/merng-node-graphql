import { gql } from '@apollo/client'

export const GET_POSTS_QUERY = gql`
  query {
    getPosts {
      id
      body
      createdAt
      username
      likes {
        username
      }
      comments {
        id
        username
        body
      }
      likeCount
      commentCount
    }
}
`

export const GET_POST_QUERY = gql`
  query($postId: ID!) {
    getPost(postId: $postId) {
      id
      body
      createdAt
      username
      comments {
        id
        body
        username
      }
      likes {
        id
        username
      }
      commentCount
      likeCount
    }
}
`


export const CREATE_POST_MUTATION = gql`
  mutation createPost(
    $body: String!
  ) {
    createPost(body: $body) {
      id body username commentCount likeCount createdAt
      comments {
        id body username createdAt
      }
    }
  }
`

export const POST_LIKE = gql`
  mutation likePost(
    $postId: ID!
  ) {
    likePost (postId: $postId) {
      id
      likes {
        id
        username
      }
      likeCount
    }
  }
`
