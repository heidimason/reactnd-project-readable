import React, { Component } from 'react'
import '../css/App.css'
import {
    blueGrey900, blueGrey700,
    cyanA400,
    grey100
} from 'material-ui/styles/colors'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import { Switch, Route } from 'react-router-dom'
import ReadableBar from './AppBar'
import PageNotFound from './PageNotFound'

// This replaces the textColor value on the palette
// and then update the keys for each component that depends on it.
// More on Colors: http://www.material-ui.com/#/customization/colors
const customMuiTheme = getMuiTheme({
  palette: {
    primary1Color: blueGrey900,
    primary2Color: blueGrey700,
    // primary3Color: grey400,
    accent1Color: cyanA400,
    // accent2Color: grey100,
    // accent3Color: grey500,
    textColor: grey100,
    // alternateTextColor: white,
    // canvasColor: white,
    // borderColor: grey300,
    pickerHeaderColor: blueGrey900,
    // shadowColor: fullBlack,
  }
})

class ReadableApp extends Component {
    // // Get all posts and populate posts array
    // getAllPosts() {
    //     ReadableAPI.fetchPosts().then( posts =>
    //         this.setState({ posts })
    //     ).catch( () =>
    //         alert('Error getting posts!')
    //     )
    // }

    // removePost = (post) => {
    //     this.setState((state) => ({
    //         posts: state.posts.filter((p) => p.id !== post.id)
    //     }))

    //     ReadableAPI.remove(post)
    // }

    render() {
        return (
            <MuiThemeProvider
                muiTheme={customMuiTheme}>
				<Switch>
                    <Route path="/" exact component={ReadableBar} />
                    <Route path="/:categories" component={ReadableBar} />
                    <Route path="/:posts" component={ReadableBar} />
                    <Route component={PageNotFound} />
                </Switch>
            </MuiThemeProvider>
        )
    }
}

export default ReadableApp
