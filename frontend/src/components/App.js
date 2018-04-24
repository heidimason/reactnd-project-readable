import React, { Component } from 'react'
import '../css/App.css'
import { Switch, Route } from 'react-router-dom'
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import ReadableBar from './appBar'
import ListPosts from './post'
import PageNotFound from './PageNotFound'

class ReadableApp extends Component {
    render() {
        return (
            <MuiThemeProvider
                muiTheme={getMuiTheme(darkBaseTheme)}
                className="App">
				<Switch>
                    <Route exact path="/" render={ () => (
                        <ReadableBar />
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
