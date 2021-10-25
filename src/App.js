import './App.css';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@emotion/react';
import { StyledEngineProvider } from '@mui/material';

import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';

import { useSelector } from 'react-redux';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";


const theme = createTheme({
  palette: {
    primary: {
      main: '#32CD30',
      darker: '#2C5E1A',
    },
    success: {
      main: '#32CD30',
    },
  }
});

function App() {
  // Check if user is authenticated
  const token = useSelector(state => state.login.token);

  const checkAuth = () => {
    if (token !== '') {
      return false
    } else {
      return true
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <StyledEngineProvider injectFirst>
        <Router>
          <Switch>
            <Route path="/" exact>
              <Home />
            </Route>

            <Route path="/register">
              <Register />
            </Route>

            <Route path="/login" render={() => (
              checkAuth() ? (
                <Login />
              ) : (
                <Redirect to="/dashboard" />
              )
            )}>
            </Route>
          </Switch>
        </Router>
      </StyledEngineProvider>
    </ThemeProvider>
  );
}

export default App;
