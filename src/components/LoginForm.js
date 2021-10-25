import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Slide from '@mui/material/Slide';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';

import { useState, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../store/login/login-actions';
import { loginActions } from '../store/login/login-slice';

import { Link as LinkRoute } from 'react-router-dom';


import SnackBar from './SnackBar';

// Transition needed for Snackbar
function TransitionDown(props) {
    return <Slide {...props} direction="down" />;
}

const LoginForm = () => {
    // Set initial states for Register Form Inputs to be sent to registerUser in register-actions
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Set initial states for Register Form inputs Validation:
    const [validEmail, setValidEmail] = useState(false);
    const [validPassword, setValidPassword] = useState(false);
    const [validAllInputs, setValidAllInputs] = useState(true);

    // SnackBar helper states and variables
    const [open, setOpen] = useState(false);
    const [transition, setTransition] = useState(undefined);
    const isSnackBar = useSelector(state => state.login.isSnackBar);
    const isSnackBarError = useSelector(state => state.login.isSnackBarError);

    // Redux helper states
    const dispatch = useDispatch();

    // Validate if form inputs are not empty
    useEffect(() => {
        setValidEmail(validateInputs(email, ''));
        setValidPassword(validateInputs(password, ''));
    }, [email, password]);

    // Enable sign up button when all input are not empty
    useEffect(() => {
        setValidAllInputs(() => {
            if (!validEmail && !validPassword) {
                return false;
            } else {
                return true;
            } 
        });
    }, [validEmail, validPassword]);

    // Helper function for inputs validation
    const validateInputs = (paramToCheck, check) => {
        if (paramToCheck !== check) {
            return false;
        } else {
            return true;
        }
    }

    // Log in User function
    const logInUser = Transition => {
        setTransition(() => Transition);

        dispatch(loginUser(email, password));

        setOpen(true);

        dispatch(loginActions.isSnackBar(false));
    }

    return (
        <>
            <Container maxWidth="sm" className="main-container">
                <Box sx={{ 
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center'
                }} className="home-container">
                    <Typography variant="h3" component="h2" gutterBottom align="center" className="register-title">
                        Enter your account
                    </Typography>
                    <form
                        noValidate
                        autoComplete="off"
                        className="register-form login-and-register-form"
                    >
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
                            
                        <Button
                            onClick={() => logInUser(TransitionDown)}
                            variant="contained"
                            disabled={validAllInputs} 
                            size="large"
                            startIcon={<AccountCircleOutlinedIcon fontSize="large" />}
                            className="sign-up-btn"
                        >
                            Log in
                        </Button>                   
                    </form>

                    <section className="login-and-register-form log-in-box">
                        <Typography variant="h6" component="p" gutterBottom align="center" className="login-title">
                            Don't have an account? <LinkRoute to="/register" underline="never" className="register-link">Sign up</LinkRoute>
                        </Typography>
                    </section>

                    {isSnackBar && 
                        <SnackBar 
                            type={isSnackBarError && 'error'} 
                            message={isSnackBarError && 'Email and/or password incorrect, please try again.'}
                            open={open}
                            setOpen={setOpen} 
                            transition={transition}
                            key={transition ? transition.name : ''} 
                        />
                    }
                </Box>
            </Container>
        </>
    );
}

export default LoginForm;