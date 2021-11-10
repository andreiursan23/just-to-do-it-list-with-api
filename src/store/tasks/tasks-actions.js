import { tasksActions } from "./tasks-slice";

export const getAllTasks = (token) => {
  return (dispatch) => {
    dispatch(tasksActions.tasksAreFiltered(false));

    var getAllTasksHeaders = new Headers();

    getAllTasksHeaders.append("Authorization", `Bearer ${token}`);
    getAllTasksHeaders.append("Content-Type", "application/json");

    var getAllTasksRequestOptions = {
      method: "GET",
      headers: getAllTasksHeaders,
      redirect: "follow",
    };

    if (token) {
      fetch(
        "https://api-nodejs-todolist.herokuapp.com/task",
        getAllTasksRequestOptions
      )
        .then((response) => {
          console.log(response);
          if (response.ok) {
            return response.json();
          } else {
            throw new Error("Something went wrong...");
          }
        })
        .then((result) => {
          dispatch(tasksActions.setCurrentTasks(result.data));
        })
        .catch((err) => console.log(err));
    }
  };
};

export const addNewTask = (token, newTask) => {
  return (dispatch) => {
    dispatch(tasksActions.isLoader(true));
    var addNewTaskHeaders = new Headers();

    addNewTaskHeaders.append("Authorization", `Bearer ${token}`);
    addNewTaskHeaders.append("Content-Type", "application/json");

    var addNewTaskRaw = JSON.stringify({
      description: `${newTask}`,
    });

    var addNewTaskRequestOptions = {
      method: "POST",
      headers: addNewTaskHeaders,
      body: addNewTaskRaw,
      redirect: "follow",
    };

    fetch(
      "https://api-nodejs-todolist.herokuapp.com/task",
      addNewTaskRequestOptions
    )
      .then((response) => {
        console.log(response);
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Something went wrong...");
        }
      })
      .then((result) => {
        if (result.success) {
          dispatch(tasksActions.wasTaskAdded());
        }
      })
      .catch((err) => console.log(err))
      .finally(() => dispatch(tasksActions.isLoader(false)));
  };
};

export const deleteTask = (token, taskId) => {
  return (dispatch) => {
    dispatch(tasksActions.isLoader(true));
    var deleteTaskHeaders = new Headers();

    deleteTaskHeaders.append("Authorization", `Bearer ${token}`);
    deleteTaskHeaders.append("Content-Type", "application/json");

    var deleteTaskRequestOptions = {
      method: "DELETE",
      headers: deleteTaskHeaders,
      redirect: "follow",
    };

    fetch(
      `https://api-nodejs-todolist.herokuapp.com/task/${taskId}`,
      deleteTaskRequestOptions
    )
      .then((response) => {
        console.log(response);
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Something went wrong...");
        }
      })
      .then((result) => {
        if (result.success) {
          dispatch(tasksActions.wasTaskDeleted());
        }
      })
      .catch((err) => console.log(err))
      .finally(() => dispatch(tasksActions.isLoader(false)));
  };
};

export const updateTaskCompletion = (token, taskId, newStatus) => {
  return (dispatch) => {
    dispatch(tasksActions.isLoader(true));
    var updateTaskCompletionHeaders = new Headers();

    updateTaskCompletionHeaders.append("Authorization", `Bearer ${token}`);
    updateTaskCompletionHeaders.append("Content-Type", "application/json");

    var updateTaskCompletionRaw = JSON.stringify({
      completed: newStatus,
    });

    var updateTaskCompletionOptions = {
      method: "PUT",
      headers: updateTaskCompletionHeaders,
      redirect: "follow",
      body: updateTaskCompletionRaw,
    };

    fetch(
      `https://api-nodejs-todolist.herokuapp.com/task/${taskId}`,
      updateTaskCompletionOptions
    )
      .then((response) => {
        console.log(response);
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Something went wrong...");
        }
      })
      .then((result) => {
        if (result.success) {
          dispatch(tasksActions.wasTaskStatusChanged());
        }
      })
      .catch((err) => console.log(err))
      .finally(() => dispatch(tasksActions.isLoader(false)));
  };
};

export const getTasksByStatus = (token, isStatus) => {
  return (dispatch) => {
    var getTasksByStatusHeaders = new Headers();

    getTasksByStatusHeaders.append("Authorization", `Bearer ${token}`);
    getTasksByStatusHeaders.append("Content-Type", "application/json");

    var getTasksByStatusRequestOptions = {
      method: "GET",
      headers: getTasksByStatusHeaders,
      redirect: "follow",
    };

    if (token) {
      fetch(
        `https://api-nodejs-todolist.herokuapp.com/task?completed=${isStatus}`,
        getTasksByStatusRequestOptions
      )
        .then((response) => {
          console.log(response);
          if (response.ok) {
            return response.json();
          } else {
            throw new Error("Something went wrong...");
          }
        })
        .then((result) => {
          dispatch(tasksActions.setCurrentTasks(result.data));
        })
        .catch((err) => console.log(err));
    }
  };
};
