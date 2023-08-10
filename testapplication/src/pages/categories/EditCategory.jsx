import React,{ useState,useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import {Grid,Paper}from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import ButtonSubmit from '../../components/ButtonSubmit';
import AvatarUI from '../../components/AvatarUI';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Title from '../../components/Title';
import InputField from '../../components/InputField';
import { UpdateCategory, GetCategory } from '../../redux/actions/categoryAction';
const EditCategory=({id,onClose})=> {
  // console.log('iddd',id)
     const dispatch =useDispatch()
   
     const {category}=useSelector((state)=>state.categorie)
     const [form,setForm]=useState({})
     const onChangeHandler=(e)=>{
      setForm({
       ...form,[e.target.name]:e.target.value
      })
      }
     const onSubmit=(e)=>{
       e.preventDefault()
       console.log('submit ', form)
       dispatch(UpdateCategory(form,id))
       onClose()
     }
     useEffect(() => {
        dispatch(GetCategory(id));
      }, []);
      useEffect(() => {
        if(category){
          setForm({...category})
        }
        }, [category]);
       //<-------------------------styling------------------------------------->
    const theme = createTheme();
    const btStyle={ margin:'0px 0',backgroundColor:'#1e81b0'}
    return (
    <React.Fragment>
        
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
           <AvatarUI icon={<AddIcon/>} sx={{ m: 1, bgcolor: 'secondary.main' }}/>
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
export default EditCategory
