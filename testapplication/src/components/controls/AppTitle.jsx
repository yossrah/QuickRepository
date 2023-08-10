import React from 'react'

import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
// Define a custom theme with Poppins font
const theme = createTheme({
    typography: {
      fontFamily: 'Poppins, sans-serif',
    },
  });
const AppTitle=({title})=> {
  return (
    <ThemeProvider theme={theme}>
    <Typography variant="h5" component="h1" gutterBottom>
       <h1>{title}</h1>
    </Typography>
    </ThemeProvider>
  )
}

export default AppTitle
