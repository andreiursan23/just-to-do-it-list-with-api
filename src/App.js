import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@emotion/react';
import { responsiveFontSizes } from '@mui/material';
import { Box } from '@mui/system';
import CssBaseline from '@mui/material/CssBaseline'

import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

import { useSelector } from 'react-redux';

import {
  HashRouter as Router,
  Switch,
  Route,
  Redirect, 
} from "react-router-dom";

// Custom culors for theme
let theme = createTheme({
  palette: {
    primary: {
      main: '#32CD30',
      darker: '#2C5E1A',
    },
    success: {
      main: '#2C5E1A',
    },
    text: {
      primary: '#2C5E1A',
      secondary: '#32CD30',
      success: '#e9f7f1'
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 640,
      md: 1920,
      lg: 2560,
      xl: 2561,
    },
  },
});

// Responsive fonts
theme = responsiveFontSizes(theme);

function App() {
  // Check if user is authenticated
  const isAuth = useSelector(state => state.login.isAuthenticated);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline>
        <Router>
          <Box sx={{bgcolor: '#e9f7f1'}}>
            <Switch>
              <Route path="/" exact>
                <Home />
              </Route>

              <Route path="/register" render={() => (
                !isAuth ? (
                  <Register />
                ) : (
                  <Redirect to="/dashboard" />
                )
              )}>
              </Route>

              <Route path="/login" render={() => (
                !isAuth ? (
                  <Login />
                ) : (
                  <Redirect to="/dashboard" />
                )
              )}>
              </Route>

              <Route path="/dashboard" render={() => (
                isAuth ? (
                  <Dashboard />
                ) : (
                  <Redirect to="/login" />
                )
              )}>
              </Route>
            </Switch>
          </Box>
        </Router>
      </CssBaseline>
    </ThemeProvider>
  );
}

export default App;
