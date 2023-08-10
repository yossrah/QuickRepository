import React from 'react'
import IconButton from '@mui/material/IconButton';

const ActionButton=({children,onClick,variant,color})=> {
  
    return (
    <IconButton 
    color={color}
    onClick={onClick}
    >{children}</IconButton>
  )
}

export default ActionButton
