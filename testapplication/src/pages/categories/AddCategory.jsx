import React,{useState} from 'react'
import { useDispatch ,useSelector} from 'react-redux';
import {Grid,Paper, }from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import Box from '@mui/material/Box';import { createTheme, ThemeProvider } from '@mui/material/styles';
import Title from '../../components/Title';
import InputField from '../../components/InputField';
import ButtonSubmit from '../../components/ButtonSubmit';
import CloseIcon from '@mui/icons-material/Close';
import {IconButton} from '@mui/material';
import AvatarUI from '../../components/AvatarUI';
import { useNavigate } from 'react-router-dom'
import { CreateCategory } from '../../redux/actions/categoryAction';
import { btStyleWithMargin } from '../../components/Styles';
const theme = createTheme();

const AddCategory=({onClose})=> {
  const [form,setForm]=useState({})
  const errors=useSelector((state)=>state.errors)
  const navigate=useNavigate()
  const dispatch=useDispatch()
  const onChangeHandler=(e)=>{
   setForm({
    ...form,[e.target.name]:e.target.value
   })

  }
  const onSubmit=(e)=>{
    e.preventDefault()
    dispatch(CreateCategory(form,navigate))
    onClose()
  }
  return  ( //sx={{ height: '100vh' }}
    <React.Fragment>
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh',width:'300px' }}>
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
           <AvatarUI icon={<AddIcon/>} sx={{ m: 1, bgcolor: 'secondary.main' }}/>
           <Title title="New category"></Title>
          </Grid>
           <Box component="form" noValidate sx={{ mt: 1 }} onSubmit={onSubmit}>
             <InputField  
              name="name" label="Category" type="text" 
              variant='standard' 
              onChangeHandler={onChangeHandler}  
              autoFocus="autofocus" errors={errors? errors.name:null} >
             </InputField>
            <ButtonSubmit type="submit" style={btStyleWithMargin} variant="contained" title="Save"></ButtonSubmit>
            <ButtonSubmit type="reset" style={btStyleWithMargin}  variant="contained" title="Reset"></ButtonSubmit>
           </Box>
          </Box>
        </Grid>
        </Grid>
       
      </ThemeProvider>
    </React.Fragment>
  )
}

export default AddCategory

