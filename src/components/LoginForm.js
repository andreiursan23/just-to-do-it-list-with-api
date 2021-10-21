import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import TextField from '@mui/material/TextField';

import { Link as LinkRoute } from 'react-router-dom';


const LoginForm = () => {
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
                    <form noValidate autoComplete="off" className="register-form login-and-register-form">
                        <TextField 
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
                            className='form-input' 
                            label="Password"
                            type="password"
                            helperText="Please enter your password"
                            variant="outlined"
                            color="success"
                            fullWidth
                            required
                        />
                        <LinkRoute to="/" style={{textDecoration: 'none'}}>
                            <Button 
                                variant="contained" 
                                size="large"
                                startIcon={<AccountCircleOutlinedIcon fontSize="large" />}
                                className="sign-up-btn"
                            >
                                Log in
                            </Button>                   
                        </LinkRoute>
                    </form>

                    <section className="login-and-register-form log-in-box">
                        <Typography variant="h6" component="p" gutterBottom align="center" className="login-title">
                            Don't have an account? <LinkRoute to="/register" underline="never" className="register-link">Sign up</LinkRoute>
                        </Typography>
                    </section>
                </Box>
            </Container>
        </>
    );
}

export default LoginForm;