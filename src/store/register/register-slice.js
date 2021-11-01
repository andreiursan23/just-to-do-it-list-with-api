import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isSnackBar: false,
    isSnackBarError: undefined,
    snackBarError: ''
}

const registerSlice = createSlice({
    name: 'register',
    initialState: initialState,
    reducers: {
        isSnackBar(state, action) {
            state.isSnackBar = action.payload;
        },
        isSnackBarError(state, action) {
            state.isSnackBarError = action.payload;
        },
        snackBarError(state, action) {
            state.snackBarError = action.payload;
        }
    }
});

export const registerActions = registerSlice.actions;
export default registerSlice.reducer;