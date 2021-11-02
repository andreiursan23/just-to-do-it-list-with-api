import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Slide from '@mui/material/Slide';
import CircularProgress from '@mui/material/CircularProgress';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import FormGroup from '@mui/material/FormGroup';

import { useState, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../store/login/login-actions';
import { loginActions } from '../store/login/login-slice';

import classes from './LoginForm.module.css';

import { NavLink } from 'react-router-dom';

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

    // Loading helper state
    const showLoading = useSelector(state => state.login.showLoading);
    const token = localStorage.getItem('token') ? localStorage.getItem('token') : null;

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

        // Remove logedIn token if it exists
        if (localStorage.getItem('logedIn')) {
            localStorage.removeItem('logedIn');
        }

        dispatch(loginUser(email, password));

        setOpen(true);

        dispatch(loginActions.isSnackBar(false));
    }

    return (
        <>
            <Container maxWidth="sm">
                <Box sx={{ 
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    minHeight: '100vh'
                }}>
                    {(showLoading && token) ? (
                        <>
                            <CircularProgress color="primary" size="5rem" />
                            <Typography variant="h3" component="h1" gutterBottom align="center" sx={{mt: 3}}>
                                You logged in before. Redirecting to your <strong style={{color: '#32CD30'}}>To Do</strong> list
                            </Typography>
                        </>
                    ) : (
                        <>
                            <Typography 
                                variant="h3" 
                                component="h1" 
                                gutterBottom 
                                align="center" 
                                sx={{color:'text.secondary', mb: 4 }}
                            >
                                Enter your account
                            </Typography>
                            <FormGroup 
                                sx={{
                                    border: 2,
                                    borderColor:'text.secondary',
                                    borderRadius: 3,
                                    boxShadow: 15,
                                    p: 3,
                                    minWidth: 330
                                }}
                            >
                                <TextField
                                    onChange={e => setEmail(e.target.value)}
                                    error={validEmail}
                                    sx={{mb: 1.5}}
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
                                    sx={{mb: 2}}
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
                                    size="small"
                                    startIcon={<AccountCircleOutlinedIcon fontSize="large" />}
                                    sx={{
                                        fontSize: {
                                            xs: 17,
                                            sm: 20,
                                            md: 21,
                                            lg: 22,
                                            xl: 22
                                        },
                                        minWidth: 150,
                                        alignSelf: 'center'
                                    }}
                                >
                                    Log in
                                </Button>                   
                            </FormGroup>

                            <FormGroup 
                                sx={{
                                    border: 2,
                                    borderColor:'text.secondary',
                                    borderRadius: 3,
                                    boxShadow: 15,
                                    mt: 3,
                                    p: 1.5,
                                    minWidth: 330 
                                }}
                            >
                                <Typography variant="h6" component="p" gutterBottom align="center" sx={{color: 'rgba(0, 0, 0, 0.4)', m: 0}}>
                                    Don't have an account? <NavLink to="/register" className={classes.signupbtn}>Sign up</NavLink>
                                </Typography>
                            </FormGroup>

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
                        </>
                    )}
                </Box>
            </Container>
        </>
    );
}

export default LoginForm;