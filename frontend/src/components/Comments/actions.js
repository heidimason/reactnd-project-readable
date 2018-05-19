import {
  fetchComments,
  createComment,
  reviseComment,
  commentUpvote,
  commentDownvote,
  deleteComment
} from '../../utils/ReadableAPI'

export const GET_COMMENTS = 'GET_COMMENTS'
export const ADD_COMMENT = 'ADD_COMMENT'
export const EDIT_COMMENT = 'EDIT_COMMENT'
export const UPVOTE_COMMENT = 'UPVOTE_COMMENT'
export const DOWNVOTE_COMMENT = 'DOWNVOTE_COMMENT'
export const REMOVE_COMMENT = 'REMOVE_COMMENT'

export const getComments = d => {
  return dispatch => {
    fetchComments(d)
      .then( comments =>
        dispatch({
          type: GET_COMMENTS,
          comments
        })
      )
      .catch( () =>
        alert('Error getting comments!')
      )
  }
}

export const addComment = d => {
  return dispatch => {
    createComment(d)
      .then( comment =>
        dispatch({
          type: ADD_COMMENT,
          comment
        })
      )
      .catch( () =>
        alert('Error adding comment!')
      )
  }
}

export const editComment = d => {
  return dispatch => {
    reviseComment(d)
      .then( comment =>
        dispatch({
          type: EDIT_COMMENT,
          comment
        })
      )
      .catch( () =>
        alert('Error editing comment!')
      )
  }
}

export const upvoteComment = d => {
  return dispatch => {
    commentUpvote(d)
      .then( comment =>
        dispatch({
          type: UPVOTE_COMMENT,
          comment
        })
      )
      .catch( () =>
        alert('Error upvoting comment!')
      )
  }
}

export const downvoteComment = d => {
  return dispatch => {
    commentDownvote(d)
      .then( comment =>
        dispatch({
          type: DOWNVOTE_COMMENT,
          comment
        })
      )
      .catch( () =>
        alert('Error downvoting comment!')
      )
  }
}

export const removeComment = d => {
  return dispatch => {
    deleteComment(d)
      .then( comment =>
        dispatch({
          type: REMOVE_COMMENT,
          comment
        })
      )
      .catch( () =>
        alert('Error removing comment!')
      )
  }
}