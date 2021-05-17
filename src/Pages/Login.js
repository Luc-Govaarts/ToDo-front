import React, { useState } from 'react'

export default function Login() {
	const [username, setUsername] = useState('')
	const [password, set_password] = useState('')

	return (
		<div>
			<div>
				<p>this is the login Page!!</p>
			</div>
            <div>
                <form>
                    <p>
                        Login form
                    </p>
                </form>
            </div>
		</div>
	)
}
