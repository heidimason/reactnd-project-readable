import { fetchCategories } from '../../utils/ReadableAPI'

export const GET_CATEGORIES = 'GET_CATEGORIES'

export const getCategories = () =>
  dispatch =>
  	fetchCategories()
      .then( categories =>
    		dispatch({
    			type: GET_CATEGORIES,
    			categories
    		})
      )
      .catch( () =>
        alert('Error getting categories!')
      )
