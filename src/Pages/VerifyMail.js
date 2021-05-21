import React, { useState } from 'react'
import {
	Box,
	Button,
	Container,
	Avatar,
	TextField,
	Typography,
} from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import { makeStyles } from '@material-ui/core/styles'
import { selectUser } from '../Store/user/selectors'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { verify, newCode } from '../Store/user/actions'

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
	const [code, setCode] = useState('')
	const [verifyCounter, setVerifyCounter] = useState(3)
	const user = useSelector(selectUser)
	const history = useHistory()
	const dispatch = useDispatch()

	if (user.token && user.verified) {
		history.push('/')
	}
	if (!user.token) {
		history.push('/login')
	}

	function submitForm(event) {
		event.preventDefault()

		dispatch(verify(code, user.id))

		setCode('')
	}

	function sendNewCode(event) {
		event.preventDefault()
		setVerifyCounter(verifyCounter - 1)
		dispatch(newCode(user.id, verifyCounter))
	}

	return (
		<Box mt={12}>
			<Container component='main' maxWidth='xs'>
				<div className={classes.paper}>
					<Avatar className={classes.avatar}>
						<LockOutlinedIcon />
					</Avatar>
					<Typography component='h1' variant='h5'>
						Verify your credentials
					</Typography>
					<Box mt={3}>
						<Typography component='p' variant='body1'>
							An email with a verification code was send to your inbox. Please
							enter the code below to verify your email address.
						</Typography>
						<form className={classes.form} noValidate>
							<TextField
								value={code}
								onChange={(event) => setCode(event.target.value)}
								variant='outlined'
								margin='normal'
								required
								fullWidth
								name='code'
								label='Verification Code'
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
								Submit
							</Button>
							{verifyCounter === 0 ? (
								<Typography component='p' variant='body2'>
									The last new code was send to your email. Use this code to
									verify your account. If the account is not verified it will be
									deleted in three days.
								</Typography>
							) : (
								<Box>
									<Typography component='p' variant='body2'>
										Can't find the email? Or is the code not working? Click the
										button below to send a new mail. Retries left: {verifyCounter}
									</Typography>
									<Button
										onClick={sendNewCode}
										type='button'
										fullWidth
										variant='contained'
										color='alternative'
										className={classes.submit}>
										Send new verification Code
									</Button>
								</Box>
							)}
						</form>
					</Box>
				</div>
			</Container>
		</Box>
	)
}
