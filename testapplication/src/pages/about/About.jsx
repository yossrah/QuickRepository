import React from 'react'
import {Grid,Paper}from '@mui/material'
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Lockk from '../../images/about.jpg'
import Title from '../../components/Title';
import { useNavigate } from 'react-router-dom';
import { ColorButton } from '../../components/Styles';
import CopyRights from '../../components/controls/CopyRights';
const theme = createTheme();
const About=()=> {
const navigate=useNavigate()
  return (
    <React.Fragment>
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
       <Grid xs={12} sm={8} md={5} component={Paper}  >
         <Box
            sx={{
              my: 30,
              mx: 0,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
           <Grid sx={{ marginLeft: '30px' }} align='justify' >
            <h1 style={{ borderBottom: 'none' }}>Welcome to QuickTest</h1>
            <Title title="Continuously generate automated testing scripts for Android applications ." ></Title>
           </Grid>
           <Box component="form" noValidate sx={{ mt: 1 }} >
           <ColorButton style={{borderRadius:60, fontSize: '1.1rem', // Augmenter la taille de la police
               }} 
                        variant="contained" 
                        onClick={()=>navigate('/login')}>
                        Get Started
           </ColorButton>
          </Box>
          </Box>
          <CopyRights sx={{ mt: 5 }} />
      </Grid>
      <Grid item xs={false} sm={4} md={7} sx={{
            backgroundImage: `url(${Lockk})`,
            backgroundSize: 'cover',
            height:'100%'
          }}
        />
      </Grid>
  </ThemeProvider>
  </React.Fragment>
  )
}

export default About
