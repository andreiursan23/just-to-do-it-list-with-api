import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import CircularProgress from '@mui/material/CircularProgress';
import { styled } from '@mui/material/styles';

import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import SaveIcon from '@mui/icons-material/Save';

import { useSelector, useDispatch } from 'react-redux';
import { uploadPicture } from '../store/profle/profile-actions';
import { getProfilePicture } from '../store/profle/profile-actions';
import { profileActions } from '../store/profle/profile-slice';

import { useState } from 'react';

const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: {
        xs: 300,
        sm: 500,
        md: 500,
        lg: 500,
        xl: 500,
    },
    height: {
        xs: 470,
        sm: 500,
        md: 500,
        lg: 500,
        xl: 500,
    },
    bgcolor: 'background.paper',
    border: '2px solid #2C5E1A',
    boxShadow: 24,
    p: {
        xs: 4,
        sm: 5,
        md: 5,
        lg: 5,
        xl: 5,
    },
    display: 'flex',
    flexDirection: 'column',
};

const Input = styled('input')({
    display: 'none',
});

const ProfileModal = ({ openModal, setOpenModal }) => {
    const userName = useSelector(state => state.login.name);
    const token = useSelector(state => state.login.token);
    const age = useSelector(state => state.login.age);
    const email = useSelector(state => state.login.email);
    const profilePicture = useSelector(state => state.profile.profilePicture);
    const isProfilePicture = useSelector(state => state.profile.isProfilePicture);
    const isChangePictureLoader = useSelector(state => state.profile.isChangePictureLoader);
    const _id = useSelector(state => state.login._id);

    const [enableSave, setEnableSave] = useState(true);
    const [pictureToUpload, setPictureToUpload] = useState(null);

    const dispatch = useDispatch();

    const handleClose = () => {
        setOpenModal(false);
        setEnableSave(true);
    };

    const handleInputedFile = (e) => {
        setPictureToUpload(e.target.files[0]);
        setEnableSave(false);
    };

    const saveChanges = () => {
        if (typeof pictureToUpload.name === 'string') {
            const formData = new FormData();
            formData.append("avatar", pictureToUpload, "blog-header.jpg");
            
            dispatch(profileActions.isChangePictureLoader(true));

            dispatch(uploadPicture(token, formData));
            dispatch(getProfilePicture(_id));
        }
    }

    return (
        <>
            <Modal
                    open={openModal}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
            >
                <Box sx={modalStyle}>
                    {isChangePictureLoader ? (
                        <Box sx={{ 
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            pt: '35%'
                        }}>
                            <CircularProgress color="primary" size="3rem" />
                            <Typography variant="h4" component="h1" gutterBottom align="center" sx={{color: 'text.secondary', mt: 3}}>
                                Making changes
                            </Typography>
                        </Box>
                    ) : (
                        <>
                            <Avatar 
                                alt={userName} 
                                sx={{ 
                                    bgcolor: 'text.primary', 
                                    color: 'success', 
                                    width: 85, 
                                    height: 85,
                                    alignSelf: 'center',
                                    mb: 1
                                }} 
                                src={profilePicture} 
                            />
                            <Typography id="modal-modal-title" variant="h3" component="h3" sx={{ alignSelf:'center', pb: 1.5, color:'text.secondary'}}>
                                Profile settings
                            </Typography>
                            <Typography id="modal-modal-description" variant="h5" component="p" sx={{ pb: 0.5 }}>
                                Username: <strong>{userName}</strong>
                            </Typography>
                            <Typography id="modal-modal-description" variant="h5" component="p" sx={{ pb: 0.5 }}>
                                Age: <strong>{age}</strong>
                            </Typography>
                            <Typography id="modal-modal-description" variant="h5" component="p" sx={{ pb: 2 }}>
                                Email: <strong>{email}</strong>
                            </Typography>                          
                            <Box
                                sx={{ 
                                    display: 'flex',
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    mb: 1
                                }}
                            >
                                {!isProfilePicture ? (
                                        <Typography id="modal-modal-description" variant="h5" component="p" sx={{ mb: 1, color:'text.primary' }}>
                                            It looks like you don’t have an user image uploaded. Please choose one by clicking the right icon.
                                        </Typography>
                                    ) : (
                                        <Typography id="modal-modal-description" variant="h5" component="p" sx={{ mb: 1, color:'text.primary' }}>
                                            Do you want to change your profile picture?
                                        </Typography>
                                    )
                                }
                                <label htmlFor="contained-button-file" >
                                    <Input accept="image/*" id="contained-button-file" multiple type="file" onChange={handleInputedFile}/>
                                    <IconButton color="success" aria-label="upload picture" component="span" size="large">
                                        <AddAPhotoIcon sx={{ mb: 1, color:'text.primary' }} fontSize="inherit" />
                                    </IconButton>
                                </label>
                            </Box>
                            <Button
                                onClick={saveChanges}
                                endIcon={<SaveIcon />}
                                variant="contained"
                                color="primary"
                                size="large"
                                disabled={enableSave}
                                sx={{ width: 150, alignSelf: 'center', fontSize: 22 }}
                            >
                                Save
                            </Button>
                        </>)}
                    </Box>
            </Modal>
        </>
    );
}

export default ProfileModal;