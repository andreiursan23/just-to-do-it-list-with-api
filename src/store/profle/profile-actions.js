import { profileActions } from "./profile-slice";
import axios from "axios";

export const getProfilePicture = (id) => {
  return (dispatch) => {
    if (id) {
      axios
        .get(`https://api-nodejs-todolist.herokuapp.com/user/${id}/avatar`, {
          responseType: "arraybuffer",
        })
        .then((response) => {
          let blob = new Blob([response.data], {
            type: response.headers["content-type"],
          });

          let imgUrl = URL.createObjectURL(blob);

          dispatch(profileActions.setProfilePicture(imgUrl));
          dispatch(profileActions.isChangePictureLoader(false));
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };
};

export const uploadPicture = (token, formData) => {
  return (dispatch) => {
    let uploadPictureHeaders = new Headers();
    uploadPictureHeaders.append("Authorization", `Bearer ${token}`);

    const uploadPictureRequestOptions = {
      method: "POST",
      headers: uploadPictureHeaders,
      body: formData,
      redirect: "follow",
    };

    fetch(
      "https://api-nodejs-todolist.herokuapp.com/user/me/avatar",
      uploadPictureRequestOptions
    )
      .then((response) => {
        console.log(response);
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Something went wrong...");
        }
      })
      .then(() => {
        console.log("Image uploaded");
      })
      .catch((error) => console.log("error", error));
  };
};
