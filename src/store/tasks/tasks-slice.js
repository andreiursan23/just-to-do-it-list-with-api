import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    currentTasks: [],
    wasTaskAdded: false,
    wasTaskDeleted: false,
    wasTaskStatusChanged: false,
    areTasksFiltered: false,
    isTaskCompleted: null,
    isLoader: false
}

const tasksSlice = createSlice({
    name: 'tasks',
    initialState: initialState,
    reducers: {
        setCurrentTasks(state, action) {
            state.currentTasks = action.payload;
        },
        wasTaskAdded(state) {
            state.wasTaskAdded = !state.wasTaskAdded;
        },
        wasTaskDeleted(state) {
            state.wasTaskDeleted = !state.wasTaskDeleted;
        },
        wasTaskStatusChanged(state) {
            state.wasTaskStatusChanged = !state.wasTaskStatusChanged;
        },
        tasksAreFiltered(state, action) {
            state.areTasksFiltered = action.payload;
        },
        isTaskCompleted(state, action) {
            state.isTaskCompleted = action.payload;
        },
        isLoader(state, action) {
            state.isLoader = action.payload;
        },
    }
});

export const tasksActions = tasksSlice.actions;
export default tasksSlice.reducer;