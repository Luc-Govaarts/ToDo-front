import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { AppBar, Toolbar, Box, IconButton } from '@material-ui/core'
import { selectToken } from '../../Store/user/selectors'
import { useSelector } from 'react-redux'
import LoggedIn from './LoggedIn'
import LoggedOut from './LoggedOut'

const useStyles = makeStyles((theme) => ({
	Toolbar: {
		width: '100%',
		position: 'fixed',
		backgroundColor: theme.palette.primary.main,
	},
	icon: {
		margin: theme.spacing('auto', 1),
	},
}))

export default function MyAppBar() {
	const classes = useStyles()
	const token = useSelector(selectToken)
	const loginLogoutControls = token ? <LoggedIn /> : <LoggedOut />

	return (
		<AppBar>
			<Toolbar className={classes.Toolbar}>
				{loginLogoutControls}
				<Box>
				</Box>
			</Toolbar>
		</AppBar>
	)
}
