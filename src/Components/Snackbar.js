import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectMessage } from '../Store/appState/selectors'
import Snackbar from '@material-ui/core/Snackbar';
import { Button } from '@material-ui/core'
import { clearMessage } from '../Store/appState/actions';
import { Alert } from '@material-ui/lab';

export default function SnackBar() {
    const message = useSelector(selectMessage);
    const dispatch = useDispatch();

    if (!message) {
        return null
    } else {
        const action = (
            <Button 
                size="small"
                color="inherit" 
                onClick={message.dismissable ? () => dispatch(clearMessage()) : null}
            >
                Close
            </Button>
        )
    
        return (
                <div>
                    <Snackbar
                        anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'center'
                            }}
                        open={true}
                        autoHideDuration={500}
                    >
                        <Alert severity={message.variant}>{message.text} {action}</Alert>
                    </Snackbar>  
                </div>
            )
        }
    }
    