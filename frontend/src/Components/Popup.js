import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function Popup({state, handleClose,handleRequest, dialogTitle, textField, buttonName}) {

  return (
    <React.Fragment>
      <Dialog open={state} onClose={handleClose}>
        <DialogTitle>{dialogTitle}</DialogTitle>
        <DialogContent>
          {textField}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
          <Button onClick={handleRequest}>{buttonName ? buttonName : "Send"}</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}