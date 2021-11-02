import { loginActions } from './login-slice';
import { getProfilePicture } from '../profle/profile-actions';

export const loginUser = (email, password) => {
    return (dispatch) => {
        const wasLogedIn = localStorage.getItem('logedIn');

        if (wasLogedIn === 'true') {
            const token = localStorage.getItem('token');

            var checkTokenHeaders = new Headers();
            checkTokenHeaders.append("Authorization", `Bearer ${token}`);

            var checkRequestOptions = {
                method: 'GET',
                headers: checkTokenHeaders,
                redirect: 'follow'
            };

            dispatch(loginActions.showLoading(true));

            fetch("https://api-nodejs-todolist.herokuapp.com/user/me", checkRequestOptions)
                .then(response => {
                    console.log(response);
                    if (response.ok) {
                        return response.json()
                    } else {
                        throw new Error('Something went wrong...')
                    }
                })
                .then(result => {
                    if (!result.error) {
                        dispatch(loginActions.login());
                        dispatch(loginActions.showLoading(false));
                        dispatch(loginActions.updateName(result.name));
                        dispatch(loginActions.updateId(result._id));
                        dispatch(loginActions.updateAge(result.age));
                        dispatch(loginActions.updateEmail(result.email));
                        
                        dispatch(loginActions.updateToken(token));
                        dispatch(getProfilePicture(result._id));
                    }
                })
                .catch(err => console.log(err));
        } else {
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
                .then(response => {
                    console.log(response);
                    if (response.ok) {
                        return response.json()
                    } else {
                        throw new Error('Something went wrong...')
                    }
                })
                .then(result => {
                    if (typeof result === 'object') {
                        // Successful Login actions
                        dispatch(loginActions.updateName(result.user.name));
                        dispatch(loginActions.updateToken(result.token));
                        dispatch(loginActions.login());
                        dispatch(loginActions.isSnackBarError(false));
                        dispatch(loginActions.showLoading(false));
                        dispatch(loginActions.updateId(result.user._id));
                        dispatch(loginActions.updateAge(result.user.age));
                        dispatch(loginActions.updateEmail(result.user.email));

                        // Set token in local storage
                        localStorage.setItem('token', result.token);
                        localStorage.setItem('logedIn', true);
                    } else {
                        // Unsuccessful Login actions
                        dispatch(loginActions.isSnackBarError(true));
                        dispatch(loginActions.isSnackBar(true));
                    }              
                })
                .catch(err => console.log(err))
        }
    }
}

export const logoutUser = (token) => {
    return (dispatch) => {
        var logoutHeaders = new Headers();
        logoutHeaders.append("Authorization", `Bearer ${token}`);
        
        var logoutRequestOptions = {
            method: 'POST',
            headers: logoutHeaders,
            redirect: 'follow'
        };
        
        fetch("https://api-nodejs-todolist.herokuapp.com/user/logout", logoutRequestOptions)
            .then(response => {
                console.log(response);
                if (response.ok) {
                    return response.json()
                } else {
                    throw new Error('Something went wrong...')
                }
            })
            .then(() => {
                dispatch(loginActions.updateName(''));
                dispatch(loginActions.updateToken(''));
                dispatch(loginActions.logout());

                localStorage.getItem('token') && localStorage.removeItem('token');
                localStorage.getItem('logedIn') && localStorage.removeItem('logedIn');
                localStorage.getItem('id') && localStorage.removeItem('id');
            })
            .catch(err => console.log(err));
    }
}