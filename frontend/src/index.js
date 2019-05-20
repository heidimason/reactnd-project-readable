import React from 'react'
import ReactDOM from 'react-dom'
import './css/index.css'
import App from './components/App'
import { BrowserRouter } from 'react-router-dom'
import store from './store'
import { Provider } from 'react-redux'

ReactDOM.render(
	<Provider store={store}>
		<BrowserRouter basename="/reactnd-project-readable">
			<App />
		</BrowserRouter>
	</Provider>, document.getElementById('root')
)
