import axios from "axios"
import {  
        ERRORS } from "../types"

export const CreateAction = (form) => async (dispatch) => {
    dispatch({
        type: 'SET_ACTION_REQUEST',
        })
    try{
        await axios.post('/action/addAction', form).then(res=>{
            dispatch({
                type: 'SET_ACTION_SUCCESS',
                payload: res.data.action,
              })
           })
      }catch (error) {
        dispatch({
          type: 'SET_ACTION_FAILURE',
          payload:error.response.data
      })
    }
}

  export const GetActions=(page,limit)=>async dispatch=>{
    dispatch({
        type: 'SET_ACTION_REQUEST',
        })
    await axios.get('/action/getAllActions').then(res=>{
         console.log('reeeeeeeeeeeeeees',res.data)
         dispatch({
             type:'SET_ACTIONS_SUCCESS',
            payload: res.data.data
            // payload: res.data
         })
         console.log('----------------------35')
     }).catch(err=>{
         dispatch({
             type:'SET_ACTION_FAILURE',
             payload:err.response.data
         })
     })
 }

 export const GetPaginatedActions=(page,limit)=>async dispatch=>{
    dispatch({
        type: 'SET_ACTION_REQUEST',
        })
    await axios.get(`/action/getActionPaginated?page=${page}&limit=${limit}`).then(res=>{
        //  console.log('reeeeeeeeeeeeeees',res.data)
         dispatch({
             type:'SET_ACTIONSPAGINATED_SUCCESS',
             payload:{ components:res?.data.data,
                previous:res?.data.previous,
                next:res?.data.next}
  })
        //  console.log('----------------------35')
     }).catch(err=>{
         dispatch({
             type:'SET_ACTION_FAILURE',
             payload:err.response.data
         })
     })
 }
 export const GetActionsByName=(name)=>async dispatch=>{
    dispatch({
        type: 'SET_ACTION_REQUEST',
        })
    await axios.post('/action/getActionsByName',{name}).then(res=>{
        //   console.log('---------------------------------49')
         dispatch({
             type:'SET_ACTIONS_SUCCESS',
             payload: res.data.actions
         })
        //  console.log('---------------------------------54',res.data.actions)
     }).catch(err=>{
         dispatch({
             type:'SET_ACTION_FAILURE',
             payload:err.response.data
         })
        //  console.log('---------------------------------60')
     })
 }
 export const GetAction=(_id)=>{ //async action uses redux thunk
  return async(dispatch)=>{
    dispatch({
        type: 'SET_ACTION_REQUEST',
        })
        try{
            await  axios.get(`/action/getAction/${_id}`).then(res=>{
                dispatch({
                    type: 'SET_ACTION_SUCCESS',
                    payload:res.data.data
                })
            })
        }catch (error) {
            dispatch({
              type: 'SET_ACTION_FAILURE',
              payload:error.response.data
          })
          }
  }
}
export const GetActionbycatego=(_id)=>{ 
    return async (dispatch)=>{
        dispatch({
            type: 'SET_ACTION_REQUEST',
            })
            try{
                await axios.get(`/action/getActionbycategory/${_id}`).then(res=>{
                    dispatch({
                        type: 'SET_ACTIONS_SUCCESS',
                        payload:res.data.action
                    })
                })
            }
            catch (error) {
                dispatch({
                  type: 'SET_ACTION_FAILURE',
                  payload:error.response.data
              })
              }
            }
}

export const DeleteAction=(_id)=>async (dispatch)=>{
 
  axios.delete(`/action/deleteAction/${_id}`).then(res=>{
      dispatch({
          type: 'DELETE_ACTION',
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
export const UpdateAction=(form,_id)=>async (dispatch)=>{
    dispatch({
        type: 'SET_ACTION_REQUEST',
        })
  axios.put(`/action/updateAction/${_id}`,form).then(res=>{
    console.log('category',res.data.data)
       dispatch({
           type: 'UPDATE_ACTION',
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
export const GetNumberActions=()=>{
    return async (dispatch) => {
        dispatch({
          type: 'SET_ACTION_REQUEST',
          })
          try{
            await axios.get('/action/getnumberactions').then(res=>{
                dispatch({
                    type:'SET_ACTION_SUCCESS',
                    payload: res.data.data
                })
            })
          }catch (error) {
            dispatch({
              type: 'SET_ACTION_FAILURE',
              payload:error.response.data
          })
          }
    }
}
