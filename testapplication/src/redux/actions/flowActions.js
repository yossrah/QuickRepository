import axios from "axios"
import Swal from "sweetalert2"
import {  
        DELETE_FLOW,
        UPDATE_FLOW,ERRORS } from "../types"
        
export const CreateFlow = (form) => {
    return async (dispatch)=>{
        dispatch({
            type: 'SET_FLOW_REQUEST',
            })
          
        try{
            await axios.post('/workflow/createWorkflow', form).then(res=>{
                console.log('workeddd',res.data)
               dispatch({
                 type: 'SET_FLOW_SUCCESS',
                 payload: res.data.workflow,
               });
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
                title: 'Saved successfully'
              })
              
        }catch (error) {
          
            dispatch({
              type: 'SET_FLOW_FAILURE',
              payload:error.response.data
          })
          }
    }
 }

  export const GetFlows=(page,limit)=>async dispatch=>{
    dispatch({
      type: 'SET_FLOW_REQUEST',
      })
    await axios.get(`/workflow/getAll?page=${page}&limit=${limit}`).then(res=>{
      // console.log('reeeeeeeeeeeeeeeeeeeeeeeeeeeeees',res)
         dispatch({
             type:'SET_FLOWS_SUCCESS',
             payload:{ flows:res?.data.data,
                       previous:res?.data.previous,
                       next:res?.data.next}
         })
     }).catch(err=>{
         dispatch({
             type:ERRORS,
             payload:err.response.data
         })
     })
 }
 export const GetRecentFlows=()=>{
    return async (dispatch) => {
        dispatch({
          type: 'SET_FLOW_REQUEST',
          })
          try{
            await axios.get('/workflow/getrecentworkflows').then(res=>{

                dispatch({
                    type:'SET_FLOWS_SUCCESS',
                    payload: {flows:res?.data.data}
                })
            })
          }catch (error) {
            dispatch({
              type: 'SET_FLOW_FAILURE',
              payload:error.response.data
          })
          }
    }
}
 export const GetNumberFlows=()=>{
    return async (dispatch) => {
        dispatch({
          type: 'SET_FLOW_REQUEST',
          })
          try{
            await axios.get('/workflow/getnumberworkflows').then(res=>{
                dispatch({
                    type:'SET_FLOW_SUCCESS',
                    payload: res.data.data
                })
            })
          }catch (error) {
            dispatch({
              type: 'SET_FLOW_FAILURE',
              payload:error.response.data
          })
          }
    }
}
 export const GetFlow=(_id)=>async dispatch=>{ //async action uses redux thunk
    dispatch({
        type: 'SET_FLOW_REQUEST',
        })
  try{
    await axios.get(`/workflow/getworkflow/${_id}`).then(res=>{
        dispatch({
            type: 'SET_FLOW_SUCCESS',
            payload:res.data.data
        })
    })
  }catch (error) {
    dispatch({
      type: 'SET_FLOW_FAILURE',
      payload:error.response.data
  })
  }
 }
export const DeleteFlow=(_id)=>async (dispatch)=>{
 axios.delete(`/workflow/deleteworkflow/${_id}`).then(res=>{
      dispatch({
          type: DELETE_FLOW,
          payload: _id
      })
  })
  .catch(err=>{
  dispatch({
      type:ERRORS,
      payload:err.response.data
  })
})
}
export const UpdateFlow=(form,_id,navigate)=>async (dispatch)=>{
  dispatch({
    type: 'UPDATE_FLOW_REQUEST',
    })
    // console.log('-------------------142')
    try{
      await axios.put(`/workflow/updateworkflow/${_id}`,form).then(res=>{
          dispatch({
              type: UPDATE_FLOW,
              payload:res.data.data
          })
      })
      navigate('/layout/flows')
      // console.log('-------------------150')
    }catch (error) {
      dispatch({
        type: 'SET_FLOW_FAILURE',
        payload:error.response.data
    })
    // console.log('-------------------156')
    }}
export const GetCode=(_id)=>async dispatch=>{ //async action uses redux thunk
    dispatch({
        type: 'SET_CODE_REQUEST',
        })
  try{
    await axios.get(`/workflow/generatecode/${_id}`).then(res=>{
        dispatch({
            type: 'SET_CODE_SUCCESS',
            payload:res.data.data
        })
    })
  }catch (error) {
    dispatch({
      type: 'SET_FLOW_FAILURE',
      payload:error.response.data
  })
  }
 }
 export const DownloadCode=(_id)=>async dispatch=>{ //async action uses redux thunk
    // console.log('---------------------149')
    dispatch({
        type: 'SET_FLOW_REQUEST',
        })
  try{
    await axios.get(`/workflow/downloadcode/${_id}`).then(res=>{
        dispatch({
            type: 'SET_DOWNLOAD_SUCCESS',
            payload:res.data.data
        })
        // console.log('---------------------158')
    })
  }catch (error) {
    dispatch({
      type: 'SET_FLOW_FAILURE',
      payload:error.response.data
  })
  console.log('---------------------165')
  }
 }
 export const sendCode = (form) => {
  return async (dispatch) => {
    
    try {
      const response = await axios.post(`http://localhost:3001/workflow/sendcode`,form);
      dispatch({
        type: 'SEND_CODE_SUCCESS',
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
        type: 'SET_FLOW_FAILURE',
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

export const GetFlowByuser=(_id)=>{ 
  return async (dispatch)=>{
      dispatch({
          type: 'SET_FLOW_REQUEST',
          })
          try{
              await axios.get(`/workflow/getworkflowsbyuser/${_id}`).then(res=>{
                  dispatch({
                      type: 'SET_FLOWS_SUCCESS',
                      payload: {flows:res?.data.workflows,
                                previous:res?.data.previous,
                                next:res?.data.next}
                  })
              })
          }
          catch (error) {
              dispatch({
                type: 'SET_FLOW_FAILURE',
                payload:error?.response.data
            })
            }
          }
}