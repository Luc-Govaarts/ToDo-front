import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import { ThemeProvider } from '@material-ui/core'
import { createMuiTheme } from '@material-ui/core/styles'
import { lightBlue, teal } from '@material-ui/core/colors'
import store from './Store'

const theme = createMuiTheme({
	spacing: 8,
	palette: {
		primary: {
			main: lightBlue[100],
		},
		secondary: {
			main: teal[100],
		},
	},
})

ReactDOM.render(
	<React.StrictMode>
		<Router>
			<Provider store={store}>
				<ThemeProvider theme={theme}>
					<App />
				</ThemeProvider>
			</Provider>
		</Router>
	</React.StrictMode>,
	document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
