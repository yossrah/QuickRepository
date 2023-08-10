import axios from "axios";
import Swal from 'sweetalert2'
import { ERRORS, SET_USER, } from "../types";
import jwt_decode from 'jwt-decode'
import { SetAuth } from "../../utils/setAuth";
export const Registration=(form,navigate)=>dispatch=>{ //async action uses redux thunk
    axios.post('/user/signup',form).then(res=>{
        dispatch({
            type: ERRORS,
            payload:{}
        })
        const Toast = Swal.mixin({
          toast: true,
          position: 'center-end',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        })
        Toast.fire({
          icon: 'success',
          title: 'Signed in successfully'
        })
        navigate('/layoutAnt/userlist')
    }).catch(err=>{
        dispatch({
            type: ERRORS,
            payload:err.response.data
        })
        Swal.fire({
          title: 'Error!',
      text: 'Something went wrong! try again',
      icon: 'error',
      confirmButtonText: 'Ok'
        })
    })

}
export const LoginAction=(form,navigate)=>dispatch=>{
  dispatch({
    type: 'SET_AUTH_REQUEST',
    })
    axios.post('/user/signin',form).then(res=>{ //email:yossrahas@gmail.com password: Yossra123
        console.log(res)
        const {token}=res.data
        localStorage.setItem('jwt',token)
        const decode=jwt_decode(token)
        console.log('decode',decode)
        dispatch({
          type: 'SET_AUTH_SUCCESS',
          payload:decode
          })
        // dispatch(setUser(decode))
        SetAuth(token)
        navigate('/layoutant')
        const Toast = Swal.mixin({
          toast: true,
          position: 'center-end',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        })
        Toast.fire({
          icon: 'success',
          title: 'Login successfully'
        })
    }).catch(err=>{
        dispatch({
            type: 'SET_AUTH_FAILURE',
            payload:err.response.data
        })
        Swal.fire({
          title: 'Error!',
          text:"oops! something missed or wrong !",
          //  err.response? JSON.stringify(err.response.data) : 'Unknown error',
          icon: 'error',
          confirmButtonText: 'Ok'
        })
    })

}
export const verifyAccount = (activationCode,navigate) => {
    return async (dispatch) => {
      dispatch({
        type: 'SET_AUTH_REQUEST',
        })
      try {
        const response = await axios.post(`http://localhost:3001/user/verifyAccount/${activationCode}`);
        dispatch({
          type: 'VERIFY_ACCOUNT_SUCCESS',
          payload: response.data,
        });
        navigate('/login')
        const Toast = Swal.mixin({
          toast: true,
          position: 'center-end',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        })
        Toast.fire({
          icon: 'success',
          title: 'account activated successfully'
        })
      } catch (error) {
        dispatch({
          type: 'SET_AUTH_FAILURE',
          payload:error.response.data
      })
        Swal.fire({
          title: 'Error!',
          text: 'Something went wrong! try again',
          icon: 'error',
          confirmButtonText: 'Ok'
        })
      }
    };
  };
  export const resetpwd = (email) => {
    return async (dispatch) => {
       dispatch({
       type: 'SET_PWD_REQUEST',
    })
      try {
        const response = await axios.post(`http://localhost:3001/user/resetpassword`,{email});
        dispatch({
          type: 'RESET_PASSWORD',
          payload: response.data,
        });
        const Toast = Swal.mixin({
          toast: true,
          position: 'center-end',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        })
        Toast.fire({
          icon: 'success',
          title: 'Send Email successfully. Check it!'
        })
      } catch (error) {
        dispatch({
          type: 'SET_PWD_FAILURE',
          payload:error.response.data
      })
        Swal.fire({
          title: 'Error!',
          text: 'Email not found or Something went wrong! try again',
          icon: 'error',
         confirmButtonText: 'Ok'
        })
      }
    };
  };
  export const changePassword = (formData, token,navigate) => async (dispatch) => {
    dispatch({
      type: 'SET_AUTH_REQUEST',
   })
    try {
      const res = await axios.post(`http://localhost:3001/user/changepassword/${token}`, formData);
      dispatch({
        type: 'RESET_PASSWORD',
        payload: res.data,
      });
       navigate('/login')
       const Toast = Swal.mixin({
        toast: true,
        position: 'center-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })
      Toast.fire({
        icon: 'success',
        title: 'Password changed successfully'
      })
      

    } catch (error) {
      // console.log(error);
      dispatch({
        type: 'SET_AUTH_FAILURE',
        payload:error.response.data
    })
    Swal.fire({
      title: 'Error!',
      text: 'Something went wrong! try again',
      icon: 'error',
      confirmButtonText: 'Ok'
    })
    }
  };
export const Logout=(navigate)=>dispatch=>{
    localStorage.removeItem('jwt')
    dispatch({
        type:SET_USER,
        payload:{}
    })
    navigate('/')
}
export const setUser=(decode)=>({
    type: 'SET_AUTH_SUCCESS',
    payload: decode
})