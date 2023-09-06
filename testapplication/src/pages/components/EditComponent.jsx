import React,{ useState,useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import {Grid,Paper}from '@mui/material'
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import Box from '@mui/material/Box';
import { GetSubCategories } from '../../redux/actions/subcategActions';
import { GetParams } from '../../redux/actions/paramAction';
import CloseIcon from '@mui/icons-material/Close';
import {IconButton} from '@mui/material';
import ButtonSubmit from '../../components/ButtonSubmit';
import AvatarUI from '../../components/AvatarUI';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Title from '../../components/Title';
import InputField from '../../components/InputField';
import { UpdateAction,GetAction } from '../../redux/actions/componentAction';
import { btStyle } from '../../components/Styles';
const EditComponent=({id,onClose})=> {
  // console.log('iddd',id)
     const dispatch =useDispatch()
     const {component}=useSelector((state)=>state.components)
     const [form,setForm]=useState({})
     const [file,setFile]=useState(null)
     const onChangeHandler=(e)=>{
      setForm({
       ...form,[e.target.name]:e.target.value
      })
      }
      const onChangeImage=(e)=>{
        setFile(
        e.target.files[0]
        )}
     const onSubmit=(e)=>{
       e.preventDefault()
       const formData = new FormData();
       formData.append('name', form.name);
       formData.append('code', form.code);
       if (file) {
         formData.append('icon', file);
      }
      //  console.log('submit ', formData)
       dispatch(UpdateAction(formData,id))
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
    return (
        <React.Fragment>
        <div>
    </div>
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
           <AvatarUI icon={<PersonAddIcon/>} sx={{ m: 1, bgcolor: 'secondary.main' }}/>
           <Title title="Edit action" ></Title>
           </Grid>
           <Box component="form" noValidate sx={{ mt: 1 }} onSubmit={onSubmit}>
           <h6>Name</h6>
           <InputField variant="standard" value={form.name} name="name" type="text" onChangeHandler={onChangeHandler} autoFocus="autofocus"/>
           <h6 style={{marginTop:'15px'}}>Code</h6>
           <textarea style={{ minWidth: 250,marginTop:'15px' }} rows={4} cols={30} value={form.code} name="code" onChange={onChangeHandler}/>
           <InputField name="icon" variant='standard' label="Select icon" onChangeHandler={onChangeImage} type="file"></InputField>
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
