import { fetchPosts } from '../../utils/ReadableAPI'

export const GET_POSTS = 'GET_POSTS'
// export const ADD_POST = 'ADD_POST'
// export const EDIT_POST = 'EDIT_POST'
// export const REMOVE_POST = 'REMOVE_POST'
// export const UPVOTE_POST = 'UPVOTE_POST'
// export const DOWNVOTE_POST = 'DOWNVOTE_POST'

export const getPosts = () => {
    return dispatch => {
    	fetchPosts().then( posts =>
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

// export const removePost = (id, deleted) => ({
// 	type: REMOVE_POST,
// 	id,
// 	deleted
// })

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
