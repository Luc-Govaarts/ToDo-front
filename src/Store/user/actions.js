import { apiUrl } from '../../Config/constants'
import axios from 'axios'
import { selectToken } from './selectors'
import {
	appLoading,
	appDoneLoading,
	showMessageWithTimeout,
	setMessage,
} from '../appState/actions'

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const TOKEN_STILL_VALID = 'TOKEN_STILL_VALID'
export const LOG_OUT = 'LOG_OUT'
export const VERIFY_SUCCESS = 'VERIFY_SUCCES'
export const NEW_CODE_SEND = 'NEW_CODE_SEND'

const loginSuccess = (userWithToken) => {
	return {
		type: LOGIN_SUCCESS,
		payload: userWithToken,
	}
}

const verifySuccess = () => ({ type: VERIFY_SUCCESS })

const newCodeSend = (user) => ({ type: NEW_CODE_SEND, payload: user })

const tokenStillValid = (userWithoutToken) => {
	return {
		type: TOKEN_STILL_VALID,
		payload: userWithoutToken,
	}
}

export const logOut = () => ({ type: LOG_OUT })

export const signUp = (name, email, password, code) => {
	return async (dispatch) => {
		dispatch(appLoading())
		try {
			const response = await axios.post(`${apiUrl}/signup`, {
				name,
				email,
				password,
				code,
			})

			dispatch(loginSuccess(response.data))
			dispatch(showMessageWithTimeout('success', true, 'Account aangemaakt'))
			dispatch(appDoneLoading())
		} catch (error) {
			if (error.response) {
				console.log(error.response.data.message)
				dispatch(setMessage('warning', true, error.response.data.message))
			} else {
				console.log(error.message)
				dispatch(setMessage('warning', true, error.message))
			}
			dispatch(appDoneLoading())
		}
	}
}

export const login = (email, password) => {
	return async (dispatch) => {
		dispatch(appLoading())
		try {
			const response = await axios.post(`${apiUrl}/login`, {
				email,
				password,
			})

			dispatch(loginSuccess(response.data))
			dispatch(showMessageWithTimeout('success', false, 'Welcome back', 1500))
			dispatch(appDoneLoading())
		} catch (error) {
			if (error.response) {
				console.log(error.response.data.message)
				dispatch(setMessage('warning', true, error.response.data.message))
			} else {
				console.log(error.message)
				dispatch(setMessage('warning', true, error.message))
			}
			dispatch(appDoneLoading())
		}
	}
}

export const verify = (code, id) => {
	return async (dispatch) => {
		dispatch(appLoading())

		try {
			await axios.patch(`${apiUrl}/verify`, { code, id })

			dispatch(verifySuccess())
			dispatch(
				showMessageWithTimeout(
					'success',
					false,
					'Your account is now verified!',
					1500
				)
			)
			dispatch(appDoneLoading())
		} catch (error) {
			if (error.response) {
				console.log(error.response.data.message)
				dispatch(setMessage('warning', true, error.response.data.message))
			} else {
				console.log(error.message)
				dispatch(setMessage('warning', true, error.message))
			}
			dispatch(appDoneLoading())
		}
	}
}

export const newCode = (id, retriesLeft) => {
	return async (dispatch) => {
		dispatch(appLoading())

		try {
			const response = await axios.patch(`${apiUrl}/sendNewCode`, {
				id,
				retriesLeft,
			})

			dispatch(newCodeSend(response.data.user))
			dispatch(
				showMessageWithTimeout(
					'success',
					false,
					response.data.message,
					1500
				)
			)
			dispatch(appDoneLoading())
		} catch (error) {
			if (error.response) {
				console.log(error.response.data.message)
				dispatch(setMessage('warning', true, error.response.data.message))
			} else {
				console.log(error.message)
				dispatch(setMessage('warning', true, error.message))
			}
			dispatch(appDoneLoading())
		}
	}
}

export const getUserWithStoredToken = () => {
	return async (dispatch, getState) => {
		// get token from the state
		const token = selectToken(getState())

		// if we have no token, stop
		if (token === null) return

		dispatch(appLoading())
		try {
			// if we do have a token,
			// check wether it is still valid or if it is expired
			const response = await axios.get(`${apiUrl}/me`, {
				headers: { Authorization: `Bearer ${token}` },
			})

			// token is still valid
			dispatch(tokenStillValid(response.data))
			dispatch(appDoneLoading())
		} catch (error) {
			if (error.response) {
				console.log(error.response.message)
			} else {
				console.log(error)
			}
			// if we get a 4xx or 5xx response,
			// get rid of the token by logging out
			dispatch(logOut())
			dispatch(appDoneLoading())
		}
	}
}
