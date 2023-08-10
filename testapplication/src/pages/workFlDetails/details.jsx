import React,{ useState,useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import {Grid,Paper}from '@mui/material'
import DescriptionIcon from '@mui/icons-material/Description';
import Box from '@mui/material/Box';
import ButtonSubmit from '../../components/ButtonSubmit';
import AvatarUI from '../../components/AvatarUI';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Title from '../../components/Title';
import CloseIcon from '@mui/icons-material/Close';
import { UpdateFlow } from '../../redux/actions/flowActions';
import {IconButton} from '@mui/material';
import InputField from '../../components/InputField';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import FaceIcon from '@mui/icons-material/Face';
import { useNavigate } from 'react-router-dom';
const Details=({onClose,id})=> {
  const navigate= useNavigate()
     const dispatch =useDispatch()
     const {flow}=useSelector((state)=>state.flows)
     const [form,setForm]=useState({})
     const onChangeHandler=(e)=>{
      setForm({
       ...form,[e.target.name]:e.target.value
      })
      }
      const onSubmit=(e)=>{
        e.preventDefault()
        console.log('submit ', form)
        dispatch(UpdateFlow(form,flow._id,navigate))
        
        onClose()
      }
      
      useEffect(() => {
        if(flow){
          setForm({...flow})
        }
        }, [flow]);
       
       //<-------------------------styling------------------------------------->
    const theme = createTheme();
    const btStyle={ marginTop:'10px ',backgroundColor:'#1e81b0'}
    return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
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
           <AvatarUI icon={<DescriptionIcon/>} sx={{ m: 1, bgcolor: 'secondary.main' }}/>
           <Title title="Workflow details" ></Title>
           </Grid>
           <Box component="form" noValidate sx={{ mt: 1 }} onSubmit={onSubmit}>
           <Stack direction="row" spacing={2} alignItems="center" mb={2}>
            Owner : <Chip icon={<FaceIcon />} label={form.author?.email}/>
          </Stack>
          <h6>Workflow</h6>
           <InputField value={form.name} name="name" 
           variant='filled'   type="text"  onChangeHandler={onChangeHandler} autoFocus="autofocus" >
              </InputField>
              <h6>Task :</h6>
              <InputField value={form.task} name="task"
              variant='filled' type="text"  onChangeHandler={onChangeHandler} autoFocus="autofocus" >
              </InputField>
              <h6>Node List:</h6>
              {form.nodesList?.map((node, index) => (
                <div key={index}>
                  <p>{node.data?.name}  {node.data?.icon?<img src={`http://localhost:3001/uploads/${node.data.icon}`} alt="Category Image" style={{ width: '20px', height: '20px' }}/>:null}</p>
                  
                </div>
              ))}
           <Box sx={{ my: 2,py:2,display: 'flex',flexDirection: 'column',alignItems: 'center',}}>
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
export default Details
