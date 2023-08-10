import * as React from 'react';
import Grid from '@mui/material/Grid';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Getworkflow from './Getworkflow';
const defaultTheme = createTheme();
function WorkSpace() {
  return (
   
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: '100vh',width: '87vw'}}>
      <Grid
          item
          xs={12}
          sm={7}
          md={12}
          sx={{}}
        >
        <Getworkflow></Getworkflow>
        </Grid>
      </Grid>
    </ThemeProvider>
    );
}

export default WorkSpace;