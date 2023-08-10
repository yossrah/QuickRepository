import React,{ useState,useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { Registration } from "../../redux/actions/authActions";
import { GetRoles } from '../../redux/actions/roleActions';
import { useNavigate } from "react-router-dom";
import {Grid,Paper}from '@mui/material'
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import Box from '@mui/material/Box';
import ButtonSubmit from '../../components/ButtonSubmit';
import AvatarUI from '../../components/AvatarUI';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Lockk from '../../images/signup.jpg'
import Title from '../../components/Title';
import InputField from '../../components/InputField';
import SelectField from '../../components/SelectField';
import { btStyle } from '../../components/Styles';
const Register=()=> {
  const {rolesuser}=useSelector(state=>state.roles)
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
    e.preventDefault()//pourque les paramétres ne s'affichent pas dans l'url en cliquant submit
    dispatch(Registration(form,navigate))
  }

  useEffect(() => {
    dispatch(GetRoles())}, [dispatch]);
    // console.log('Roles',roles.rolesuser)
    //<-------------------------styling------------------------------------->
    const theme = createTheme();
    
    return (
      <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh', }}>
       <Grid item  xs={12} sm={12} md={12} component={Paper} sx={{display: 'flex'}} square>
         <Box
         xs={12}
         sm={7}
         md={5}
         sx={{
           height: '60vh',
           width:'60vh',
           my: 3,
           mx: 3,
           display: 'flex',
           flexDirection: 'column',
           alignItems: 'center',
           marginLeft: '120px',
           marginTop: '150px',
           justifyContent: 'center',
         }}
          >
          <AvatarUI icon={<PersonAddIcon/>} />
           <Title title="Register a member" ></Title>
           <Box component="form" noValidate onSubmit={onSubmit}>
           <InputField variant='standard' name="name" label="Name" type="text"  onChangeHandler={onChangeHandler} autoFocus="autofocus" errors={errors.name}/>
           <InputField variant='standard' name="lastname" label="Lastname" type="text"  onChangeHandler={onChangeHandler} errors={errors.lastname}/>
           <InputField variant='standard' name="phone" label="Phone" type="text"  onChangeHandler={onChangeHandler} errors={errors.phone}/>
           <InputField variant='standard' name="email" label="Email Adress" type="text"  onChangeHandler={onChangeHandler} errors={errors.email}/>
           <InputField variant='standard' name="password" label="Password" type="password"  onChangeHandler={onChangeHandler} errors={errors.password}></InputField>
           <InputField variant='standard' name="confirm" label="Confirm" type="password"  onChangeHandler={onChangeHandler} errors={errors.confirm}></InputField>
           <Box sx={{ minWidth: 100 }}>
            
               <SelectField roles={rolesuser} title={"Role"} name={"roleId"} label={"Role"}
               onChangeHandler={onChangeHandler}>
               </SelectField>
            </Box>
            <ButtonSubmit type="submit" style={btStyle} variant="contained" title="Register"></ButtonSubmit>
           </Box>
           </Box>
           <Box
        sx={{
          height: '70vh',
          width:'70vh',
          marginLeft:'200px',
          marginTop: '150px',
          backgroundImage: `url(${Lockk})`,
          backgroundSize: 'cover',
          
        }}>
        </Box>
        </Grid>
      </Grid>
      </ThemeProvider>
  )
}

export default Register
