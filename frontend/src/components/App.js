import React, { Component } from 'react'
import '../css/App.css'
import { Switch, Route } from 'react-router-dom'
import * as ReadableAPI from '../utils/ReadableAPI'
import {
    blueGrey900, blueGrey700,
    cyanA400,
    grey100
} from 'material-ui/styles/colors'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
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
    state = {
        categories: [],
        posts: []
    }

    // Get all categories and populate categories array
    getAllCategories() {
        ReadableAPI.fetchCategories().then( categories =>
            this.setState({ categories })
        ).catch( () =>
            alert('Error getting categories!')
        )
    }

    // Get all posts and populate posts array
    getAllPosts() {
        ReadableAPI.fetchPosts().then( posts =>
            this.setState({ posts })
        ).catch( () =>
            alert('Error getting posts!')
        )
    }

    // Get all categories and posts immediately after component is inserted into DOM
    componentDidMount() {
        this.getAllCategories()
        this.getAllPosts()
    }

    render() {
        const { categories, posts } = this.state

        return (
            <MuiThemeProvider
                muiTheme={customMuiTheme}>
				<Switch>
                    <Route exact path="/" render={ () => (
                        <ReadableBar
                            categories={categories}
                            posts={posts}
                        />
                    )}/>

                    <Route path="/:categories" render={ () => (
                        <ReadableBar
                            categories={categories}
                            posts={posts}
                        />
                    )}/>

                    <Route path="/:posts" render={ () => (
                        <ReadableBar
                            categories={categories}
                            posts={posts}
                        />
                    )}/>

                    <Route component={PageNotFound} />
                </Switch>
            </MuiThemeProvider>
        )
    }
}

export default ReadableApp
