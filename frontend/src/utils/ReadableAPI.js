const api = "http://localhost:3001"


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
    .then(res => res.json())
    .then(data => data.categories)

export const fetchPosts = () =>
	fetch(`${api}/posts`, { headers })
    .then(res => res.json())

// export const createPost = post =>
//   fetch(`${api}/posts/${post.id}`, { headers })
//     .then(res => res.json())

export const createPost = data =>
  fetch(`${api}/posts`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }).then(res => res.json())

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
  }).then(res => res.json())

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
	}).then(res => res.json())

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
	}).then(res => res.json())

export const deletePost = data =>
	fetch(`${api}/posts/${data.id}`, {
    method: 'DELETE',
    headers
  }).then(res => res.json())

