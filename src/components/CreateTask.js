import { useState } from "react";

import { TextField, Box, IconButton, Grid } from "@mui/material";

import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';

import { useDispatch, useSelector } from "react-redux";
import { addNewTask } from "../store/tasks/tasks-actions";

import TasksAction from "./TasksActions";

const CreateTask = () => {
    const [inputedNewTask, setInputedNewTask] = useState('');

    const dispatch = useDispatch();
    const token = useSelector(state => state.login.token);
    const allTasks = useSelector(state => state.tasks.currentTasks);

    const addTask = () => {
        dispatch(addNewTask(token, inputedNewTask));
        setInputedNewTask('');
    }

    return (
        <>
            <Box sx={{
                minWidth: '100%',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                mt: 3
            }}>
                <Grid container spacing={2} 
                        sx={{ 
                            px: {
                                xs: 0,
                                sm: 10,
                                md: 20,
                                lg: 30,
                                xl: 40
                            }
                        }}
                >
                    <Grid item xs={12} sm={8} md={8} lg={8} xl={8}>
                        <TextField
                            onChange={e => setInputedNewTask(e.target.value)}
                            value={inputedNewTask}
                            label="Add your new to do"
                            type="email"
                            variant="outlined"
                            color="success"
                            size="medium"
                            InputProps={{endAdornment: 
                                <IconButton size="large" onClick={addTask}>
                                    <AddCircleRoundedIcon
                                        fontSize="large"
                                        sx={ { color: 'text.primary' }}
                                    />
                                </IconButton>
                            }}
                            sx={{
                                bgcolor: 'white',
                                minWidth: '100%',
                                '& label.Mui-focused': {
                                    color: 'text.primary',
                                },
                                '& .MuiOutlinedInput-root': {
                                    '& fieldset': {
                                    borderColor: 'text.secondary',
                                    },
                                    '&:hover fieldset': {
                                    borderColor: 'text.primary',
                                    },
                                    '&.Mui-focused fieldset': {
                                    borderColor: 'text.primary',
                                    }
                                }
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={4} md={4} lg={4} xl={4} sx={{padding: 0, margin: 0}}>
                        <TasksAction tasksList={allTasks} />
                    </Grid>
                </Grid>
            </Box>
        </>
    );
}

export default CreateTask;