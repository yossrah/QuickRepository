import axios from "axios";

import { SET_PARAM ,ERRORS, SET_PARAMS,DELETE_PARAM,UPDATE_PARAM} from "../types";
export const CreateParam=(form,navigate)=>dispatch=>{
    dispatch({
        type: 'SET_PARAM_REQUEST',
    })
    axios.post('/param/addParam',form).then(res=>{
        // console.log('res',res.data)
        dispatch({
            type: SET_PARAM,
            payload:res.data.param
        })
        // console.log("--------------------10")
    }).catch(err=>{
        dispatch({
            type: ERRORS,
            payload:err.response.data
        })
        // console.log("--------------------16")
    })
}
export const GetParams=(page,limit)=>dispatch=>{ 
    dispatch({
        type: 'SET_PARAM_REQUEST',
    })
    axios.get(`/param/getAllParams?page=${page}&limit=${limit}`).then(res=>{
        dispatch({
            type: SET_PARAMS,
            payload:{ params:res?.data.data,
                previous:res?.data.previous,
                next:res?.data.next}
        })
    }).catch(err=>{
        dispatch({
            type: ERRORS,
            payload:err.response.data
        })
    })

}
export const GetParamsbyId=(paramIds)=>dispatch=>{ 
    dispatch({
        type: 'SET_PARAM_REQUEST',
    })
    // console.log('--------------------------32')
    axios.post('/param/getparamsbyid',{paramIds}).then(res=>{
        dispatch({
            type: 'SET_PARAMS_SUCCESS',
            payload:res.data.data
        })
        // console.log('-------------------------38',res.data.data)
    }).catch(err=>{
        dispatch({
            type: ERRORS,
            payload:err.response.data
        })
        // console.log('----------------------------------44')
    })

}
export const GetParam=(_id)=>dispatch=>{
    dispatch({
        type: 'SET_PARAM_REQUEST',
    })
    axios.get(`/param/getParam/${_id}`).then(res=>{
        dispatch({
            type: SET_PARAM,
            payload:res.data.data
        })
    }).catch(err=>{
        dispatch({
            type: ERRORS,
            payload:err.response.data
        })
    })

}
export const DeleteParam=(_id)=>async (dispatch)=>{
    dispatch({
        type: 'SET_PARAM_REQUEST',
    })
   console.log('------------------------66')
    axios.delete(`/param/deleteParam/${_id}`).then(res=>{
        dispatch({
            type: DELETE_PARAM,
            payload: _id
        })
    })
    console.log('------------------------73')
    .catch(err=>{
    dispatch({
        type:ERRORS,
        payload:err.response.data
    })
    console.log('------------------------79')
})
}
export const UpdateParam=(form,_id)=>async (dispatch)=>{
    dispatch({
        type: 'SET_PARAM_REQUEST',
    })
    axios.put(`/param/updateParam/${_id}`,form).then(res=>{
         dispatch({
             type: 'UPDATE_PARAM_SUCCESS',
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
 export const getFilterParams=(id)=>dispatch=>{ 
    dispatch({
        type: 'SET_PARAM_REQUEST',
    })
    axios.get(`/param/getfilterparam/${id}`).then(res=>{
        dispatch({
            type: SET_PARAMS,
            payload:res.data.params
        })
    }).catch(err=>{
        dispatch({
            type: ERRORS,
            payload:err.response.data
        })
    })

}