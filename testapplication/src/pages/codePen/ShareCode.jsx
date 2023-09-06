import React,{useEffect,useState} from 'react'
import SendIcon from '@mui/icons-material/Send';
import AvatarUI from '../../components/AvatarUI';
import { useDispatch ,useSelector} from 'react-redux';
import {Grid,Paper,IconButton }from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';
import Box from '@mui/material/Box';import { createTheme, ThemeProvider } from '@mui/material/styles';
import Title from '../../components/Title';
import InputField from '../../components/InputField';
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
  useEffect(() => {
    if(codeValue){
      setForm((prevForm)=>({ ...prevForm, code: codeValue}))
    }
    }, [codeValue]);
  const onSubmit=(e)=>{
    e.preventDefault()
     setForm((prevForm)=>({ ...prevForm, sender: user.email }))
    dispatch(sendCode(form))
    onClose()
  }
  console.log('form',form)
  return (
    <>
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh',width:'350px' }}>
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
           <InputField  
           name="sender" label="sender" type="text" value={user.email}
           variant='standard' 
           onChangeHandler={onChangeHandler}  autoFocus="autofocus" >
           </InputField>
           <InputField  
           name="email" label="Send to" type="text" 
           variant='standard' 
           onChangeHandler={onChangeHandler}  autoFocus="autofocus" >
           </InputField>
           <textarea style={{ minWidth: 300,marginTop:'15px' }} value={codeValue} rows={4} cols={30} name="code" onChange={onChangeHandler}/>
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
