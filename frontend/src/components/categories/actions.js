import { fetchCategories } from '../../utils/ReadableAPI'

export const GET_CATEGORIES = 'GET_CATEGORIES'

// Get all categories and populate categories array
export const getCategories = () => {
    return dispatch => {
    	fetchCategories().then( categories =>
    		dispatch({
    			type: GET_CATEGORIES,
    			categories
    		})
      	)
      	.catch( () =>
        	alert('Error getting categories!')
    	)
  	}
}