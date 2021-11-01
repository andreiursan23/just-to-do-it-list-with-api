import { profileActions } from "./profile-slice";
import axios from "axios";

export const getProfilePicture = (id) => {
    return (dispatch) => {
        axios
            .get(`https://api-nodejs-todolist.herokuapp.com/user/${id}/avatar`, {responseType: 'arraybuffer'})
            .then(function (response) {
                let blob = new Blob(
                    [response.data], 
                    { type: response.headers['content-type'] }
                )
                  
                let imgUrl = URL.createObjectURL(blob)
                
                dispatch(profileActions.setProfilePicture(imgUrl));
                dispatch(profileActions.isProfilePicture(true));
                dispatch(profileActions.isChangePictureLoader(false));
            })
            .catch(function (error) {
                console.log(error);
            });
    }
}

export const uploadPicture = (token, formData) => {
    return (dispatch) => {
        let uploadPictureHeaders = new Headers();
        uploadPictureHeaders.append("Authorization", `Bearer ${token}`);
        
        const uploadPictureRequestOptions = {
            method: 'POST',
            headers: uploadPictureHeaders,
            body: formData,
            redirect: 'follow',
        };
        
        fetch("https://api-nodejs-todolist.herokuapp.com/user/me/avatar", uploadPictureRequestOptions)
            .then(response => response.json())
            .then(result => {
                if (result.error) {
                    dispatch(profileActions.isProfilePicture(false));
                } else {
                    dispatch(profileActions.isProfilePicture(true));
                    localStorage.setItem('isProfilePicture', 'true');
                    dispatch(profileActions.isChangePictureLoader(false));
                }
            })
            .catch(error => console.log('error', error));
    }
}