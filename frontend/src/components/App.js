import React, { Component } from 'react'
import '../css/App.css'
import { Switch, Route } from 'react-router-dom'
import * as ReadableAPI from '../utils/ReadableAPI'
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import ReadableBar from './appBar'
import ListPosts from './posts'
import PageNotFound from './PageNotFound'

class ReadableApp extends Component {
    state = {
        categories: []
    }

    // Get all categories and populate categories array
    getAllCategories() {
        ReadableAPI.fetchCategories().then( categories =>
            this.setState({ categories })
        ).catch( () =>
            alert('Error getting categories!')
        )
    }

    // Get all categories immediately after component is inserted into DOM
    componentDidMount() {
        this.getAllCategories()
    }

    render() {
        const { categories } = this.state

        return (
            <MuiThemeProvider
                muiTheme={getMuiTheme(darkBaseTheme)}
                className="App">
				<Switch>
                    <Route exact path="/" render={ () => (
                        <ReadableBar
                            categories={categories}
                        />
                    )}/>

                    <Route path="/categories" render={ () => (
                        <ReadableBar
                            categories={categories}
                        />
                    )}/>

                    <Route path="/category" render={ () => (
                        <ListPosts />
                    )}/>

                    <Route component={PageNotFound} />
                </Switch>
            </MuiThemeProvider>
        )
    }
}

export default ReadableApp
