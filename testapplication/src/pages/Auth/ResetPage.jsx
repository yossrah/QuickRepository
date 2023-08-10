import React,{useState} from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { resetpwd } from '../../redux/actions/authActions';
import { useDispatch } from 'react-redux';
import {Grid,Paper, }from '@mui/material'
import PasswordIcon from '@mui/icons-material/Password';
import Box from '@mui/material/Box';import { createTheme, ThemeProvider } from '@mui/material/styles';
import Title from '../../components/Title';
import InputField from '../../components/InputField';
import SendIcon from '@mui/icons-material/Send';
import ButtonSubmit from '../../components/ButtonSubmit';
import AvatarUI from '../../components/AvatarUI';
import BackdropItem from '../../components/controls/BackdropItem';
import CopyRights from '../../components/controls/CopyRights';
import Header from '../antDesign/Header/Header';
const theme = createTheme();
const btStyle={ margin:'0px 0',backgroundColor:'#1e81b0'}
const ResetPage=()=> {
    const [email, setEmail] = useState('');
    const {isLoading}=useSelector(state=>state.auth)
    // const { token } = useParams();
    // console.log(token)
    const dispatch=useDispatch()
    const onChangeHandler=(e)=>{
      setEmail(e.target.value)
   }
    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(resetpwd(email));
      };
  return (
    <React.Fragment>
    <ThemeProvider theme={theme}>
    <Header/>
      <Grid elevation={10} container component="main"
       sx={{ height: '100vh',width:'60vh',margin:'auto', }}>
       <Grid item xs={12} sm={8} md={12} component={Paper} sx={{ border:'1px ',borderRadius: '10px'
        ,height: '60vh',width:'60vh',marginTop:'120px',boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.2)'  }}  >
         <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
          <AvatarUI icon={<PasswordIcon/>} />
           <Grid align='justify'>
           <Title  title="Forgot your password ?" 
           caption={"Well, that happens to everyone. Just type your email address and we’ll help you out."}>
           </Title>
           </Grid>
           <Box 
           component="form" 
           noValidate 
           sx={{ mt: 1 }} 
           onSubmit={handleSubmit} >
           <InputField  
           name="email" 
           label="Email Adress" 
           type="text"  
           onChangeHandler={onChangeHandler} 
           autoFocus="autofocus" >
           </InputField>
           <ButtonSubmit 
           type="submit" 
           variant="contained" 
           title="Reset Password"
           style={btStyle} 
           endIcon={<SendIcon />}>
           </ButtonSubmit>
           </Box>
           </Box>
           <Link to="/login" style={{marginLeft:'150px'}}>Sign in instead!</Link>
          </Grid>
          <div style={{marginLeft:'100px'}} >
          <CopyRights/>
          </div>
          </Grid>
         <BackdropItem open={isLoading}></BackdropItem>
      </ThemeProvider>
    </React.Fragment>
  ) 
}
export default connect(null)(ResetPage);

