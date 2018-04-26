import React from 'react'
import { Link } from 'react-router-dom'

const styles = {
	layout: {
		paddingRight: 30,
  		paddingLeft: 30,
  		textAlign: 'center'
	}
}

function PageNotFound (props) {
	return (
		<div style={styles.layout}>
			<h1>Looks like you took a wrong turn!</h1>

			<Link to="/">Take me home!</Link>
		</div>
	)
}

export default PageNotFound