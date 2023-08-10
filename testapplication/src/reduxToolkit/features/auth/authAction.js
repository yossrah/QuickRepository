import axios from "axios";
import { createAsyncThunk} from '@reduxjs/toolkit'
import { setUser } from "./authSlice";
import jwt_decode from 'jwt-decode';
import { SetAuth } from "../../../utils/setAuth";
// export const Registration=createAsyncThunk('user/signup',(form,navigate)=>dispatch=>{
//     return axios.post('/user/signup',form).then(res=>
//         console.log(res))
//  })

 export const Registration = createAsyncThunk(
    'auth/registerUser',
    async (form, { rejectWithValue }) => {
      try {
        const response = await axios.post('/user/signup', form);
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );
 export const LoginAction = createAsyncThunk('auth/login',
    async (form,{ rejectWithValue },navigate) => {
     try{
        const res = await axios.post('/user/signin', form);
        const { token } = res.data;
        localStorage.setItem('jwt', token);
        SetAuth(token) //add token to headers
        const decode = jwt_decode(token);
        navigate('/')
        return decode; //as payload
     } catch(error){
        return rejectWithValue(error.response.data);
     }
       }
  );
 export const Logout=()=>dispatch=>{
    localStorage.removeItem('jwt')
    dispatch({
        type:setUser,
        payload:{}
    })
}
