import React,{useState,useEffect} from 'react'
import { useDispatch ,useSelector} from 'react-redux';
import { GetParam,UpdateParam } from '../../redux/actions/paramAction';
import {Grid,Paper}from '@mui/material'
import Box from '@mui/material/Box';
import ButtonSubmit from '../../components/ButtonSubmit';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Title from '../../components/Title';
import InputField from '../../components/InputField';
import AddIcon from '@mui/icons-material/Add';
import AvatarUI from '../../components/AvatarUI';
import CloseIcon from '@mui/icons-material/Close';
import {IconButton} from '@mui/material';
const theme = createTheme();
const btStyle={ margin:'0px 0',backgroundColor:'#1e81b0'}
   
const EditParam=({id,onClose})=> {
   const dispatch=useDispatch()
   const {param}=useSelector((state)=>state.params)
    const errors=useSelector((state)=>state.errors)
    const [form,setForm]=useState({})
    const onChangeHandler=(e)=>{
   setForm({
    ...form,[e.target.name]:e.target.value
   })
   }
  useEffect(() => {
    dispatch(GetParam(id));
    }, [id]);
  useEffect(() => {
    if(param){
      setForm({...param})
    }
  }, [param]);
  const onSubmit=(e)=>{
    e.preventDefault()
    console.log('submit ', form)
    dispatch(UpdateParam(form,id))
    onClose()
  }
  return (
    <React.Fragment>
    <ThemeProvider theme={theme}>
    <Grid container component="main" sx={{ height: '100vh',width:'300px' }} >
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
         <AvatarUI icon={<AddIcon/>} sx={{ m: 1, bgcolor: 'secondary.main' }}></AvatarUI>
         <Title title={form.nom}  ></Title>
         </Grid>
         <Box component="form" noValidate sx={{ mt: 1 }} onSubmit={onSubmit}>
         <h6>Param :</h6>
         <InputField value={form.nom}  variant='standard' name="nom"  type="text"  onChangeHandler={onChangeHandler} autoFocus="autofocus" errors={errors.name}/>
         <h6>Default value :</h6>
         <InputField value={form.value}  variant='standard' name="value"  type="text"  onChangeHandler={onChangeHandler}  />
         <Box sx={{ my: 4,
          py:4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',}}>
         <ButtonSubmit type="submit" style={btStyle} variant="contained" title="Update"></ButtonSubmit>
         </Box>
         </Box>
         </Box>
         </Grid>
     </Grid>
     
    </ThemeProvider>

  </React.Fragment>
  )
}

export default EditParam
