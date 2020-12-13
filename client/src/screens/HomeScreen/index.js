import React, { useContext } from 'react'
import { useQuery } from '@apollo/client'
import { AuthContext } from '../../context/auth'
import { GET_POSTS_QUERY } from '../../util/graphql.querys'

import PostItem from '../../components/PostItem'
import Loader from '../../components/Loader'
import CreatePostForm from '../../components/CreatePostForm'
import { ListOfPosts, HomeContainer } from './elements'
import { Title } from '../../elements'

const Home = () => {
  const { user } = useContext(AuthContext)
  const { 
    loading, 
    data: { getPosts: posts } = {} 
  } = useQuery(GET_POSTS_QUERY)

  return (
    <HomeContainer>
      {user &&
        <CreatePostForm />
      }
      <Title>
          Recent posts
      </Title>
      <ListOfPosts>
        {loading ? (
          <Loader />
        ) : (
          posts && posts.length > 0 
          ? posts.map(post => (
            <PostItem key={post.id} {...post}/>
          ))
          : <p>No posts yet :(</p>
        )}
      </ListOfPosts>
    </HomeContainer>
  )
}

export default Home
