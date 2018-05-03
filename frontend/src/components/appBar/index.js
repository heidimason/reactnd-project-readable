import React from 'react'
import AppBar from 'material-ui/AppBar'
import IconButton from 'material-ui/IconButton'
import ActionHome from 'material-ui/svg-icons/action/home'
import ListCategories from '../Categories'

function ReadableBar (props) {
    const { categories, posts } = props

    return (
        <AppBar
            title="Readable"
            iconElementLeft={
            	<IconButton>
            		<ActionHome />
            	</IconButton>
            }
            children={
            	<ListCategories
                    categories={categories}
                    posts={posts}
                />
            }
        />
    )
}

export default ReadableBar