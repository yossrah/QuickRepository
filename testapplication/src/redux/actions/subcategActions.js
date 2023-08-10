import axios from "axios";
import { DELETE_SUBCATEGORY, SET_SUBCATEGORIES,SET_SUBCATEGORY,UPDATE_SUBCATEGORY,ERRORS} from "../types"
export const CreateSubCategory=(form,navigate)=>dispatch=>{ 
    dispatch({
        type: 'CREATE_SUBCATEGORY_REQUEST',
    })
    axios.post('/subcategory/addSubCategory',form).then(res=>{
        console.log(res.data.subcategory)
        dispatch({
            type:  'CREATE_SUBCATEGORY_SUCCESS',
            payload:res.data.subcategory
        })
        //  navigate('/layoutAnt/subcategories')
    }).catch(err=>{
        dispatch({
            type: 'CREATE_SUBCATEGORY_FAILURE',
            payload:err.response.data
        })
    })

}
export const GetSubCategories=()=>dispatch=>{ 
    axios.get('/subcategory/getAll').then(res=>{
        console.log(res.data)
        dispatch({
            type: SET_SUBCATEGORIES,
            payload:res.data.data
        })
    }).catch(err=>{
        dispatch({
            type: ERRORS,
            payload:err.response.data
        })
    })

}
export const GetSubCategory=(_id)=>dispatch=>{ 
    axios.get(`/subcategory/getSubCategory/${_id}`).then(res=>{
        dispatch({
            type: SET_SUBCATEGORY,
            payload:res.data.data
        })
    }).catch(err=>{
        dispatch({
            type: ERRORS,
            payload:err.response.data
        })
    })

}
export const GetSubCategorybycatego=(_id)=>dispatch=>{ 
    axios.get(`/subcategory/getSubCategorybycatego/${_id}`).then(res=>{
        dispatch({
            type: SET_SUBCATEGORIES,
            payload:res.data.subCategory
        })
    }).catch(err=>{
        dispatch({
            type: ERRORS,
            payload:err.response.data
        })
    })

}
export const DeleteSubCategory=(_id)=>async (dispatch)=>{
   axios.delete(`/subcategory/deleteSubCategory/${_id}`).then(res=>{
        dispatch({
            type: DELETE_SUBCATEGORY,
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
export const UpdateSubCategory=(form,_id)=>async (dispatch)=>{
    axios.put(`/subcategory/updateSubCategory/${_id}`,form).then(res=>{
          console.log('category',res.data.profile)
         dispatch({
             type: UPDATE_SUBCATEGORY,
             payload: res.data.profile
         })
     })
     .catch(err=>{
     dispatch({
         type:ERRORS,
         payload:err.response.data
     })
 })
 }