// SuccessAlert.js
import React from 'react';
import { Alert, Snackbar } from '@mui/material';

const SuccessAlert = ({ open, handleClose, message }) => {
  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}  anchorOrigin={{ vertical: 'bottom', horizontal: 'right'}} >
      <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default SuccessAlert;
