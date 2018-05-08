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

// export const removePost = (post) =>
// 	fetch(`${api}/posts/${post.id}`, { method: 'DELETE', headers })
//     	.then(res => res.json())
//     	.then(data => data.post)

// export const createPost = (body) =>
// 	fetch(`${api}/posts`, {
//     	method: 'POST',
//     	headers: {
//       		...headers,
//       		'Content-Type': 'application/json'
//     	},
//     	body: JSON.stringify(body)
//   	}).then(res => res.json())
