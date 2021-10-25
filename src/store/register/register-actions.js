import { registerActions } from './register-slice';

export const registerUser = (fullName, email, password, age) => {
    return (dispatch) => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "name": `${fullName}`,
            "email": `${email}`,
            "password": `${password}`,
            "age": `${age}`
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("https://api-nodejs-todolist.herokuapp.com/user/register", requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result);

                if (typeof result === 'object') {
                    dispatch(registerActions.isSnackBarError(false));
                    dispatch(registerActions.isSnackBar(true));
                } else {
                    dispatch(registerActions.snackBarError(result));
                    dispatch(registerActions.isSnackBarError(true));
                    dispatch(registerActions.isSnackBar(true));
                }
            });
    }
}