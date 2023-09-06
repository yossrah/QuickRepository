import axios from "axios"
import Swal from 'sweetalert2'
import { ERRORS, SET_PROFILE,GET_PROFILE,SET_PROFILES,DELETE_PROFILE,UPDATE_PROFILE } from "../types"

export const GetProfile=()=>async dispatch=>{
    dispatch({
        type: 'SET_USER_REQUEST',
    })
    await axios.get('/user/getProfile').then(res=>{
        // console.log('geeetProfile',res.data.user)
        dispatch({
            type:SET_PROFILE,
            payload: res.data.user
        })
    }).catch(err=>{
        dispatch({
            type:ERRORS,
            payload:err.response.data
        })
    })
}
export const GetProfiles=(page,limit)=>async (dispatch)=>{
    dispatch({
        type: 'SET_USERS_REQUEST',
    })
        axios.get(`/user/getProfiles?page=${page}&limit=${limit}`).then(res=>{
            // console.log('All Profiles',res.data.data)
            dispatch({
                type:'SET_USERS_SUCCESS',
                payload:{ profiles:res?.data.data,
                    previous:res?.data.previous,
                    next:res?.data.next}
            })
        })
        .catch(err=>{
        dispatch({
            type:'SET_USERS_FAILURE',
            payload:err.response.data
        })
    })
}
export const DeleteProfile=(_id)=>async (dispatch)=>{

    axios.delete(`/user/deleteProlfile/${_id}`).then(res=>{
        dispatch({
            type: DELETE_PROFILE,
            payload: _id
        })
    })
    .catch(err=>{
    dispatch({
        type:ERRORS,
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
export const UpdateProfile=(form,_id)=>async (dispatch)=>{
   axios.put(`/user/updateProfile/${_id}`,form).then(res=>{
         console.log('Profile',res.data.profile)
        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data.profile
        })
        Swal.fire(
            'Good job!',
            'Your profil is updated!',
            'success'
          )
    })
    .catch(err=>{
    dispatch({
        type:ERRORS,
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

export const UpdateUser=(form,_id,navigate)=>dispatch=>{

    axios.put(`/user/updateUser/${_id}`,form).then(res=>{
          console.log('Profile',res.data.profile)
         dispatch({
             type: UPDATE_PROFILE,
             payload: res.data.profile
         })
         navigate('/layout/userlist')
     })
     .catch(err=>{
     dispatch({
         type:ERRORS,
         payload:err.response.data
     })
 })
 }
export const GetProfileById=(id)=>async (dispatch)=>{
    dispatch({
        type: 'SET_USER_REQUEST',
    })
    axios.get(`/user/getProfile/${id}`).then(res=>{
        dispatch({
            type:'SET_USER_SUCCESS',
            payload: res.data.data
        })
        console.log('userUpdate',res.data.data)
    })
    .catch(err=>{
    dispatch({
        type:'SET_USER_FAILURE',
        payload:err.response.data
    })
})
}
export const GetNumberUsers=()=>{
    return async (dispatch) => {
        dispatch({
          type: 'SET_USER_REQUEST',
          })
        //   console.log('...................128')
          try{
            await axios.get('/user/getnumberusers').then(res=>{
                dispatch({
                    type:'SET_USER_SUCCESS',
                    payload: res.data.data
                })
                // console.log('-------------------------134',res.data.data)
            })
          }catch (error) {
            dispatch({
              type: 'SET_USER_FAILURE',
              payload:error.response.data
          })
        //   console.log('-----------------------------141')
          }
    }
}

export const sendAdminMail= (form) => {
    return async (dispatch) => {
      try {
        const response = await axios.post(`http://localhost:3001/user/sendadministration`,form);
        dispatch({
          type: 'SET_EMAIL_SUCCESS',
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
          title: 'Send Email successfully.'
        })
      } catch (error) {
        dispatch({
          type: 'SET_USER_FAILURE',
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

export const GetUserByRole=(roleId)=>async (dispatch)=>{
    console.log('--------------------------------------188')
    dispatch({
        type: 'SET_USER_REQUEST',
    })
    axios.get(`/user/getUsers/${roleId}`).then(res=>{
        dispatch({
            type:'SET_USERS_SUCCESS',
            payload:{profiles: res.data.data}
        })
        console.log('users',res.data.data)
        console.log('--------------------------------',res)
    })
    
    .catch(err=>{
    dispatch({
        type:'SET_USER_FAILURE',
        payload:err.response.data
    })
})
}
