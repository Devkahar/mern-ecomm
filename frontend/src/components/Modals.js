import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { CircularProgress } from '@material-ui/core';

export default function FormDialog(props) {
  

  return (
    <div>
      <Dialog open={props.open} onClose={props.handleClose} aria-labelledby="form-dialog-title" aria-describedby="alert-dialog-description">
        <DialogTitle id="form-dialog-title">{props.title}</DialogTitle>
        <DialogContent>
          {props.children}
        <DialogActions>
          <Button variant="contained" onClick={props.submitHandler} color="primary">
            {props.btnText}
          </Button>
          
        </DialogActions>
        </DialogContent>
      </Dialog>
    </div>
  );
}