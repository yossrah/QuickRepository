import React from 'react'
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
const BootstrapButton = styled(Button)({
  boxShadow: 'none',
  textTransform: 'none',
  fontSize: 16,
  padding: '6px 12px',
  border: '1px solid',
  lineHeight: 1.5,
  backgroundColor: '#0063cc',
  borderColor: '#0063cc',
  fontFamily: [
    '-apple-system',
    'BlinkMacSystemFont',
    '"Segoe UI"',
    'Roboto',
    '"Helvetica Neue"',
    'Arial',
    'sans-serif',
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"',
  ].join(','),
  '&:hover': {
    backgroundColor: '#0069d9',
    borderColor: '#0062cc',
    boxShadow: 'none',
  },
  '&:active': {
    boxShadow: 'none',
    backgroundColor: '#0062cc',
    borderColor: '#005cbf',
  },
  '&:focus': {
    boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
  },
});
const ButtonSubmit=({type,variant,title,endIcon,style,onClick,startIcon,color})=> {
  return (
    <BootstrapButton type={type}
            fullWidth
            style={style}
            onClick={onClick}
            variant={variant} 
            sx={{ mt: 3, mb: 2 }}
            endIcon={endIcon}
            startIcon={startIcon}
            color={color}> 
            {title}
    </BootstrapButton>
  )
}

export default ButtonSubmit
