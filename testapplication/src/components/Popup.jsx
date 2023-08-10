import React from 'react'
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import CancelIcon from '@mui/icons-material/Cancel';
import { styled } from '@mui/material/styles';
import { Typography } from '@mui/material';
import ActionButton from './controls/ActionButton';
const useStyles= styled(Dialog)(({ theme }) => ({
  dialogWrapper:{
    '& .MuiDialogContent-root': {
      padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
      padding: theme.spacing(1),
    },
    position: 'absolute',
      top:theme.spacing(1)
  }
 
}));



const Popup=(props)=> {
    const {title,children,openPopup,setOpenPopup}=props
    const classes=useStyles
    return (
    <Dialog open={openPopup}
    classes={{paper:classes.dialogWrapper}}
    
    keepMounted
    // onClose={handleClose}
    aria-describedby="alert-dialog-slide-description"
    maxWidth="md">
      <DialogTitle >
       <div style={{display:'flex'}}>
       <Typography variant='h6' component="div" style={{flexGrow:1}}>
       {title}
       </Typography>
     <ActionButton color={"warning"} onClick={()=>{setOpenPopup(false)}}>
     <CancelIcon />
     </ActionButton>
     </div>
      </DialogTitle>
      <DialogContent dividers>
      {children}
      </DialogContent>
    </Dialog>
  )
}

export default Popup
