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
import { GetNode,UpdateNode } from '../../redux/actions/nodeActions';
import {IconButton} from '@mui/material';
const EditNode=({size,onClose,id})=> {
     const dispatch =useDispatch()
     const {node}=useSelector((state)=>state.nodes)
     const [form,setForm]=useState({})
     const onChangeHandler=(e)=>{
      setForm({
       ...form,[e.target.name]:e.target.value
      })
      }
      const onSubmit=(e)=>{
        e.preventDefault()
        console.log('submit ', form)
        dispatch(UpdateNode(form,size))
        onClose()
      }
     useEffect(() => {
        dispatch(GetNode(size));
      }, []);
      useEffect(() => {
        if(node){
          setForm({...node})
        }
        }, [node]);
       //<-------------------------styling------------------------------------->
    const theme = createTheme();
    const btStyle={ marginTop:'10px ',backgroundColor:'#1e81b0'}
    return (
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
           <Grid align='center'>
           <AvatarUI icon={<DescriptionIcon/>} sx={{ m: 1, bgcolor: 'secondary.main' }}/>
           <Title title="Documentation" ></Title>
           </Grid>
           <Box component="form" noValidate sx={{ mt: 1 }} onSubmit={onSubmit}>
           <h6>Programing Language : Java</h6>
           <div>Code</div>
           <textarea
  style={{ minWidth: 300 }}
  rows={4}
  cols={30}
  value={form.code}
  name="code"
  onChange={onChangeHandler}
/>
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
export default EditNode
