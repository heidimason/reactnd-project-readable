import { fetchPosts } from '../../utils/ReadableAPI'
import { createPost } from '../../utils/ReadableAPI'
import { postUpvote } from '../../utils/ReadableAPI'
import { postDownvote } from '../../utils/ReadableAPI'
import { deletePost } from '../../utils/ReadableAPI'

export const GET_POSTS = 'GET_POSTS'
export const ADD_POST = 'ADD_POST'
export const UPVOTE_POST = 'UPVOTE_POST'
export const DOWNVOTE_POST = 'DOWNVOTE_POST'
// export const EDIT_POST = 'EDIT_POST'
export const REMOVE_POST = 'REMOVE_POST'

export const getPosts = () => {
  return dispatch => {
  	fetchPosts()
      .then( posts =>
    		dispatch({
    			type: GET_POSTS,
    			posts
    		})
      )
    	.catch( () =>
      	alert('Error getting posts!')
  	  )
	}
}

export const addPost = post => {
  return dispatch => {
    createPost(post)
      .then( data =>
        dispatch({
          type: ADD_POST,
          data
        })
      )
      .catch( () =>
        alert('Error adding post!')
      )
  }
}

export const upvotePost = id => {
  return dispatch => {
    postUpvote(id)
      .then( post =>
        dispatch({
          type: UPVOTE_POST,
          post
        })
      )
      .catch( () =>
        alert('Error upvoting post!')
      )
  }
}

export const downvotePost = id => {
  return dispatch => {
    postDownvote(id)
      .then( post =>
        dispatch({
          type: DOWNVOTE_POST,
          post
        })
      )
      .catch( () =>
        alert('Error downvoting post!')
      )
  }
}

export const removePost = id => {
  return dispatch => {
    deletePost(id)
      .then( post =>
        dispatch({
          type: REMOVE_POST,
          post
        })
      )
      .catch( () =>
        alert('Error removing post!')
      )
  }
}
