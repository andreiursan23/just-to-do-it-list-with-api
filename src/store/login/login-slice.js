import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isSnackBar: false,
    isSnackBarError: undefined,
    token: '',
    name: ''
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
        }
    }
});

export const loginActions = loginSlice.actions;
export default loginSlice;