import React,{useState} from 'react'
import { useDispatch ,useSelector} from 'react-redux';
import Title from '../../components/Title';
import { Box } from '@mui/material';
import InputField from '../../components/InputField';
import ButtonSubmit from '../../components/ButtonSubmit';
import { useNavigate } from 'react-router-dom'
import { sendAdminMail } from '../../redux/actions/userAction';
import TextAreaField from '../../components/controls/TextAreaField'
import FaceIcon from '@mui/icons-material/Face';
import Header from '../antDesign/Header/Header';
import { btStyle } from '../../components/Styles';

function ContactUs() {
  const [form,setForm]=useState({})
  const navigate=useNavigate()
  const dispatch=useDispatch()
  const onChangeHandler=(e)=>{
   setForm({
    ...form,[e.target.name]:e.target.value
   })
}
const {errors}=useSelector(state=>state.users)
  // console.log('form',form)
  const onSubmit=(e)=>{
    e.preventDefault()
    dispatch(sendAdminMail(form,navigate))}
  return (
    <>
    <Header/>
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
    <div style={{ marginLeft:'50px',marginTop:'30px',width:'250px' }}>
    <Title title="Contact Admin" caption="any bugs or something wont wrong?" color="#0d47a1"></Title>
      <Box component="form" noValidate sx={{ mt: 1 }} onSubmit={onSubmit}>
      <InputField  
      name="email" label="From" type="text" 
      variant='standard' 
      onChangeHandler={onChangeHandler}  autoFocus="autofocus" 
      errors={errors? errors.email:null} >
      </InputField>
      <InputField  
      name="subject" label="Subject" type="text" 
      variant='standard' 
      onChangeHandler={onChangeHandler}  autoFocus="autofocus"  >
      </InputField>
      <Box my={2}>
       <TextAreaField name="core" onChangeHandler={onChangeHandler}  />
      </Box>
      <ButtonSubmit type="submit" style={btStyle} variant="contained" title="Send"></ButtonSubmit>
      </Box>
      </div>
      </div>
      </>
  )
}
export default ContactUs
