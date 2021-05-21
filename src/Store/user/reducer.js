import {
	LOG_OUT,
	LOGIN_SUCCESS,
	TOKEN_STILL_VALID,
	VERIFY_SUCCESS,
	NEW_CODE_SEND
} from './actions'

const initialState = {
	token: localStorage.getItem('token'),
	name: null,
	email: null,
	id: null,
	verified: null,
	retriesLeft: null
}

export default (state = initialState, action) => {
	switch (action.type) {
		case LOGIN_SUCCESS:
			localStorage.setItem('token', action.payload.token)
			return { ...state, ...action.payload }

		case LOG_OUT:
			localStorage.removeItem('token')
			return { ...initialState, token: null }

		case TOKEN_STILL_VALID:
			return { ...state, ...action.payload }

		case VERIFY_SUCCESS: 
			return { ...state, verified: true }
		
		case NEW_CODE_SEND:
			return { ...state, ...action.payload }
		default:
			return state
	}
}
