// import * as React from 'react';
import React, {useState} from 'react';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import InputField from '../../components/InputField';
import Lockk from '../../images/bleu.jpg'
import ButtonSubmit from '../../components/ButtonSubmit';
import AvatarUI from '../../components/AvatarUI';
import { useDispatch ,useSelector} from 'react-redux';
import { useNavigate } from "react-router-dom";
import { LoginAction } from '../../redux/actions/authActions';
import BackdropItem from '../../components/controls/BackdropItem';
import CopyRights from '../../components/controls/CopyRights';
import Header from '../antDesign/Header/Header';

const theme = createTheme();
const btStyle={ marginTop:'20px 0',backgroundColor:'#1e81b0'}
export default function SignIn() {
  const {isLoading}=useSelector(state=>state.auth)
  const dispatch=useDispatch()
  const {errors}=useSelector((state)=>state.auth)
  const navigate=useNavigate()
  const [form,setForm]=useState({})
  const onChangeHandler=(e)=>{
   setForm({
    ...form,[e.target.name]:e.target.value
   })
  }
 console.log('isConnected',isLoading)
  const onSubmit=(e)=>{
    e.preventDefault()
    dispatch(LoginAction(form,navigate))
   
  }
  console.log('errors',errors)
  return (
    <ThemeProvider theme={theme}>
       <Header/>
      <Grid  container component="main" sx={{ height: '100vh', }} >
      
        <Grid item  xs={12} sm={12} md={12} component={Paper} sx={{display: 'flex'}}>
        <Box xs={12} sm={7} md={5}
            sx={{
              height: '60vh',
              width:'50vh',
              my: 3,
              mx: 3,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              marginLeft: '120px',
              marginTop: '110px',
              justifyContent: 'center',
            }}
          >
          <AvatarUI icon={<LockOutlinedIcon />}/>
            <h1 style={{ borderBottom: 'none' }}> Sign in</h1> 
            <Box component="form" noValidate sx={{ mt: 1 }} onSubmit={onSubmit} >
            <InputField 
               variant='filled' 
               name="email" 
               label="Email Adress" 
               type="text"  
               onChangeHandler={onChangeHandler} 
               autoFocus="autofocus" 
               errors={errors? errors.email:null}>
            </InputField>
            <InputField
                variant='filled' 
                name="password" 
                label="Password" 
                type="password"  
                onChangeHandler={onChangeHandler} 
                errors={errors?errors.password:null}>
            </InputField>
            
              <ButtonSubmit 
                  type="submit" 
                  style={btStyle} 
                  variant="contained" 
                  title="Login">
              </ButtonSubmit>
              <Grid container>
                <Grid item xs>
                 <Typography> 
                <Link href="/resetpassword" >
                    Forgot password?
                  </Link>
                  </Typography> 
                </Grid>
                <Grid item>
                
                </Grid>
              </Grid>
              <CopyRights sx={{ mt: 5 }} />
            </Box>
          </Box>
          <Box
        sx={{
          height: '55vh',
          width:'55vh',
          marginLeft:'350px',
          marginTop: '150px',
          backgroundImage: `url(${Lockk})`,
          backgroundSize: 'cover',
          
        }}>
        </Box>
        </Grid>
       
      </Grid>
      <BackdropItem open={isLoading}></BackdropItem>
    </ThemeProvider>
    
  );
}