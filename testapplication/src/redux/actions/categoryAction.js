import axios from "axios";
import { SET_CATEGORY ,ERRORS,PUSH_SUBCATEGORY_REQUEST,PULL_SUBCATEGORY_REQUEST,DELETE_CATEGORY} from "../types";
export const CreateCategory=(form,navigate)=>dispatch=>{ 
    dispatch({
        type: 'SET_CATEGORIES_REQUEST',
        })
    axios.post('/category/addCategory',form).then(res=>{
        
        dispatch({
            type:  'SET_CATEGORY_SUCCESS',
            payload:res.data.category
        })
        console.log('------------------10')
    }).catch(err=>{
        dispatch({
            type: 'SET_CATEGORIES_FAILURE',
            payload:err.response.data
        })
    })

}
export const GetCategories=()=>dispatch=>{ 
    dispatch({
        type: 'SET_CATEGORIES_REQUEST',
        })
    axios.get('/category/getAllCategories').then(res=>{
        console.log(res.data)
        dispatch({
            type:'SET_CATEGORIES_SUCCESS',
            payload:res.data.data
        })
    }).catch(err=>{
        dispatch({
            type: 'SET_CATEGORIES_FAILURE',
            payload:err.response.data
        })
    })

}
export const GetCategory=(_id)=>dispatch=>{ //async action uses redux thunk
    dispatch({
        type: 'SET_CATEGORIES_REQUEST',
        })
    axios.get(`/category/getCategory/${_id}`).then(res=>{
        dispatch({
            type: SET_CATEGORY,
            payload:res.data.data
        })
        console.log('categoryyyy',res.data.data)
    }).catch(err=>{
        dispatch({
            type: ERRORS,
            payload:err.response.data
        })
    })

}
export const DeleteCategory=(_id)=>async (dispatch)=>{
   
    axios.delete(`/category/deleteCategory/${_id}`).then(res=>{
        dispatch({
            type: DELETE_CATEGORY,
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
export const UpdateCategory=(form,_id)=>async (dispatch)=>{
    dispatch({
        type: 'SET_CATEGORIES_REQUEST',
        })
    axios.put(`/category/updateCategory/${_id}`,form).then(res=>{
          console.log('category',res.data.data)
         dispatch({
             type: 'UPDATE_CATEGORY',
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
 export const pushSubCategoryRequest = (id, subCategory) => ({
    type: PUSH_SUBCATEGORY_REQUEST,
    payload: { id, subCategory },
  });
  export const puLLSubCategoryRequest = (id, subCategory) => ({
    type: PULL_SUBCATEGORY_REQUEST,
    payload: { id, subCategory },
  });
export const PushSubCategory=(id,subCategory)=>async (dispatch)=>{
    dispatch(pushSubCategoryRequest(id, subCategory));
    
    axios.put(`/category/pushSubCategory/${id}`,{subCategory}).then(res=>{
        console.log('subCategory',subCategory)
        console.log('category',res.data.data)
        dispatch({
          type: 'PUSH_SUBCATEGORY_SUCCESS',
          payload: res.data.data
        });
   }
   ).catch((error)=>{
        dispatch({
            type: 'PUSH_SUBCATEGORY_FAILURE',
            payload: error.response.data.error,
          });
 })
 }
 export const PullSubCategory=(id,subCategory)=>async (dispatch)=>{
    axios.put(`/category/pullSubCategory/${id}`,{subCategory}).then(res=>{
          console.log('subcategory',res.data.data)
         dispatch({
             type: SET_CATEGORY,
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