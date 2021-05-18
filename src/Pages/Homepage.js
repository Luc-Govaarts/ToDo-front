import React from 'react'
import { useHistory } from 'react-router-dom'
import { selectToken } from '../Store/user/selectors'
import { useSelector } from 'react-redux'

export default function Login() {
    const token = useSelector(selectToken)
	const history = useHistory()
    console.log("token: ", token)

    if (!token) {
		history.push('/login')
	}
    
    return (
        <div>
            <p>"this is the homepage!!"</p>
        </div>
    )
}
