import React from 'react'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentAdd from 'material-ui/svg-icons/content/add'

const styles = {
	btnAddPost: {
		position: 'absolute',
		right: '15px',
		bottom: '15px'
	}
}

function AddPostBtn (props) {
 	const { onClick } = props

  	return (
		<FloatingActionButton
	    	className="btn-primary"
	    	style={styles.btnAddPost}
	    	onClick={onClick}>
	    	<ContentAdd />
	  	</FloatingActionButton>
  	)
}

export default AddPostBtn