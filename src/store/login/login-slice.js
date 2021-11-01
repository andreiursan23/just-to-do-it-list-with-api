import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isSnackBar: false,
    isSnackBarError: undefined,
    showLoading: false,
    token: '',
    name: '',
    _id: '',
    age: 0,
    email: '',
    isAuthenticated: false,
}

const loginSlice = createSlice({
    name: 'login',
    initialState: initialState,
    reducers: {
        isSnackBar(state, action) {
            state.isSnackBar = action.payload;
        },
        isSnackBarError(state, action) {
            state.isSnackBarError = action.payload;
        },
        updateToken(state, action) {
            state.token = action.payload;
        },
        updateName(state, action) {
            state.name = action.payload;
        },
        updateId(state, action) {
            state._id = action.payload;
        },
        updateAge(state, action) {
            state.age = action.payload;
        },
        updateEmail(state, action) {
            state.email = action.payload;
        },
        login(state) {
            state.isAuthenticated = true;
        },
        logout(state) {
            state.isAuthenticated = false;
        },
        showLoading(state, action) {
            state.showLoading = action.payload;
        }
    }
});

export const loginActions = loginSlice.actions;
export default loginSlice.reducer;