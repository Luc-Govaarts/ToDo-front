import React, { useState } from 'react'
import {
	Link,
	Box,
	Button,
	Container,
	Avatar,
	TextField,
	Typography,
} from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import { makeStyles } from '@material-ui/core/styles'
import { selectToken } from '../Store/user/selectors'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { signUp } from '../Store/user/actions'

const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(8),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: '100%',
		marginTop: theme.spacing(1),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
}))

export default function SignUp() {
	const classes = useStyles()
	const [name, set_name] = useState('')
	const [email, set_email] = useState('')
	const [password, set_password] = useState('')
	const [code, set_code] = useState('')
	const token = useSelector(selectToken)
	const history = useHistory()
	const dispatch = useDispatch()

	if (token) {
		history.push('/')
	}

	function submitForm(event) {
		event.preventDefault()

		dispatch(signUp(name, email, password, code))

		set_email('')
		set_password('')
		set_name('')
		set_code('')
	}

	return (
		<Box mt={12}>
			<Container component='main' maxWidth='xs'>
				<div className={classes.paper}>
					<Avatar className={classes.avatar}>
						<LockOutlinedIcon />
					</Avatar>
					<Typography component='h1' variant='h5'>
						Sign up
					</Typography>
					<form className={classes.form} noValidate>
						<TextField
							onChange={(event) => set_name(event.target.value)}
							value={name}
							variant='outlined'
							margin='normal'
							required
							fullWidth
							id='name'
							label='Name'
							name='name'
							autoComplete='Name'
							autoFocus
						/>
						<TextField
							onChange={(event) => set_email(event.target.value)}
							value={email}
							variant='outlined'
							margin='normal'
							required
							fullWidth
							id='email'
							label='Email'
							name='email'
							autoComplete='email'
							autoFocus
						/>
						<TextField
							value={password}
							onChange={(event) => set_password(event.target.value)}
							variant='outlined'
							margin='normal'
							required
							fullWidth
							name='password'
							label='Password'
							type='password'
							id='password'
							autoComplete='current-password'
						/>
						<TextField
							value={code}
							onChange={(event) => set_code(event.target.value)}
							variant='outlined'
							margin='normal'
							required
							fullWidth
							name='code'
							label='code'
							type='password'
							id='code'
						/>
						<Button
							onClick={submitForm}
							type='submit'
							fullWidth
							variant='contained'
							color='primary'
							className={classes.submit}>
							Sign up now
						</Button>
						<Link href='/login' variant='body2'>
							{'Already have an account? Log in here!'}
						</Link>
					</form>
				</div>
			</Container>
		</Box>
	)
}
