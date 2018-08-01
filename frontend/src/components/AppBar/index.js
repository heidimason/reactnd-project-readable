import React from 'react'
import AppBar from 'material-ui/AppBar'
import { Link } from 'react-router-dom'
import IconButton from 'material-ui/IconButton'
import ActionHome from 'material-ui/svg-icons/action/home'
import ListCategories from '../Categories'

function ReadableBar (props) {
    return (window.innerWidth > 767 ?
        <AppBar
            title="Readable"
            iconElementLeft={
                <Link to="/">
                	<IconButton>
                		<ActionHome />
                	</IconButton>
                </Link>
            }
            children={
            	<ListCategories />
            }
        />
        :
        <AppBar
            iconElementLeft={
                <Link to="/">
                    <IconButton>
                        <ActionHome />
                    </IconButton>
                </Link>
            }
            children={
                <ListCategories />
            }
        />
    )
}

export default ReadableBar