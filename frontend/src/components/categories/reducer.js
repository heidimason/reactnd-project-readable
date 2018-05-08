import { GET_CATEGORIES } from './actions'
import { combineReducers } from 'redux'

function categories(state = [], action) {
	switch (action.type) {
    	case GET_CATEGORIES:
      		return action.categories
    	default:
      		return state
  	}
}

export default combineReducers({
	categories
})