import axios from "axios";
export const CreateRole=(form,navigate)=>dispatch=>{
    dispatch({
        type: 'CREATE_ROLE_REQUEST',
    })
    axios.post('/role/addRole',form).then(res=>{
        dispatch({
            type:'CREATE_ROLE_SUCCESS',
            payload:res.data.role
        })
        navigate('/layout/roles')
    }).catch(err=>{
        dispatch({
            type: 'CREATE_ROLE_FAILURE',
            payload:err.response.data
        })
    })
}
export const GetRoles=()=>dispatch=>{ //async action uses redux thunk
    dispatch({
        type: 'SET_ROLES_REQUEST',
    })
    axios.get('/role/getAll').then(res=>{
        dispatch({
            type: 'SET_ROLES_SUCCESS',
            payload:res.data.data
        })
    }).catch(err=>{
        dispatch({
            type: 'SET_ROLES_FAILURE',
            payload:err.response.data
        })
    })

}
export const GetRole=(_id)=>dispatch=>{ //async action uses redux thunk
    dispatch({
        type: 'SET_ROLE_REQUEST',
    })
    axios.get(`/role/getRole/${_id}`).then(res=>{
        dispatch({
            type: 'SET_ROLE_SUCCESS',
            payload:res.data.data
        })
    }).catch(err=>{
        dispatch({
            type:'SET_ROLE_FAILURE',
            payload:err.response.data
        })
    })

}
export const DeleteRole=(_id)=>async (dispatch)=>{
    // dispatch({
    //     type: 'DELETE_ROLE_REQUEST',
    // })
    axios.delete(`/role/deleteRole/${_id}`).then(res=>{
        dispatch({
            type:'DELETE_ROLE_SUCCESS',
            payload: _id
        })
    })
    .catch(err=>{
    dispatch({
        type:'DELETE_ROLE_FAILURE',
        payload:err.response.data
    })
})
}
export const UpdateRole=(form,_id)=>async (dispatch)=>{
    dispatch({
        type: 'UPDATE_ROLE_REQUEST',
    })
    axios.put(`/role/updateRole/${_id}`,form).then(res=>{
         dispatch({
             type:'UPDATE_ROLE_SUCCESS',
             payload: res.data.data
         })
     })
     .catch(err=>{
     dispatch({
         type:'UPDATE_ROLE_FAILURE',
         payload:err.response.data
     })
 })
 }