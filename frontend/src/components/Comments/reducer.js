import {
    GET_COMMENTS,
    ADD_COMMENT,
    EDIT_COMMENT,
    UPVOTE_COMMENT,
    DOWNVOTE_COMMENT,
    REMOVE_COMMENT
} from './actions'

function comments(state = [], action) {
    switch (action.type) {
        case GET_COMMENTS:
            return action.comments
        case ADD_COMMENT:
            return [
                ...state,
                action.comment
            ]
        case EDIT_COMMENT:
            return state.map(comment => {
                if (comment.id === action.comment.id) {
                  comment = action.comment
                }

                return comment
            })
        case UPVOTE_COMMENT:
            return state.map(comment => {
                if (comment.id === action.comment.id) {
                    comment.voteScore++
                }

                return comment
            })
        case DOWNVOTE_COMMENT:
            return state.map(comment => {
                if (comment.id === action.comment.id) {
                    comment.voteScore--
                }

                return comment
            })
        case REMOVE_COMMENT:
            return state.filter(comment => comment.id !== action.comment.id)
        default:
            return state
    }
}

export default comments