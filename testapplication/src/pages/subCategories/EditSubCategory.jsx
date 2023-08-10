import React,{ useState,useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import {Grid,Paper}from '@mui/material'
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import ButtonSubmit from '../../components/ButtonSubmit';
import AvatarUI from '../../components/AvatarUI';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Title from '../../components/Title';
import InputField from '../../components/InputField';
import { UpdateSubCategory,GetSubCategory } from '../../redux/actions/subcategActions';
const EditSubCategory=({id,onClose})=> {
  console.log('iddd',id)
     const dispatch =useDispatch()
   
     const {subcategory}=useSelector((state)=>state.souscategories)
     const [form,setForm]=useState({})
     const onChangeHandler=(e)=>{
      setForm({
       ...form,[e.target.name]:e.target.value
      })
      }
     const onSubmit=(e)=>{
       e.preventDefault()
       console.log('submit ', form)
       dispatch(UpdateSubCategory(form,id))
       onClose()
     }
     useEffect(() => {
        dispatch(GetSubCategory(id));
      }, []);
      useEffect(() => {
        if(subcategory){
          setForm({...subcategory})
        }
        }, [subcategory]);
       //<-------------------------styling------------------------------------->
    const theme = createTheme();
    const btStyle={ margin:'0px 0',backgroundColor:'#1e81b0'}
    return (
        <React.Fragment>
        <div>
    </div>
      <ThemeProvider theme={theme}>
      <Grid elevation={10} container component="main" sx={{ height: '70vh' }}>
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
           <Title title="Edit Category" ></Title>
           </Grid>
           <Box component="form" noValidate sx={{ mt: 1 }} onSubmit={onSubmit}>
           <InputField variant="standard" value={form.name} name="name" type="text"  onChangeHandler={onChangeHandler} autoFocus="autofocus"/>
           <Box sx={{ minWidth: 120 }}>
               <FormControl fullWidth variant="standard">
               </FormControl>
           </Box>
           <ButtonSubmit type="submit" style={btStyle} variant="contained" title="Update"></ButtonSubmit>
        </Box>
           </Box>
           </Grid>
      </Grid>
       </ThemeProvider>
      </React.Fragment>
  )
}


export default EditSubCategory
