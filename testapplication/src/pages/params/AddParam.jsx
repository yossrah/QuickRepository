import React,{useState,} from 'react'
import { useDispatch ,useSelector} from 'react-redux';
import {Grid,Paper, }from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Title from '../../components/Title';
import InputField from '../../components/InputField';
import ButtonSubmit from '../../components/ButtonSubmit';
import AvatarUI from '../../components/AvatarUI';
import { useNavigate } from 'react-router-dom'
import { CreateParam } from '../../redux/actions/paramAction';
import {IconButton} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
const theme = createTheme();
const btStyle={ margin:'20px 0',backgroundColor:'#1e81b0'}
const AddParam=({onClose})=> {
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
    dispatch(CreateParam(form,navigate))
    onClose()
    
  }
  console.log('form',form)
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
        }}
          >
           <Grid align='center'>
           <AvatarUI icon={<AddIcon/>} sx={{ m: 1, bgcolor: 'secondary.main' }}/>
           <Title title="Save parameter"></Title>
          </Grid>
           <Box component="form" noValidate sx={{ mt: 1 }} onSubmit={onSubmit}>
           <InputField variant="standard" name="nom" label="Param name" type="text"  onChangeHandler={onChangeHandler} 
            autoFocus="autofocus" errors={errors.nom} ></InputField>
            <InputField variant="standard" name="value" label="default Value" type="text"  onChangeHandler={onChangeHandler}  errors={errors.nom} ></InputField>
            <Box sx={{ my: 2,py:2,display: 'flex',flexDirection: 'column',alignItems: 'center',}}>
               <ButtonSubmit type="submit" style={btStyle} variant="contained" title="Create"></ButtonSubmit>
               <ButtonSubmit type="reset" style={btStyle} variant="contained" title="Reset"></ButtonSubmit>
           </Box>
           </Box>
           </Box>
           </Grid>
       </Grid>
       </ThemeProvider>
    </React.Fragment>
  )
}

export default AddParam
