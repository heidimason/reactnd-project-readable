import React from 'react'
import AppBar from 'material-ui/AppBar'
import IconButton from 'material-ui/IconButton'
import ActionHome from 'material-ui/svg-icons/action/home'
import ListTabs from '../tab'

const ReadableBar = () => (
    <AppBar
        title="Readable"
        iconElementLeft={
        	<IconButton>
        		<ActionHome />
        	</IconButton>
        }
        children={
        	<ListTabs />
        }
    />
)

export default ReadableBar