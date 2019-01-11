import React from 'react'
import ReactDOM from 'react-dom'
import { StaticRouter } from 'react-router'
import App from './App'

describe('<App />', () => {
	it('renders without crashing', () => {
		const context = {},
				  div = document.createElement('div')

		ReactDOM.render(
			<StaticRouter
				context={context}>
				<App />
			</StaticRouter>, div
		)

		ReactDOM.unmountComponentAtNode(div)
	})

	// For info on <StaticRouter> see: https://reacttraining.com/react-router/web/guides/testing
})
