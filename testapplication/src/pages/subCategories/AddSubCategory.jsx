import React,{useState,useEffect} from 'react'
import { useDispatch ,useSelector} from 'react-redux';
import {Grid,Paper, }from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import Box from '@mui/material/Box';import { createTheme, ThemeProvider } from '@mui/material/styles';
import Title from '../../components/Title';
import InputField from '../../components/InputField';
import ButtonSubmit from '../../components/ButtonSubmit';
import AvatarUI from '../../components/AvatarUI';
import { useNavigate } from 'react-router-dom'
import { CreateSubCategory } from '../../redux/actions/subcategActions';
import { GetCategories } from '../../redux/actions/categoryAction';
import SelectField from '../../components/SelectField';
const theme = createTheme();
const AddSubCategory=({onClose})=> {
  const [form,setForm]=useState({})
  const errors=useSelector((state)=>state.errors)
  const categorie=useSelector(state=>state.categorie)
  const {categories}=useSelector(state=>state.categorie)
  const navigate=useNavigate()
  const dispatch=useDispatch()
  const onChangeHandler=(e)=>{
   setForm({
    ...form,[e.target.name]:e.target.value
   })}
  const onSubmit=(e)=>{
    e.preventDefault()
    dispatch(CreateSubCategory(form,navigate))
    onClose()}
  useEffect(() => {
    dispatch(GetCategories())}, [dispatch]);
  return  ( //sx={{ height: '100vh' }}
    <React.Fragment>
    <ThemeProvider theme={theme}>
      <Grid  container component="main" sx={{ height: '100vh' }}>
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
           <Title title="Create a new sub category"></Title>
           </Grid>
           <Box component="form" noValidate sx={{ mt: 1 }} onSubmit={onSubmit} >
           <InputField variant='standard' name="name" label="Sub Category" type="text" onChangeHandler={onChangeHandler} autoFocus="autofocus" errors={errors.name} >
           </InputField>
           <Box sx={{ minWidth: 120 }}>
               <SelectField roles={categories} title={"enter Category"} name={"categorieId"} onChangeHandler={onChangeHandler} label={"Category"}> </SelectField>
           </Box>
           <Box sx={{ my: 4,
            py:4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',}}>
           <ButtonSubmit type="submit" variant="contained" title="Create"></ButtonSubmit>
           <ButtonSubmit type="reset" variant="contained" title="Reset"></ButtonSubmit>
           </Box>
           </Box>
           </Box>
           </Grid>
       </Grid>
       </ThemeProvider>
    </React.Fragment>
  )
}





export default AddSubCategory
