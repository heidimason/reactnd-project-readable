import { createStore, compose, applyMiddleware } from 'redux'
import { combineReducers } from 'redux'
import CategoriesReducer from '../components/Categories/reducer'
import PostsReducer from '../components/Posts/reducer'
import thunk from 'redux-thunk'

const logger = store => next => action => {
	// console.group(action.type)
	// console.info('dispatching', action)
	let result = next(action)
	// console.log('next state', store.getState())
	// console.groupEnd(action.type)
	return result
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const rootReducer = combineReducers({
	categories: CategoriesReducer,
	posts: PostsReducer
})

const store = createStore(
	rootReducer,
	composeEnhancers(
		applyMiddleware(thunk, logger)
	)
)

export default store