import React, { useEffect } from 'react'
import { Switch, Route } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { getUserWithStoredToken } from './Store/user/actions'
import Homepage from './Pages/Homepage'
import Login from './Pages/Login'
import Signup from './Pages/Signup'
import AppBar from './Components/Navigation/AppBar'
import SnackBar from './Components/Snackbar'
import VerifyMail from './Pages/VerifyMail'

function App() {
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(getUserWithStoredToken())
	}, [dispatch])

	return (
		<div className='App'>
			<AppBar />
			<SnackBar />
			<Switch>
				<Route path='/verify' component={VerifyMail} />
				<Route path='/login' component={Login} />
				<Route path='/signup' component={Signup} />
				<Route path='/' component={Homepage} />
			</Switch>
		</div>
	)
}

export default App
