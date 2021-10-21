import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <>
            <Container maxWidth="sm" className="main-container">
                <Box sx={{ 
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center'
                }} className="home-container">
                    <Typography variant="h1" component="h1" gutterBottom align="center">
                        JUST <strong className="to-do-color">TO DO</strong> IT!
                    </Typography>

                    <Typography variant="h4" component="h2" gutterBottom align="center">
                        A simple App to track your tasks or objectives and enhance your daily productivity.
                    </Typography>

                    <Link to="/login" style={{textDecoration: 'none'}}>
                        <Button 
                            variant="contained" 
                            size="large"
                            startIcon={<AccountCircleOutlinedIcon fontSize="large" />}
                            className="register-now-btn"
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