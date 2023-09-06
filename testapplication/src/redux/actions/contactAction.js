import axios from "axios";
import Swal from 'sweetalert2'
export const CreateComment=(form,navigate)=>dispatch=>{
    dispatch({
        type: 'SET_CONTACT_REQUEST',
        }) 
    axios.post('/contact/save',form).then(res=>{
        dispatch({
            type:  'SET_CONTACT_SUCCESS',
            payload:res.data.mssg
        })
        const Toast = Swal.mixin({
            toast: true,
            position: 'center-end',
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
          })
          Toast.fire({
            icon: 'success',
            title: 'Saved successfully'
          })
          navigate('/layout/viewcomments')
    }).catch(err=>{
        dispatch({
            type: 'SET_CONTACTS_FAILURE',
            payload:err.response.data
        })
    })
}
export const GetComments=(page,limit)=>dispatch=>{ 
    dispatch({
        type: 'SET_CONTACT_REQUEST',
        })
    axios.get(`/contact/all?page=${page}&limit=${limit}`).then(res=>{
        console.log(res.data)
        dispatch({
            type:'SET_CONTACTS_SUCCESS',
            payload:{ messages: res?.data.mssgs,
                      previous: res?.data.previous,
                      next: res?.data.next}
        })
    }).catch(err=>{
        dispatch({
            type: 'SET_CONTACTS_FAILURE',
            payload:err.response.data
        })
    })
}
export const DeleteComment=(_id)=>async (dispatch)=>{
    dispatch({
        type: 'SET_CONTACT_REQUEST',
        })
    axios.delete(`/contact/deleteComment/${_id}`).then(res=>{
        dispatch({
            type: 'DELETE_CONTACT',
            payload: _id
        })
    })
    .catch(err=>{
    dispatch({
        type: 'SET_CONTACTS_FAILURE',
            payload:err.response.data
    })
})
}
export const GetNumberPosts=()=>{
    return async (dispatch) => {
        dispatch({
          type: 'SET_CONTACT_REQUEST',
          })
          try{
            await axios.get('/contact/getnumberposts').then(res=>{
                dispatch({
                    type:'SET_CONTACT_SUCCESS',
                    payload: res.data.data
                })
            })
          }catch (error) {
            dispatch({
              type: 'SET_CONTACTS_FAILURE',
              payload:error.response.data
          })
          }
    }
}
