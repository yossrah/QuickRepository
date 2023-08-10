import React from 'react';
import { verifyAccount } from '../../redux/actions/authActions';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch ,useSelector} from 'react-redux';
import {Grid,Paper}from '@mui/material'
import LockPersonIcon from '@mui/icons-material/LockPerson';
import Box from '@mui/material/Box';import { createTheme, ThemeProvider } from '@mui/material/styles';
import Title from '../../components/Title';
import AvatarUI from '../../components/AvatarUI';
import Header from '../antDesign/Header/Header';
import CopyRights from '../../components/controls/CopyRights';
import BackdropItem from '../../components/controls/BackdropItem';
import ButtonSubmit from '../../components/ButtonSubmit';
import { btStyle } from '../../components/Styles';
const theme = createTheme();
const ActivationPage = ( ) => {
  const { activationCode } = useParams();
  const navigate=useNavigate()
  const {isLoading}=useSelector(state=>state.auth)
  // console.log(activationCode)
   const dispatch=useDispatch()
  const handleDispatch=(activationCode)=>{
    // console.log('dispaaaaaatch', activationCode)
    dispatch(verifyAccount(activationCode,navigate))
    
  }
    return (
      <React.Fragment>
      <ThemeProvider theme={theme}>
      <Header/>
      <Grid elevation={10} container component="main"
       sx={{ height: '100vh',width:'60vh',margin:'auto', }}>
       <Grid item xs={12} sm={8} md={12} component={Paper} sx={{ border:'1px ',borderRadius: '10px'
        ,height: '60vh',width:'60vh',marginTop:'120px',boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.2)'  }}  >
         <Box sx={{my: 8,mx: 4,display: 'flex',flexDirection: 'column',alignItems: 'center',}}>
           <AvatarUI icon={<LockPersonIcon/>} />
           <Grid align='justify'>
           <Title title="Activate your account" caption={"Please wait while we activate your account."}></Title>
           </Grid>
           <Box component="form" noValidate sx={{ mt: 1 }} >
           <ButtonSubmit 
              variant="contained" 
              style={btStyle} 
              title="Click here"
              onClick={()=>handleDispatch(activationCode)}
              >
            </ButtonSubmit>
           </Box>
           </Box>
           </Grid>
           <div style={{marginLeft:'100px'}} >
          <CopyRights/>
          </div>
        </Grid>
         <BackdropItem open={isLoading}></BackdropItem>
       </ThemeProvider>
      </React.Fragment>
    );
  };
 
  export default ActivationPage;

