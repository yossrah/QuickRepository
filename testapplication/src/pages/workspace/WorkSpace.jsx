import * as React from 'react';
import Grid from '@mui/material/Grid';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import WorkFlow from './WorkFlow';
const defaultTheme = createTheme();
function WorkSpace() {
  return (
   
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: '100vh',width: '90vw'}}>
      <Grid
          item
          xs={12}
          sm={7}
          md={12}
          sx={{}}
        >
        <WorkFlow></WorkFlow>
        </Grid>
      </Grid>
    </ThemeProvider>
   
  );
}

export default WorkSpace;