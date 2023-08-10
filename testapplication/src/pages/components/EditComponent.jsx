import React,{ useState,useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import {Grid,Paper}from '@mui/material'
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import Box from '@mui/material/Box';
import { GetSubCategories } from '../../redux/actions/subcategActions';
import { GetParams } from '../../redux/actions/paramAction';

import ButtonSubmit from '../../components/ButtonSubmit';
import AvatarUI from '../../components/AvatarUI';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Title from '../../components/Title';
import InputField from '../../components/InputField';
import { UpdateAction,GetAction } from '../../redux/actions/componentAction';

const EditComponent=({id,onClose})=> {
  console.log('iddd',id)
     const dispatch =useDispatch()
     const {component}=useSelector((state)=>state.components)
     const [form,setForm]=useState({})
     const onChangeHandler=(e)=>{
      setForm({
       ...form,[e.target.name]:e.target.value
      })
      }
     const onSubmit=(e)=>{
       e.preventDefault()
       console.log('submit ', form)
       dispatch(UpdateAction(form,id))
       onClose()
     }
     useEffect(() => {
        dispatch(GetAction(id));
        dispatch(GetSubCategories());
        dispatch(GetParams())
      }, []);
      useEffect(() => {
        if(component){
          setForm({...component})
        }
        }, [component]);
       //<-------------------------styling------------------------------------->
    const theme = createTheme();
    const btStyle={ margin:'0px 0',backgroundColor:'#1e81b0'}
    return (
        <React.Fragment>
        <div>
    </div>
      <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh',width:'300px' }}>
      <Grid item xs={12} sm={8} md={12} component={Paper}  square>
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
           <AvatarUI icon={<PersonAddIcon/>} sx={{ m: 1, bgcolor: 'secondary.main' }}/>
           <Title title="Edit action" ></Title>
           </Grid>
           <Box component="form" noValidate sx={{ mt: 1 }} onSubmit={onSubmit}>
           <h6>Name</h6>
           <InputField variant="standard" value={form.name} name="name" type="text" onChangeHandler={onChangeHandler} autoFocus="autofocus"/>
           <h6 style={{marginTop:'15px'}}>Code</h6>
           <textarea style={{ minWidth: 250,marginTop:'15px' }} rows={4} cols={30} value={form.code} name="code" onChange={onChangeHandler}/>
            
           <Box sx={{ my: 3,
            py:3,
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


export default EditComponent
