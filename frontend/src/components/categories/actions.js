import { fetchCategories } from '../../utils/ReadableAPI'

export const GET_CATEGORIES = 'GET_CATEGORIES'

export const getCategoriesAction = categories => {
	return {
		type: GET_CATEGORIES,
		categories
	}
}

// Get all categories and populate categories array
export const getCategories = categories => {
	return dispatch =>
    	fetchCategories().then( res =>
    		dispatch( getCategoriesAction(res) ) )
    	.catch( () =>
            alert('Error getting categories!')
        )
}