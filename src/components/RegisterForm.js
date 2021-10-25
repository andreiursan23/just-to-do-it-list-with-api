import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import TextField from '@mui/material/TextField';
import Slide from '@mui/material/Slide';

import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../store/register/register-actions';
import { registerActions } from '../store/register/register-slice';

import { useEffect, useState } from 'react';

import SnackBar from './SnackBar';


// Transition needed for Snackbar
function TransitionDown(props) {
    return <Slide {...props} direction="down" />;
}

const RegisterForm = () => {
    // Set initial states for Register Form Inputs to be sent to registerUser in register-actions
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [age, setAge] = useState(0);

    // Set initial states for Register Form inputs Validation:
    const [validFullName, setValidFullName] = useState(true);
    const [validEmail, setValidEmail] = useState(false);
    const [validPassword, setValidPassword] = useState(false);
    const [validAge, setValidAge] = useState(false);
    const [validAllInputs, setValidAllInputs] = useState(true);

    // SnackBar helper states and variables
    const [open, setOpen] = useState(false);
    const [transition, setTransition] = useState(undefined);
    const isSnackBar = useSelector(state => state.register.isSnackBar);
    const snackBarError = useSelector(state => state.register.snackBarError);
    const isSnackBarError = useSelector(state => state.register.isSnackBarError);

    // Redux helper states
    const dispatch = useDispatch();

    // Validate if form inputs are not empty
    useEffect(() => {
        setValidFullName(validateInputs(fullName, ''));
        setValidEmail(validateInputs(email, ''));
        setValidPassword(validateInputs(password, ''));
        setValidAge(validateInputs(age, 0));
        
    }, [fullName, email, password, age]);

    // Enable sign up button when all input are not empty
    useEffect(() => {
        setValidAllInputs(() => {
            if (!validFullName && !validEmail && !validPassword && !validAge) {
                return false;
            } else {
                return true;
            } 
        });
    }, [validFullName, validEmail, validPassword, validAge]);

    // Helper function for inputs validation
    const validateInputs = (paramToCheck, check) => {
        if (paramToCheck !== check) {
            return false;
        } else {
            return true;
        }
    }

    // Register New user function
    const registerNewUser = Transition => {
        setTransition(() => Transition);

        dispatch(registerUser(fullName, email, password, age));

        setOpen(true);

        dispatch(registerActions.isSnackBar(false));
    }

    return (
        <Container maxWidth="sm" className="main-container">
            <Box sx={{ 
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center'
            }} className="home-container">
                <Typography variant="h3" component="h2" gutterBottom align="center" className="register-title">
                    Register your acount
                </Typography>
                <form
                    noValidate 
                    autoComplete="off"
                    className="register-form login-and-register-form"
                >
                    <TextField
                        onChange={e => setFullName(e.target.value)}
                        error={validFullName}
                        className='form-input'
                        label="Full name"
                        helperText="Please enter your complete name"
                        variant="outlined"
                        color="success"
                        fullWidth
                        required
                    />
                    <TextField
                        onChange={e => setEmail(e.target.value)}
                        error={validEmail}
                        className='form-input'
                        label="Email"
                        type="email"
                        helperText="Please enter your email address"
                        variant="outlined"
                        color="success"
                        fullWidth
                        required
                    />
                    <TextField 
                        onChange={e => setPassword(e.target.value)}
                        error={validPassword}
                        className='form-input'
                        label="Password"
                        type="password"
                        helperText="Please enter your password"
                        variant="outlined"
                        color="success"
                        fullWidth
                        required
                    />
                    <TextField
                        onChange={e => setAge(Number(e.target.value))}
                        error={validAge}
                        className='form-input' 
                        label="Age"
                        type="number"
                        helperText="Please enter your age"
                        variant="outlined"
                        color="success"
                        fullWidth
                        required
                    />
                    <Button
                        onClick={() => registerNewUser(TransitionDown)}
                        disabled={validAllInputs}
                        variant="contained" 
                        size="large"
                        startIcon={<AccountCircleOutlinedIcon fontSize="large" />}
                        className="sign-up-btn"
                        >
                        Sign up
                    </Button>
                </form>

                {isSnackBar && 
                    <SnackBar 
                        type={isSnackBarError ? 'error' : 'success'} 
                        message={isSnackBarError ? snackBarError : 'Account succesfully created! Click anywhere to continue.'}
                        open={open}
                        setOpen={setOpen} 
                        transition={transition}
                        key={transition ? transition.name : ''} 
                    />
                }
            </Box>
        </Container>
    );
}

export default RegisterForm;