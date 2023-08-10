import React,{useState,useEffect} from 'react'
import { useDispatch ,useSelector} from 'react-redux';
import { UpdateProfile,GetProfile } from '../../redux/actions/userAction';
import { useParams } from 'react-router-dom';
import {Grid,Paper}from '@mui/material'
import Box from '@mui/material/Box';
import ButtonSubmit from '../../components/ButtonSubmit';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Title from '../../components/Title';
import InputField from '../../components/InputField';
import Avatar from '@mui/material/Avatar';
import {deepPurple } from '@mui/material/colors';
import BackdropItem from '../../components/controls/BackdropItem';
const theme = createTheme();
const btStyle={ margin:'20px 0',backgroundColor:'#1e81b0'}
   
const EditProfil=()=> {
  //<-----------------------------------------Backdrop-------------------------------------------------------->
  const {loading}=useSelector(state=>state.users)
 
//<-----------------------------------------Backdrop-------------------------------------------------------->
 
    const dispatch=useDispatch()
    const {id}=useParams()
    const {profile}=useSelector((state)=>state.users)
    const errors=useSelector((state)=>state.errors)
    const [form,setForm]=useState({})
    const onChangeHandler=(e)=>{
   setForm({
    ...form,[e.target.name]:e.target.value
   })
   console.log('frommmmmmm',form)

  }
  
  useEffect(() => {
    dispatch(GetProfile());
    
  }, [id]);
  useEffect(() => {
    if(profile){
      setForm({...profile})
    }
  }, [profile]);
  const onSubmit=(e)=>{
    
    e.preventDefault()
    console.log('submit ', form)
    dispatch(UpdateProfile(form,id))
  }
  console.log('userrr',profile)
  return (
    <React.Fragment>
    <ThemeProvider theme={theme}>
    <Grid container component="main" sx={{ height: '80vh',width:'70vh',marginLeft:'350px ',marginTop:'20px ' }}  >
       <Grid item xs={12} sm={8} md={12} component={Paper} style={{borderRadius:'20px'}}  square>
         <Box
            sx={{
              my: 4,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }} 
          >
         <Grid align='center' >
         <Avatar sx={{ bgcolor: deepPurple[500],width: 50,
          height: 50, }}></Avatar>
         <Title title={form.name}  ></Title>
         </Grid>
         <Box component="form"  noValidate sx={{ mt: 1 }} onSubmit={onSubmit}>
         <InputField value={form.name} name="name"  type="text"  onChangeHandler={onChangeHandler} autoFocus="autofocus" errors={errors.name}/>
         <InputField value={form.lastname} name="lastname"  type="text"  onChangeHandler={onChangeHandler} errors={errors.lastname}/>
         <InputField value={form.phone} name="phone"  type="text"  onChangeHandler={onChangeHandler} errors={errors.phone}/>
         <InputField value={form.email} name="email"  type="text"  onChangeHandler={onChangeHandler} errors={errors.email}/>
         <ButtonSubmit type="submit" style={btStyle} variant="contained" title="Update"></ButtonSubmit>
         </Box>
         </Box>
         </Grid>
     
    </Grid>
     
    </ThemeProvider>
    <BackdropItem open={loading}></BackdropItem>
  </React.Fragment>
  )
}

export default EditProfil
