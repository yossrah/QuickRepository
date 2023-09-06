import React from 'react'
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
const Forum=()=> {
    const navigate=useNavigate()
  return (
    <React.Fragment>
    <div>
    Join our community forum to ask questions and share workflow solutions with the QuickTest team and other helpful users.
    </div>
    <Button variant="outlined" 
     style={{ marginTop: '10px',color:'#1a237e' }} onClick={()=>navigate('/layout/viewcomments')}>
     Visit forum
    </Button>
    </React.Fragment>
  )
}

export default Forum
