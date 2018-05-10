import { fetchPosts } from '../../utils/ReadableAPI'
import { deletePost } from '../../utils/ReadableAPI'

export const GET_POSTS = 'GET_POSTS'
// export const ADD_POST = 'ADD_POST'
// export const EDIT_POST = 'EDIT_POST'
export const REMOVE_POST = 'REMOVE_POST'
// export const UPVOTE_POST = 'UPVOTE_POST'
// export const DOWNVOTE_POST = 'DOWNVOTE_POST'

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

// export const addPost = (id, timestamp, title, body, author, category, deleted) => ({
// 	type: ADD_POST,
// 	id,
// 	timestamp,
// 	title,
// 	body,
// 	author,
// 	category,
// 	deleted
// })

// export const editPost = (id, timestamp, title, body, author, category, deleted) => ({
// 	type: EDIT_POST,
// 	id,
// 	timestamp,
// 	title,
// 	body,
// 	author,
// 	category,
// 	deleted
// })

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

// export const upvotePost = (id, voteScore) => ({
// 	type: UPVOTE_POST,
// 	id,
// 	voteScore
// })

// export const downvotePost = (id, voteScore) => ({
// 	type: DOWNVOTE_POST,
// 	id,
// 	voteScore
// })
