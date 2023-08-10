import React,{useState,useEffect} from 'react'
import { useDispatch ,useSelector} from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {GetProfileById,UpdateUser } from '../../redux/actions/userAction';
import { GetRoles } from '../../redux/actions/roleActions';
import { useParams } from 'react-router-dom';
import {Grid,Paper}from '@mui/material'
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import ButtonSubmit from '../../components/ButtonSubmit';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Title from '../../components/Title';
import InputField from '../../components/InputField';
import Avatar from '@mui/material/Avatar';
import BackdropItem from '../../components/controls/BackdropItem';
import {deepPurple } from '@mui/material/colors';
import SelectField from '../../components/SelectField';
const theme = createTheme();
const btStyle={ margin:'20px 0',backgroundColor:'#1e81b0'}
   
const UpdateUserAccount=()=> {
    const dispatch=useDispatch()
    const roles=useSelector(state=>state.roles)
    const {rolesuser}=useSelector(state=>state.roles)
    const {loading}=useSelector(state=>state.users)
    const {id}=useParams()
    const navigate=useNavigate()
    const profile=useSelector((state)=>state.users.profile)
    const errors=useSelector((state)=>state.errors)
    const [form,setForm]=useState({})
    const onChangeHandler=(e)=>{
      setForm({
      ...form,[e.target.name]:e.target.value
       })
    }
  useEffect(() => {
    
    dispatch(GetProfileById(id));
    dispatch(GetRoles()) }, [id]);
  useEffect(() => {
    if(profile){
      setForm({...profile})
    }
  }, [profile]);
  console.log('loading',loading)
  const onSubmit=(e)=>{
    e.preventDefault()
    console.log('submit ', form)
    dispatch(UpdateUser(form,id,navigate))
  }
  console.log('userrr',form)
  return (
    <React.Fragment>
    <ThemeProvider theme={theme}>
    <div style={{ 
     
      }}>
    <Grid  container component="main" sx={{ height: '80vh',width:'70vh',marginLeft:'350px ',marginTop:'20px ' }} >
       <Grid item xs={12} sm={8} md={12} component={Paper} style={{borderRadius:'20px'}} square>
         <Box
            sx={{
              my: 4,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
         <Grid align='center'>
         <Avatar sx={{ bgcolor: deepPurple[500],width: 50,
          height: 50, }}></Avatar>
         <Title title={form.name}  />
         </Grid>
         <Box component="form" noValidate sx={{ mt: 1 }} onSubmit={onSubmit}>
         <InputField value={form.name} name="name"  type="text"  onChangeHandler={onChangeHandler} autoFocus="autofocus" errors={errors.name}/>
         <InputField value={form.lastname} name="lastname"  type="text"  onChangeHandler={onChangeHandler} errors={errors.lastname}/>
         <InputField value={form.phone} name="phone"  type="text"  onChangeHandler={onChangeHandler} errors={errors.phone}/>
         <InputField value={form.email} name="email"  type="text"  onChangeHandler={onChangeHandler} errors={errors.email}/>
         <Box sx={{ minWidth: 10 }}>
               {form.roleId? 
                <InputLabel value={form.roleId} 
                id="demo-simple-select-label">
                {form.roleId.nom}
                </InputLabel> :null}
                <SelectField roles={rolesuser}  name={"roleId"} label={"Role"}
                onChangeHandler={onChangeHandler}>
                </SelectField>
           </Box>
           <ButtonSubmit type="submit" style={btStyle} variant="contained" title="Update"></ButtonSubmit>
         </Box>
         </Box>
         </Grid>
     
    </Grid>
    </div>
    </ThemeProvider>
    <BackdropItem open={loading}></BackdropItem>
  </React.Fragment>
  )
}

export default UpdateUserAccount
