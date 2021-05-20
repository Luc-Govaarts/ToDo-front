import React from 'react'
import { useHistory } from 'react-router-dom'
import { selectToken, selectUser } from '../Store/user/selectors'
import { useSelector } from 'react-redux'

export default function Login() {
    const token = useSelector(selectToken)
    const user = useSelector(selectUser)
	const history = useHistory()

    if (!token) {
		history.push('/login')
    } else if (token && !user.verified) {
        history.push('/verify')
    }
    
    return (
        <div>
            <p>"this is the homepage!!"</p>
        </div>
    )
}
