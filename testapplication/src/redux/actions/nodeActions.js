import axios from "axios"
import {  
        SET_NODE,
        SET_NODES,
        DELETE_NODE,
        UPDATE_NODE,ERRORS } from "../types"

export const CreateNode = (form) => async (dispatch) => {
    dispatch({
        type: 'SET_NODE_REQUEST',
        })
     await axios.post('/element/addNode', form).then(res=>{
        //  const responseData = res.data;
        //  console.log('respdata',responseData);
        dispatch({
          type: 'SET_NODE_SUCCESS',
          payload: res.data.element,
        });
     }).catch (error=>{dispatch({
        type: 'SET_NODE_FAILURE',
            payload:error.res.data
            })
        }) 
      }
      export const ResetNode=()=>async dispatch=>{
        dispatch({
            type: 'RESET_NODE',
            })
      }
  export const GetNodes=()=>async dispatch=>{
    dispatch({
        type: 'SET_NODE_REQUEST',
        })
    await axios.get('/element/getAllNodes').then(res=>{
         console.log('geeetProfile',res.data.data)
         dispatch({
             type:'SET_NODES_SUCCESS',
             payload: res.data.data
         })
     }).catch(err=>{
         dispatch({
             type:'SET_NODES_FAILURE',
             payload:err.response.data
         })
     })
 }
 export const GetNode=(_id)=>{ //async action uses redux thunk
 return async (dispatch)=>{
    dispatch({
        type: 'SET_NODE_REQUEST',
        })
        
    try{
        await axios.get(`/element/getNode/${_id}`).then(res=>{
            dispatch({
                type: 'SET_NODE_SUCCESS',
                payload:res.data.data
            })
        })
    }catch (error) {
        dispatch({
          type: 'SET_NODE_FAILURE',
          payload:error.response.data
      })
      
    //   console.log('-----------------------------141')
      }
    }
 }
export const DeleteNode=(_id)=>async (dispatch)=>{
 
  axios.delete(`/element/deleteNode/${_id}`).then(res=>{
      dispatch({
          type: DELETE_NODE,
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
export const UpdateNode=(form,_id)=>async (dispatch)=>{
  axios.put(`/element/updateNode/${_id}`,form).then(res=>{
       dispatch({
           type: UPDATE_NODE,
           payload: res.data.data
       })
   })
   .catch(err=>{
   dispatch({
       type:ERRORS,
       payload:err.response.data
   })
})
}

