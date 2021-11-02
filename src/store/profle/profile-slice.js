import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    profilePicture: undefined,
    isChangePictureLoader: false,
}

const profileSlice = createSlice({
    name: 'profile',
    initialState: initialState,
    reducers: {
        setProfilePicture(state, action) {
            state.profilePicture = action.payload;
        },
        isChangePictureLoader(state, action) {
            state.isChangePictureLoader = action.payload;
        },
    }
});

export const profileActions = profileSlice.actions;
export default profileSlice.reducer;