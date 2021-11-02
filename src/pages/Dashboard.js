import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Avatar from '@mui/material/Avatar';

import LogoutIcon from '@mui/icons-material/Logout';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';

import { useEffect, useState } from 'react';

import Moment from 'react-moment';

import { useDispatch, useSelector } from 'react-redux';
import { getAllTasks, getTasksByStatus } from '../store/tasks/tasks-actions';
import { logoutUser } from '../store/login/login-actions';
import { getProfilePicture } from '../store/profle/profile-actions';

import TasksList from '../components/TasksList';
import CreateTask from '../components/CreateTask';
import ProfileModal from '../components/ProfileModal';

import DialogBox from '../components/DialogBox';


const Dashboard = () => {
    const [openDialog, setOpenDialog] = useState(false);
    const [openModal, setOpenModal] = useState(false);

    const userName = useSelector(state => state.login.name);
    const token = useSelector(state => state.login.token);
    const _id = useSelector(state => state.login._id);

    // Tasks manipulation selectors
    const allTasks = useSelector(state => state.tasks.currentTasks);
    const wasTaskAdded = useSelector(state => state.tasks.wasTaskAdded);
    const wasTaskDeleted = useSelector(state => state.tasks.wasTaskDeleted);
    const wasTaskStatusChanged = useSelector(state => state.tasks.wasTaskStatusChanged);
    const areTasksFiltered = useSelector(state => state.tasks.areTasksFiltered);
    const isTaskCompleted = useSelector(state => state.tasks.isTaskCompleted);
    
    // Profile editing selectors
    const profilePicture = useSelector(state => state.profile.profilePicture);
    const isChangePictureLoader = useSelector(state => state.profile.isChangePictureLoader);

    const dispatch = useDispatch();

    // Update task list on backend if task is added, deleted or if completion status is changed
    useEffect(() => {
        if (areTasksFiltered) {
            dispatch(getTasksByStatus(token, isTaskCompleted));
        } else {
            dispatch(getAllTasks(token));
        }  
    }, [wasTaskAdded, wasTaskDeleted, wasTaskStatusChanged, token, dispatch, isTaskCompleted, areTasksFiltered]);

    // Check if profile picture was uploaded
    useEffect(() => {
        dispatch(getProfilePicture(_id));
    }, [_id, dispatch, isChangePictureLoader]);

    // Logout user at click
    const openDeleteDialog = () => {
        setOpenDialog(true);
    }

    const closeDeleteDialog = () => {
        setOpenDialog(false);
    }

    const handleLogout = () => {
        dispatch(logoutUser(token));
        setOpenDialog(false);
    }

    // User profile view/edit
    const handleOpen = () => {
        setOpenModal(true);
    };

    return (
        <>
            <Container maxWidth='md' sx={{minHeight: '100vh'}}>
                <Box>
                    <AppBar 
                        position="fixed"
                        sx={{ 
                            px: {
                                xs: 0,
                                sm: 5,
                                md: 20,
                                lg: 50,
                                xl: 140
                            }
                        }}
                    >
                        <Toolbar>
                            <Avatar alt={userName} sx={{ bgcolor: 'text.success', color: 'text.secondary', width: 50, height: 50 }} src={profilePicture} />
                            <Typography 
                                variant="h5" 
                                component="div" 
                                sx={{ 
                                    flexGrow: 1,
                                    ml: 1,
                                    color: 'white'
                                }}
                            >
                                <Moment format="Do MMM YYYY"></Moment>
                            </Typography>
                            <Tooltip title="Profile">
                                <IconButton size="large" onClick={handleOpen}>
                                    <PersonOutlineIcon
                                        fontSize="large" 
                                        sx={{ color: 'white' }}
                                    />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Logout">
                                <IconButton onClick={openDeleteDialog} size="large">
                                    <LogoutIcon 
                                        fontSize="large" 
                                        sx={{ color: 'white' }}
                                    />
                                </IconButton>
                            </Tooltip>
                        </Toolbar>
                    </AppBar>
                </Box>

                <DialogBox
                    message={'Are you sure you want to Log Out?'} 
                    isOpen={openDialog}
                    handleApprove={handleLogout}
                    handleClose={closeDeleteDialog} 
                />

                <Box 
                    sx={{ 
                        display: 'block',
                        pt: 11,
                    }}
                >
                    <Typography 
                        variant="h2" 
                        component="div" 
                        sx={{ 
                            flexGrow: 1,
                            color: 'text.primary',
                            textAlign: 'center',
                            px: 3
                        }}
                    >
                        {userName}'s ToDo List
                    </Typography>

                    <Typography 
                        variant="subtitle1"
                        component="div" 
                        sx={{ 
                            flexGrow: 1,
                            color: 'text.secondary',
                            textAlign: 'center',
                            px: 0,
                            mb: 3
                        }}
                    >
                        Here's a breakdown of your upcoming tasks
                    </Typography>

                    <CreateTask />

                    <Container maxWidth="md"
                        sx={{ 
                            px: {
                                xs: 0,
                                sm: 20,
                                md: 40,
                                lg: 60,
                                xl: 70
                            },
                            mt: 2
                        }}
                    >
                        <TasksList tasksList={allTasks} />       
                    </Container>       
                </Box>

                <ProfileModal openModal={openModal} setOpenModal={setOpenModal} />
            </Container>
        </>
    );
}

export default Dashboard;