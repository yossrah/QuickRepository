import React,{useState,} from 'react'
import { useDispatch ,useSelector} from 'react-redux';
import {Grid,Paper, }from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import Box from '@mui/material/Box';import { createTheme, ThemeProvider } from '@mui/material/styles';
import Title from '../../components/Title';
import InputField from '../../components/InputField';
import ButtonSubmit from '../../components/ButtonSubmit';
import AvatarUI from '../../components/AvatarUI';
import { useNavigate } from 'react-router-dom'
import { CreateRole } from '../../redux/actions/roleActions';
import CloseIcon from '@mui/icons-material/Close';
import {IconButton} from '@mui/material';
const theme = createTheme();
const btStyle={ margin:'20px 0',backgroundColor:'#1e81b0'}
const AddRole=({onClose})=> {
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
    dispatch(CreateRole(form,navigate))
    onClose()
    
  }
  
  return  ( //sx={{ height: '100vh' }}
    <React.Fragment>
    <ThemeProvider theme={theme}>
      <Grid  container component="main" sx={{ height: '100vh',width:'300px' }}>
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
            }}
          >
           <Grid align='center'>
           <AvatarUI icon={<AddIcon/>} />
           <Title title="Save new role"></Title>
           </Grid>
           <Box component="form" noValidate sx={{ mt: 1 }} onSubmit={onSubmit} >
           <InputField  name="nom" label="Role" type="text" variant='standard' onChangeHandler={onChangeHandler} 
            autoFocus="autofocus" errors={errors.nom} ></InputField>
           <Box sx={{ my: 4,
            py:4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',}}>
           <ButtonSubmit type="submit" style={btStyle} variant="contained" title="Create"></ButtonSubmit>
           <ButtonSubmit type="reset"  style={btStyle} variant="contained" title="Reset"></ButtonSubmit>
           </Box>
           </Box>
           </Box>
           </Grid>
       </Grid>
       </ThemeProvider>
    </React.Fragment>
  )
}

export default AddRole
