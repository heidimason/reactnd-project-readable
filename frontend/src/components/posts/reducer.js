import { GET_POSTS } from './actions'
import { REMOVE_POST } from './actions'

function posts(state = [], action) {
  switch (action.type) {
    	case GET_POSTS:
        	return action.posts
      	case REMOVE_POST:
      		return state.filter(post => post.id !== action.post.id)
      	default:
        	return state
    }
}

export default posts