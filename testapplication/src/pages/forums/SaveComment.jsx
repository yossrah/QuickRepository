import React,{useState,useEffect} from 'react'
import { useDispatch ,useSelector} from 'react-redux';
import Title from '../../components/Title';
import { Box } from '@mui/material';
import InputField from '../../components/InputField';
import ButtonSubmit from '../../components/ButtonSubmit';
import { useNavigate } from 'react-router-dom'
import { CreateComment } from '../../redux/actions/contactAction';
import TextAreaField from '../../components/controls/TextAreaField'
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import FaceIcon from '@mui/icons-material/Face';
import BackdropItem from '../../components/controls/BackdropItem';
const btStyle={ margin:'20px 0',backgroundColor:'#0078dd'}
function SaveComment() {
  const {user}=useSelector((state)=>state.auth)
  const {isLoading}=useSelector((state)=>state.contact)
  const [form,setForm]=useState({})
  const navigate=useNavigate()
  const dispatch=useDispatch()
  const onChangeHandler=(e)=>{
   setForm({
    ...form,[e.target.name]:e.target.value
   })
}
  useEffect(() => {
    if(user){
      setForm({...form,from:user.email})
    }
    }, [user]);
  console.log('form',form)
  const onSubmit=(e)=>{
    e.preventDefault()
    dispatch(CreateComment(form,navigate))
   
  }
  return (
   
    <div style={{ marginLeft:'30px',marginTop:'30px' }}>
    <Title title="Issue" caption="any bugs or something wont wrong?" color="#0d47a1"></Title>
      <Box component="form" noValidate sx={{ mt: 1 }} onSubmit={onSubmit}>
       <Stack direction="row" spacing={2} alignItems="center" mb={2}>
        Author : <Chip icon={<FaceIcon />} label={user.email}/>
    </Stack>
      <InputField  
      name="subject" label="Subject" type="text" 
      variant='standard' 
      onChangeHandler={onChangeHandler}  autoFocus="autofocus"  >
      </InputField>
      <Box my={2}>
      <TextAreaField name="text" 
      onChangeHandler={onChangeHandler}  /></Box>
      <ButtonSubmit type="submit" style={btStyle} variant="contained" title="Save"></ButtonSubmit>
      <ButtonSubmit  style={btStyle} variant="contained" onClick={()=>navigate('/layoutAnt/viewcomments')} title="View all"></ButtonSubmit>
      </Box>
      <BackdropItem open={isLoading} />
      </div>
    
  )
}

export default SaveComment
