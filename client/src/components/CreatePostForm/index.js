import React, { useState } from 'react'
import useCreatePostForm from '../../hooks/useCreatePostForm'
import { Button } from '../../elements'

function CreatePostForm() {
  const [body, setBody] = useState('')
  const {createPost, error, loading} = useCreatePostForm({body}, setBody)

  const handleCreatePost = async e => {
    e.preventDefault()
    // ignore GraphQL Rejection
    createPost().catch(() => {})
  }

  return (
    <div>
      <form
        onSubmit={handleCreatePost}
      >
        <div>
          <textarea
            onChange={e => setBody(e.target.value)}
            value={body}
            placeholder="Share with us what are you thinking"
          />
        </div>
        <div>
            <Button
              disabled={loading}
            >
              {loading ? "Sending data..." : "Send"}
            </Button>
        </div>
        <div>
          {error &&
            <div key={error.message}>{error.message}</div>
          }
        </div>
      </form> 
    </div>
  )
}

export default React.memo(CreatePostForm)
