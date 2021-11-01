import SingleTask from "./SingleTask";
import { TransitionGroup } from "react-transition-group";
import { Collapse, List, CircularProgress, Typography, Box } from "@mui/material";
import { useSelector } from "react-redux";

const TasksList = ({ tasksList }) => {
    const isLoader = useSelector(state => state.tasks.isLoader);

    return (
        <List>
            {isLoader ? (
                <Box sx={{ 
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    minHeight: '50vh'
                }}>
                    <CircularProgress color="primary" size="3rem" />
                    <Typography variant="h4" component="h1" gutterBottom align="center" sx={{color: 'text.secondary', mt: 3}}>
                        Making changes
                    </Typography>
                </Box>
            ) : 
                <TransitionGroup>
                    {tasksList && tasksList.map((task) => (
                        <Collapse key={task._id}>
                            {!isLoader && <SingleTask task={task.description} id={task._id} isCompleted={task.completed} />}
                        </Collapse>
                    ))}
                </TransitionGroup>
            }
        </List>
    );
}

export default TasksList;