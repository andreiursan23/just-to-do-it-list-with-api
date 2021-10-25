import { loginActions } from './login-slice';

export const loginUser = (email, password) => {
    return (dispatch) => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        
        var raw = JSON.stringify({
            "email": `${email}`,
            "password": `${password}`
        });
        
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };
        
        fetch("https://api-nodejs-todolist.herokuapp.com/user/login", requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result);

                if (typeof result === 'object') {
                    dispatch(loginActions.updateName(result.user.name));
                    dispatch(loginActions.updateToken(result.token));
                    dispatch(loginActions.isSnackBarError(false));
                } else {
                    dispatch(loginActions.isSnackBarError(true));
                    dispatch(loginActions.isSnackBar(true));
                }              
            })
    }
}