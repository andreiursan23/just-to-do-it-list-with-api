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
import FormGroup from '@mui/material/FormGroup';

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
        <Container maxWidth="sm">
            <Box sx={{ 
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh'
            }}>
                <Typography variant="h3" component="h2" gutterBottom align="center" sx={{color:'text.secondary', mb: 4 }}>
                    Register your acount
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
                        onChange={e => setFullName(e.target.value)}
                        error={validFullName}
                        sx={{mb: 1.5}}
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
                        sx={{mb: 1.5}}
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
                        sx={{mb: 2}}
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
                        Sign up
                    </Button>
                </FormGroup>

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