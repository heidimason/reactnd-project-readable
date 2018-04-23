import React, { Component } from 'react'
import '../css/App.css'
import { Switch, Route } from 'react-router-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import ListMessages from './ListMessages'
import PageNotFound from './PageNotFound'

class ReadableApp extends Component {
    render() {
        return (
            <MuiThemeProvider className="App">
				<Switch>
                    <Route exact path="/" render={ () => (
                        <h1>Home Page</h1>
                    )}/>

                    <Route path="/category" render={ () => (
                        <ListMessages />
                    )}/>

                    <Route component={PageNotFound}/>
                </Switch>
            </MuiThemeProvider>
        )
    }
}

export default ReadableApp
