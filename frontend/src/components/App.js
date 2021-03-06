import React from 'react'
import '../css/App.css'
import '../css/icons.css'
import {
    blueGrey900, blueGrey700,
    cyanA400,
    grey100
} from 'material-ui/styles/colors'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import { Switch, Route, Redirect } from 'react-router-dom'
import ReadableBar from './AppBar'
import PostDetails from './Posts/details'
import NotFound from './NotFound'

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

const ReadableApp = () => (
    <MuiThemeProvider
        muiTheme={customMuiTheme}>
		<Switch>
            <Route exact path="/" render={() => (
                <Redirect to="/all" />
            )}/>
            <Route exact path="/not-found" component={NotFound} />
            <Route exact path="/:category" component={ReadableBar} />
            <Route exact path="/:category/:post_id" component={PostDetails} />
            <Route component={NotFound} />
        </Switch>
    </MuiThemeProvider>
)

export default ReadableApp
