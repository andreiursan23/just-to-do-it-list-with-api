import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';

const DialogBox = ({message, isOpen, handleApprove, handleClose}) => {
    return (
        <div>
            <Dialog
                open={isOpen}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
            >
                <DialogTitle id="alert-dialog-title" sx={{fontSize: 22}}>
                    {message}
                </DialogTitle>

                <DialogActions>
                    <Button onClick={handleClose} sx={{fontSize: 20}}>No</Button>
                    <Button onClick={handleApprove} sx={{fontSize: 20}}>
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default DialogBox;