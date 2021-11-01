import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { getAllTasks, getTasksByStatus, deleteTask } from "../store/tasks/tasks-actions";
import { tasksActions } from "../store/tasks/tasks-slice";

import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';

import { IconButton, FormControl, Box, Tooltip } from "@mui/material";
import InputBase from '@mui/material/InputBase';
import NativeSelect from '@mui/material/NativeSelect';
import { styled } from "@mui/system";

import DialogBox from "./DialogBox";

const CustomInput = styled(InputBase)(({ theme }) => ({
    'label + &': {
        marginTop: theme.spacing(3)
    },
    '& .MuiInputBase-input': {
        borderRadius: 4,
        position: 'relative',
        backgroundColor: theme.palette.background.paper,
        border: '1px solid #32CD30',
        padding: '17px 26px 17px 14px',
        transition: theme.transitions.create(['border-color', 'box-shadow']),      
        '&:focus': {
            borderRadius: 4,
            borderColor: '#2C5E1A',
            boxShadow: '0 0 0 0.2rem rgba(44,94,26, 0.25)',
        }
    },
}));

const TasksAction = ({ tasksList }) => {
    const [filterByCompletion, setFilterByCompletion] = useState('');
    const [openDialog, setOpenDialog] = useState(false);

    const token = useSelector(state => state.login.token);
    const dispatch = useDispatch();

    const handleChange = (e) => {
        setFilterByCompletion(e.target.value);
    }

    useEffect(() => {
        if (filterByCompletion === 'all') {
            dispatch(tasksActions.tasksAreFiltered(false));
            dispatch(getAllTasks(token));
        } else if (filterByCompletion === 'completed') {
            dispatch(getTasksByStatus(token, true));
            dispatch(tasksActions.tasksAreFiltered(true));
            dispatch(tasksActions.isTaskCompleted(true));
        } else {
            dispatch(getTasksByStatus(token, false));
            dispatch(tasksActions.tasksAreFiltered(true));
            dispatch(tasksActions.isTaskCompleted(false));
        }
    }, [filterByCompletion, dispatch, token]);

    const deleteAllCompletedTasks = () =>{
        let toBeDeletedIds = [];

        tasksList.forEach(task => {
            if(task.completed) {
                toBeDeletedIds.push(task);
            }
        });

        toBeDeletedIds.forEach(task => {
            dispatch(deleteTask(token, task._id));
        });

        setOpenDialog(false);
    };

    const openDeleteDialog = () => {
        setOpenDialog(true);
    }

    const closeDeleteDialog = () => {
        setOpenDialog(false);
    }

    return (
        <>
            <Box sx={{
                minWidth: '100%',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <FormControl sx={{ m: 0 }} variant="standard" fullWidth>
                    <NativeSelect
                        value={filterByCompletion}
                        onChange={handleChange}
                        input={<CustomInput />}
                        sx={{
                            bgcolor: 'white',
                            minWidth: '100%',
                        }}
                    >
                        <option value="" disabled>Select task category</option>
                        <option value={'all'} defaultValue>All</option>
                        <option value={'completed'}>Completed</option>
                        <option value={'incompleted'}>Incompleted</option>
                    </NativeSelect>
                </FormControl>
                <Tooltip title="Delete all completed tasks">
                    <IconButton onClick={openDeleteDialog} size="large">
                        <DeleteForeverRoundedIcon 
                            fontSize="large" 
                            sx={{ color: 'text.primary' }}
                        />
                    </IconButton>
                </Tooltip>

                <DialogBox 
                    message={'Are you sure you want to delete all completed tasks?'} 
                    isOpen={openDialog}
                    handleApprove={deleteAllCompletedTasks}
                    handleClose={closeDeleteDialog}
                />
            </Box>
        </>
    );
}

export default TasksAction;