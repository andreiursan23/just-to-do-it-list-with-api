import { configureStore } from '@reduxjs/toolkit';
import registerSlice from './register/register-slice';
import loginSlice from './login/login-slice';
import tasksSlice from './tasks/tasks-slice';
import profileSlice from './profle/profile-slice';

const store = configureStore({
    reducer: {
        register: registerSlice,
        login: loginSlice,
        tasks: tasksSlice,
        profile: profileSlice,
    }
});

export default store;