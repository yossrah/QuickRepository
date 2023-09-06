import React,{useState,useEffect} from 'react'
import { useDispatch ,useSelector} from 'react-redux';
import {Grid,Paper, }from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import Box from '@mui/material/Box';import { createTheme, ThemeProvider } from '@mui/material/styles';
import Title from '../../components/Title';
import InputField from '../../components/InputField';
import SelectField from '../../components/SelectField';
import ButtonSubmit from '../../components/ButtonSubmit';
import AvatarUI from '../../components/AvatarUI';
import { useNavigate } from 'react-router-dom'
import { CreateAction } from '../../redux/actions/componentAction';
import { GetCategories } from '../../redux/actions/categoryAction';
import { GetParams } from '../../redux/actions/paramAction';
import MultiSelect from '../../components/MultiSelector';
import CloseIcon from '@mui/icons-material/Close';
import {IconButton} from '@mui/material';
import { btStyleWithMargin } from '../../components/Styles';
const theme = createTheme();
const AddComponent=({onClose})=> {
  const [form,setForm]=useState({})
  const [file,setFile]=useState(null)
  const errors=useSelector((state)=>state.errors)
  const {categories}=useSelector(state=>state.categorie)
  const {params}=useSelector(state=>state.params)
  const navigate=useNavigate()
  const dispatch=useDispatch()
  const onChangeHandler=(e)=>{
   setForm({
    ...form,[e.target.name]:e.target.value
   })
}
  const onChangeImage=(e)=>{
    setFile(
    e.target.files[0]
    )}
    // console.log('fooooooorm',form)
  useEffect(() => {
    dispatch(GetCategories())
    dispatch(GetParams()) }, []);
  const onSubmit=(e)=>{
    e.preventDefault()
    const formData = new FormData();
    formData.append('name', form.name);
    formData.append('code', form.code);
    formData.append('categorieId', form.categorieId);
    if (form.param) {
      // formData.append('param', form.param);
      for (const paramValue of form.param) {
        formData.append('param', paramValue);
      }
    }  
    formData.append('type', form.type);
    formData.append('icon', file);
    // console.log('formData',formData)
    dispatch(CreateAction(formData,navigate))
    onClose()
    
  }
  return  ( 
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
     }}>
           <Grid align='center'>
           <AvatarUI icon={<AddIcon/>} sx={{ m: 1, bgcolor: 'secondary.main' }}/>
           <Title title="Save new Action"></Title>
           </Grid>
           <Box component="form" noValidate sx={{ mt: 1 }} onSubmit={onSubmit}>
           <InputField variant='standard' name="name" label="Name" type="text" onChangeHandler={onChangeHandler} 
            autoFocus="autofocus" errors={errors.name} ></InputField>
            <div style={{marginTop:'15px'}}>Code *</div>
            <textarea style={{ minWidth: 250,marginTop:'15px' }} rows={4} cols={30} name="code" onChange={onChangeHandler}/>
            <InputField variant='standard' name="type" label="Type" type="text"  onChangeHandler={onChangeHandler} 
            ></InputField>
            <InputField name="icon" variant='standard' label="Select icon" onChangeHandler={onChangeImage} type="file"></InputField>
            <Box sx={{ minWidth: 120 }}>
            <SelectField roles={categories} title={"Select category"} name={"categorieId"} onChangeHandler={onChangeHandler} />
            <MultiSelect params={params} name={"param"} onChangeHandler={onChangeHandler}></MultiSelect>
            </Box>
           <Box sx={{ my: 4,
            py:4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',}}>
           <ButtonSubmit style={btStyleWithMargin} type="submit" variant="contained" title="Create"></ButtonSubmit>
           <ButtonSubmit style={btStyleWithMargin} type="reset" variant="contained" title="Reset"></ButtonSubmit>
           </Box>
           </Box>
           </Box>
           </Grid>
       </Grid>
       </ThemeProvider>
    </React.Fragment>
  )
}

export default AddComponent
