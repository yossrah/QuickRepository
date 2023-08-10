import React,{useEffect,useState} from 'react'
import SendIcon from '@mui/icons-material/Send';
import AvatarUI from '../../components/AvatarUI';
import { useDispatch ,useSelector} from 'react-redux';
import {Grid,Paper,IconButton }from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';
import Box from '@mui/material/Box';import { createTheme, ThemeProvider } from '@mui/material/styles';
import Title from '../../components/Title';
import InputField from '../../components/InputField';
import FormControl from '@mui/material/FormControl';
import ButtonSubmit from '../../components/ButtonSubmit';
import { sendCode } from '../../redux/actions/flowActions';
const theme = createTheme();
const btStyle={ margin:'20px 0',backgroundColor:'#1e81b0'}
function ShareCode({onClose,codeValue}) {
    const [form,setForm]=useState({})
    const {user}=useSelector(state=>state.auth)
  const dispatch=useDispatch()
  const onChangeHandler=(e)=>{
   setForm({
    ...form,[e.target.name]:e.target.value
   })

  }
  const onSubmit=(e)=>{
    e.preventDefault()
    setForm((prevForm)=>({ ...prevForm, sender: user.email }))
    setForm((prevForm)=>({ ...prevForm, code: codeValue }))
    dispatch(sendCode(form))
    onClose()
  }
  console.log('email',form)
  return (
    <>
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
      <Grid item xs={12} sm={8} md={12} component={Paper}  square>
      <IconButton onClick={()=>onClose()}>
      <CloseIcon/>
      </IconButton>
      <Box
      sx={{
       my: 8,
       mx: 4,
       display: 'flex',
       flexDirection: 'column',
       alignItems: 'center',
     }}>
          <Grid align='center'>
           <AvatarUI icon={<SendIcon/>} sx={{ m: 1, bgcolor: 'secondary.main' }}/>
           <Title title="Share code"></Title>
          </Grid>
           <Box component="form" noValidate sx={{ mt: 1 }} onSubmit={onSubmit}>
           <h6>Send to :</h6>
           <InputField  
           name="email" label="user" type="text" 
           variant='standard' 
           onChangeHandler={onChangeHandler}  autoFocus="autofocus" >
           </InputField>
           <Box sx={{ minWidth: 120 }}>
               <FormControl fullWidth variant="standard">
               </FormControl>
           </Box>
           <ButtonSubmit type="submit" style={btStyle} variant="contained" title="Send"></ButtonSubmit>
           <ButtonSubmit type="reset"  style={btStyle}  variant="contained" title="Reset"></ButtonSubmit>
           </Box>
           </Box>
          </Grid>
         </Grid>
       </ThemeProvider>
    </>
  )
}

export default ShareCode
