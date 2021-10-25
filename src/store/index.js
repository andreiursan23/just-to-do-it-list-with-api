import { configureStore } from '@reduxjs/toolkit';
import registerSlice from './register/register-slice';
import loginSlice from './login/login-slice';

const store = configureStore({
    reducer: {
        register: registerSlice.reducer,
        login: loginSlice.reducer
    }
});

export default store;