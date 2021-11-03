import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import LoginIcon from '@mui/icons-material/Login';

import { Link } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { loginUser } from '../store/login/login-actions';

const Home = () => {
    const dispatch = useDispatch();

    const checkPrevAuth = () => {
        dispatch(loginUser());
    }

    return (
        <>
            <Container 
                maxWidth="sm"
                sx={{ 
                    display: 'flex',
                    minHeight: '100vh'
                }}
            >
                <Box 
                    sx={{ 
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                >
                    <Typography 
                        variant="h1" 
                        component="h1" 
                        gutterBottom 
                        align="center"
                        sx={{color: 'text.primary'}}
                    >
                        JUST <strong style={{color: '#00a200'}}>TO DO</strong> IT!
                    </Typography>

                    <Typography variant="h4" component="h2" gutterBottom align="center" sx={{color: 'text.primary'}}>
                        A simple App to track your tasks or objectives and enhance your daily productivity.
                    </Typography>

                    <Link to="/login" style={{textDecoration: 'none'}}>
                        <Button
                            onClick={checkPrevAuth}
                            variant="contained" 
                            size="large"
                            startIcon={<LoginIcon fontSize="large" />}
                            sx={{
                                fontSize: {
                                    xs: 17,
                                    sm: 20,
                                    md: 21,
                                    lg: 25,
                                    xl: 25
                                },
                                mt: 6,
                                color: '#e9f7f1'
                            }}
                        >
                            Log in now
                        </Button>                   
                    </Link>
                </Box>
            </Container>
        </>
    );
}

export default Home;