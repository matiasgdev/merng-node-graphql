import { useMutation } from '@apollo/client'
import { useHistory } from 'react-router-dom'
import { GET_POSTS_QUERY, CREATE_POST_MUTATION } from '../util/graphql.querys'

function useCreatePostForm(values, setValues) {
  let history = useHistory()
  
  const [createPost, { loading, error }] = useMutation(CREATE_POST_MUTATION, {
    update: (cache, result) => {
      try {
        let { data: { createPost: { id }}} = result

        const { getPosts: currentPosts }  = cache.readQuery({
          query: GET_POSTS_QUERY
        })
        cache.writeQuery({
          query: GET_POSTS_QUERY,
          data: {
            getPosts: [...currentPosts, createPost]
          }
        })

        // history.push(`/post/${id}`)
        setValues('')

      } catch(err) {
        console.error(err)
      }
    },
    variables: values
  })

  return {
    error,
    loading,
    createPost
  }
}

export default useCreatePostForm
