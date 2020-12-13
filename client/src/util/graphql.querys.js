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

export const LOGIN_MUTATION = gql`
  mutation login(
    $email: String!
    $password: String!
  ) {
    login(
      loginInput: {
        email: $email
        password: $password
      }
    ) {
      id email username token createdAt
    }
  }
`

export const REGISTER_MUTATION = gql`
  mutation register(
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      registerInput: {
        username: $username
        email: $email
        password: $password
        confirmPassword: $confirmPassword
      }
    ) {
      id email username token createdAt
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
        createdAt
        body
        username
      }
      likeCount
      likes {
        id
        username
      }
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

export const DELETE_POST = gql`
  mutation deletePost($postId: ID!) {
    deletePost(postId: $postId)
  }
`

export const CREATE_COMMENT = gql`
  mutation createComment($postId: String!, $body: String!) {
    createComment(postId: $postId, body: $body) {
      id
      body
      username
      createdAt
      comments {
        id
        body
        username
        createdAt
      }
      likes {
        id
        username
      }
      likeCount
      commentCount
    }
  }
`
export const DELETE_COMMENT = gql`
  mutation deleteComment($postId: ID!, $commentId: ID!) {
    deleteComment(postId: $postId, commentId: $commentId) {
      id
      body
      username
      createdAt
      comments {
        id
        body
        username
        createdAt
      }
    }
  }
`

