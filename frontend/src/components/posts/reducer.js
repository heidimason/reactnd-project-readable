import { GET_POSTS } from './actions'
import { UPVOTE_POST } from './actions'
import { DOWNVOTE_POST } from './actions'
import { REMOVE_POST } from './actions'

function posts(state = [], action) {
    switch (action.type) {
        case GET_POSTS:
    	   return action.posts
        case UPVOTE_POST:
            return state.map(post => {
                if (post.id === action.post.id) {
                    post.voteScore++
                    return post
                } else {
                    return post
                }
            })
        case DOWNVOTE_POST:
            return state.map(post => {
                if (post.id === action.post.id) {
                    post.voteScore--
                    return post
                } else {
                    return post
                }
            })
        case REMOVE_POST:
  		    return state.filter(post => post.id !== action.post.id)
        default:
            return state
    }
}

export default posts