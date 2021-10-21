import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import TextField from '@mui/material/TextField';

import { Link } from 'react-router-dom';

const RegisterForm = () => {
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
                <form noValidate autoComplete="off" className="register-form login-and-register-form">
                    <TextField
                        className='form-input'
                        label="Full name"
                        helperText="Please enter your complete name"
                        variant="outlined"
                        color="success"
                        fullWidth
                        required
                    />
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
                    <TextField 
                        className='form-input' 
                        label="Age"
                        type="number"
                        helperText="Please enter your age"
                        variant="outlined"
                        color="success"
                        fullWidth
                        required
                    />
                    <Link to="/register" style={{textDecoration: 'none'}}>
                        <Button 
                            variant="contained" 
                            size="large"
                            startIcon={<AccountCircleOutlinedIcon fontSize="large" />}
                            className="sign-up-btn"
                        >
                            Sign up
                        </Button>                   
                    </Link>
                </form>
            </Box>
        </Container>
    );
}

export default RegisterForm;