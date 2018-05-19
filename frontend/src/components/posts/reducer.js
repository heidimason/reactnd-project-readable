import {
    GET_POSTS,
    ADD_POST,
    EDIT_POST,
    UPVOTE_POST,
    DOWNVOTE_POST,
    REMOVE_POST
} from './actions'

function posts(state = [], action) {
    switch (action.type) {
        case GET_POSTS:
            return action.posts
        case ADD_POST:
            return [
                ...state,
                action.post
            ]
        case EDIT_POST:
            return state.map(post => {
                if (post.id === action.post.id) {
                  post = action.post
                }

                return post
              })
            // return [state.filter(post => post.id !== action.data.id), action.data]
        case UPVOTE_POST:
            return state.map(post => {
                if (post.id === action.post.id) {
                    post.voteScore++
                }

                return post
            })
        case DOWNVOTE_POST:
            return state.map(post => {
                if (post.id === action.post.id) {
                    post.voteScore--
                }

                return post
            })
        case REMOVE_POST:
  		    return state.filter(post => post.id !== action.post.id)
        default:
            return state
    }
}

export default posts