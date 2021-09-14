import React from 'react';

import { Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';

const MSG_DURATION = 5000;

const Message = (props) => {
  return (
    <Alert
      elevation={6}
      variant="filled"
      {...props}
      style={{ color: 'white', fontSize: '16px' }}
    />
  );
};

const Notify = ({ open, handleClose, msg, type }) => (
  <Snackbar
    open={open}
    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    onClose={handleClose}
    autoHideDuration={MSG_DURATION}>
    <Message severity={type} onClose={handleClose}>
      {msg}
    </Message>
  </Snackbar>
);

export default Notify;
