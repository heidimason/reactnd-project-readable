require('dotenv').config()

const api = 'http://localhost:3001' || process.env.REACT_APP_API_URL

// Generate a unique token for storing your data on the backend server.
let token = localStorage.token
if (!token)
	token = localStorage.token = Math.random().toString(36).substr(-8)

const headers = {
	'Accept': 'application/json',
	'Authorization': token
}

export const fetchCategories = () =>
	fetch(`${api}/categories`, { headers })
    .then(response => response.json())
    .then(data => data.categories)

export const fetchPosts = () =>
	fetch(`${api}/posts`, { headers })
    .then(response => response.json())

export const createPost = data =>
  fetch(`${api}/posts`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }).then(response => response.json())

export const revisePost = data =>
  fetch(`${api}/posts/${data.id}`, {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      title: data.title,
      body: data.body
    })
  }).then(response => response.json())

export const postUpvote = data =>
	fetch(`${api}/posts/${data.id}`, {
  	method: 'POST',
  	headers: {
    		...headers,
    		'Content-Type': 'application/json'
  	},
    body: JSON.stringify({
      option: 'upVote'
    })
	}).then(response => response.json())

export const postDownvote = data =>
	fetch(`${api}/posts/${data.id}`, {
  	method: 'POST',
  	headers: {
    		...headers,
    		'Content-Type': 'application/json'
  	},
    body: JSON.stringify({
      option: 'downVote'
    })
	}).then(response => response.json())

export const deletePost = data =>
	fetch(`${api}/posts/${data.id}`, {
    method: 'DELETE',
    headers
  }).then(response => response.json())

export const fetchComments = data =>
  fetch(`${api}/posts/${data}/comments`, { headers })
    .then(response => response.json())

export const createComment = data =>
  fetch(`${api}/comments`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }).then(response => response.json())

export const reviseComment = data =>
  fetch(`${api}/comments/${data.id}`, {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      title: data.title,
      body: data.body
    })
  }).then(response => response.json())

export const commentUpvote = data =>
  fetch(`${api}/comments/${data.id}`, {
    method: 'POST',
    headers: {
        ...headers,
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      option: 'upVote'
    })
  }).then(response => response.json())

export const commentDownvote = data =>
  fetch(`${api}/comments/${data.id}`, {
    method: 'POST',
    headers: {
        ...headers,
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      option: 'downVote'
    })
  }).then(response => response.json())

export const deleteComment = data =>
  fetch(`${api}/comments/${data.id}`, {
    method: 'DELETE',
    headers
  }).then(response => response.json())