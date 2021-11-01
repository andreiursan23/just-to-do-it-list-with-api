import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    profilePicture: undefined,
    isProfilePicture: false,
    isChangePictureLoader: false
}

const profileSlice = createSlice({
    name: 'profile',
    initialState: initialState,
    reducers: {
        setProfilePicture(state, action) {
            state.profilePicture = action.payload;
        },
        isProfilePicture(state, action) {
            state.isProfilePicture = action.payload;
        },
        isChangePictureLoader(state, action) {
            state.isChangePictureLoader = action.payload;
        },
    }
});

export const profileActions = profileSlice.actions;
export default profileSlice.reducer;