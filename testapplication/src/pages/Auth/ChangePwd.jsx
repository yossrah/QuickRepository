import React, { useState } from 'react';
import { connect } from 'react-redux';
import Swal from 'sweetalert2';
import { changePassword } from '../../redux/actions/authActions';
import { useParams ,useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Grid,Paper}from '@mui/material'
import LockPersonIcon from '@mui/icons-material/LockPerson';
import DataSaverOffIcon from '@mui/icons-material/DataSaverOff';
import Box from '@mui/material/Box';import { createTheme, ThemeProvider } from '@mui/material/styles';
import Lockk from '../../images/Resetpass.png'
import Title from '../../components/Title';
import InputField from '../../components/InputField';
import ButtonSubmit from '../../components/ButtonSubmit';
import AvatarUI from '../../components/AvatarUI';
import BackdropItem from '../../components/controls/BackdropItem';
import CopyRights from '../../components/controls/CopyRights';
import Header from '../antDesign/Header/Header';
import { btStyle } from '../../components/Styles';
const theme = createTheme();        
const ChangePwd = ({ changePassword }) => {
  const {isLoading}=useSelector(state=>state.auth)
  const { token } = useParams();
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: '',
  });
  const [netoken, setToken] = useState(token);

  const { password, confirmPassword } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const navigate=useNavigate()
  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      Swal.fire({
        title: 'Error!',
        text: 'Passwords do not match',
        icon: 'error',
        confirmButtonText: 'Ok'
      })
    } else {
      changePassword(formData, netoken,navigate);
      setFormData({ password: '', confirmPassword: '' });
      setToken('');
    }
  };

  return (
   <React.Fragment>
    <ThemeProvider theme={theme}>
    <Header/>
      <Grid  container component="main" sx={{ height: '100vh', }}>
      
       <Grid item  xs={12} sm={12} md={12} component={Paper} sx={{display: 'flex'}}>
       
       <Box
         xs={12}
         sm={7}
         md={5}
         sx={{
           height: '60vh',
           width:'50vh',
           my: 3,
           mx: 3,
           display: 'flex',
           flexDirection: 'column',
           alignItems: 'center',
           marginLeft: '120px',
           marginTop: '120px',
           justifyContent: 'center',
         }}
          >
          <AvatarUI icon={<LockPersonIcon/>} sx={{ m: 1, bgcolor: 'secondary.main' }}/>
            <Title title="Create a new password" caption={"Please enter new password."}></Title>
            <Box component="form" noValidate sx={{ mt: 1 }} onSubmit={handleSubmit} >
            <InputField 
              variant='filled' 
              name="password" 
              label="Password" 
              type="password"  
              onChangeHandler={handleChange} >
            </InputField>
           <InputField
              variant='filled'  
              name="confirmPassword" 
              label="Confirm" 
              type="password"  
              onChangeHandler={handleChange} >
           </InputField>
           <ButtonSubmit 
              type="submit" 
              variant="contained" 
              style={btStyle} 
              title="Save password"
              endIcon={<DataSaverOffIcon />} >
            </ButtonSubmit>
            <CopyRights sx={{ mt: 5 }} />
          </Box>
          </Box>
          <Box
       xs={0}
         sm={5}
         md={4}
       sx={{
         height: '65vh',
         width:'65vh',
         marginLeft:'150px',
         marginTop: '120px',
         backgroundImage: `url(${Lockk})`,
         backgroundSize: 'cover',
        }}>
       </Box>  
      </Grid>
      </Grid>
      <BackdropItem ></BackdropItem>
  </ThemeProvider>
  <BackdropItem open={isLoading}></BackdropItem>
  </React.Fragment>
  );
};

export default connect(null, { changePassword })(ChangePwd);