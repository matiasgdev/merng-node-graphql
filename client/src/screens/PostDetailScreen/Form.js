import React from 'react';
import useInput from '../../hooks/useInput';
import * as Post from './elements';
import { useMutation } from '@apollo/client';
import { CREATE_COMMENT } from '../../util/graphql.querys';
import Error from '../../components/Error';  

function Form({ postId }) {
  const commentInput = useInput('')
  const [createComment, { error, loading }] = useMutation(CREATE_COMMENT, {
    update: () => {
      commentInput.reset();
    },
    variables: {
      postId: postId,
      body: commentInput.input.value
    }
  });

  const handleCreateComment = evt => {
    evt.preventDefault();
    createComment().catch(() => {});
  };

  return (
    <>
      <Post.Form
        onSubmit={handleCreateComment}
      >
        <Post.CommentInput
          {...commentInput.input}
          placeholder="Send a comment..."
        />
        {/* Display Error */}
        {error && (
          <Error message={error.graphQLErrors[0].message} />
        )}
        <Post.CommentButton
          disabled={loading}
        >
          Send
        </Post.CommentButton>
      </Post.Form>
    </>
  );
};

export default Form
