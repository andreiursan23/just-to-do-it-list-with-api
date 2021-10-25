import { forwardRef } from 'react';

import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

import { useSelector } from 'react-redux';

import { useHistory } from 'react-router';

const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const SnackBar = ({ type, message, open, setOpen, transition }) => {
    const isSnackBarError = useSelector(state => state.register.isSnackBarError);
    
    // Helper variable to redirect to Login page if new user created
    let history = useHistory();

    const handleClose = (reason) => {
        if (reason === 'clickaway') {
            return;
        }

        // Check to redirect user to login page if account succesfully created
        if (isSnackBarError === false) {
            history.push('/login');
        }
  
        setOpen(false);
    };

    return (
        <Stack spacing={2} sx={{ maxWidth: '100%' }}>
            <Snackbar 
                open={open}
                onClose={() => handleClose()}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                TransitionComponent={transition}
                key={transition ? transition.name : ''}
            >
                <Alert onClose={() => handleClose()} severity={type} sx={{ width: '100%' }}>
                    {message}
                </Alert>
            </Snackbar>
        </Stack>
    );
}

export default SnackBar;