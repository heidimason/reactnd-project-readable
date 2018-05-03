import React from 'react'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentAdd from 'material-ui/svg-icons/content/add'

function AddPostBtn (props) {
 	const { onClick } = props

  	return (
		<FloatingActionButton
	    	className="btn-primary btn-add-post"
	    	onClick={onClick}>
	    	<ContentAdd />
	  	</FloatingActionButton>
  	)
}

export default AddPostBtn