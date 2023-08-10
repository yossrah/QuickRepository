import React,{useState,useEffect} from 'react'
import { useDispatch ,useSelector} from 'react-redux';
import {Grid, Paper}from '@mui/material'
import Box from '@mui/material/Box';import { createTheme, ThemeProvider } from '@mui/material/styles';
import InputField from '../../components/InputField';
import ButtonSubmit from '../../components/ButtonSubmit';
import { CreateFlow } from '../../redux/actions/flowActions';
import {IconButton} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import FaceIcon from '@mui/icons-material/Face';
const theme = createTheme();
const AddFlow=({nodeList,edgeList,onClose,handleWorkflow})=> {
console.log('nodeList',nodeList)
const dispatch=useDispatch()
const {user}=useSelector(state=>state.auth)
const [form,setForm]=useState({})

  const onChangeHandler=(e)=>{
   setForm({
    ...form,[e.target.name]:e.target.value
   })
   }
   useEffect(() => {
    if(user){
      setForm((prevForm)=>({ ...prevForm, author: user.id }))//mettre avec edgeList
      // GetParams(dragnode.param)
    }
    }, [user]);
    useEffect(() => {
        if(nodeList){
          setForm((prevForm)=>({...prevForm,nodesList:nodeList}))
          // GetParams(dragnode.param)
        }
        }, [nodeList]);
    useEffect(() => {
          if(edgeList){
            setForm((prevForm)=>({ ...prevForm,edgeList: edgeList }))
          }
          }, [edgeList]);
  const onSubmit=(e)=>{
    e.preventDefault()
    dispatch(CreateFlow(form))
    onClose()
  }
  console.log('form',form)
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
        }}
          >
          <Box component="form" noValidate sx={{ mt: 1 }} onSubmit={onSubmit} >
          <h5>Save workflow</h5>
          <Stack direction="row" spacing={2} alignItems="center" mb={2}>
        Owner : <Chip icon={<FaceIcon />} label={user.email}/>
       </Stack>
          <div style={{marginTop:'10px'}}>Workflow name :</div>
             <InputField  name="name"
              variant="standard"  type="text"  onChangeHandler={onChangeHandler} autoFocus="autofocus" >
              </InputField>
              <div style={{marginTop:'10px'}}>Task (short description) :</div>
              <InputField  name="task"
              variant="standard" type="text"  onChangeHandler={onChangeHandler} autoFocus="autofocus" >
              </InputField>
             <Box sx={{ my: 3,
                py:3,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',}}>
                <ButtonSubmit type="submit" variant="contained" title="Save"></ButtonSubmit>
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

export default AddFlow
