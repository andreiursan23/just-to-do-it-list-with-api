import { useDispatch, useSelector } from "react-redux";
import { deleteTask } from "../../store/tasks/tasks-actions";
import { updateTaskCompletion } from "../../store/tasks/tasks-actions";
import { tasksActions } from "../../store/tasks/tasks-slice";

import { ListItem, IconButton, Checkbox, Typography } from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";

const SingleTask = ({ task, id, isCompleted }) => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.login.token);

  const handleChange = () => {
    dispatch(tasksActions.wasTaskStatusChanged(true));
    dispatch(updateTaskCompletion(token, id, !isCompleted));
  };

  return (
    <>
      <ListItem sx={isCompleted ? { bgcolor: "text.secondary" } : {}}>
        <Checkbox
          checked={isCompleted}
          onChange={handleChange}
          sx={
            isCompleted
              ? {
                  color: "white",
                  "&.Mui-checked": {
                    color: "white",
                  },
                }
              : {
                  color: "text.primary",
                  "&.Mui-checked": {
                    color: "text.primary",
                  },
                }
          }
          size="large"
        />
        <Typography
          variant="h5"
          component="p"
          sx={
            isCompleted
              ? {
                  flexGrow: 1,
                  color: "white",
                  px: 3,
                }
              : {
                  flexGrow: 1,
                  color: "text.primary",
                  px: 3,
                }
          }
          style={isCompleted ? { textDecoration: "line-through" } : {}}
        >
          {task}
        </Typography>
        <IconButton
          onClick={() => dispatch(deleteTask(token, id))}
          size="large"
        >
          <DeleteIcon
            fontSize="large"
            sx={isCompleted ? { color: "white" } : { color: "text.primary" }}
          />
        </IconButton>
      </ListItem>
    </>
  );
};

export default SingleTask;
