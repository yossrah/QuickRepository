import React from 'react'
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
// Define a custom theme with Poppins font
const theme = createTheme({
    typography: {
      fontFamily: 'Poppins, sans-serif',
    },
  });
const Title=({caption , title, name,color})=> {
  return (
    <ThemeProvider theme={theme}>
    <Typography variant="h5" component="h4" gutterBottom style={{ color: color }}>
      {name}<h3>{title}</h3>
    </Typography>
    <Typography variant='caption' gutterBottom>{caption}</Typography>
    </ThemeProvider>
  )
}

export default Title
