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
	const [code, set_code] = useState(0)
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

        // dispatch(verifyMail(code))

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
						Verify your credentials
					</Typography>
					<form className={classes.form} noValidate>
						<TextField
							value={code}
							onChange={(event) => set_code(event.target.value)}
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
					</form>
				</div>
			</Container>
		</Box>
	)
}
