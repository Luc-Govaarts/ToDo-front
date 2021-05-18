import React, { useEffect } from "react";
import { Switch, Route } from 'react-router-dom'
import { useDispatch } from "react-redux";
import { getUserWithStoredToken } from "./Store/user/actions";
import Homepage from './Pages/Homepage'
import Login from './Pages/Login'
import Signup from './Pages/Signup'

function App() {
	const dispatch = useDispatch();

	useEffect(() => {
	  dispatch(getUserWithStoredToken());
	}, [dispatch]);
  
	return (
		<div className='App'>
			<Switch>
				<Route path='/login' component={Login} />
				<Route path='/signup' component={Signup} />
				<Route path='/' component={Homepage} />
			</Switch>
		</div>
	)
}

export default App
