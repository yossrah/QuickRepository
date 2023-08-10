import { DELETE_SUBCATEGORY, SET_SUBCATEGORIES,SET_SUBCATEGORY,UPDATE_SUBCATEGORY} from "../types"
const initialState={
    subcategory:{},
    subcategories:[],
    isLoading: false,
    error:null
}
const subcategoryReducer=(state=initialState,action)=>{
    switch(action.type){
        case 'CREATE_SUBCATEGORY_REQUEST':
            return{
                ...state,
                isLoading:true,
                error:null}
        case 'CREATE_SUBCATEGORY_SUCCESS':
            return{
                ...state,
                isLoading:false,
                subcategory:action.payload,
                subcategories:state.subcategories.concat(action.payload),
                error:null}
        case 'CREATE_SUBCATEGORY_FAILURE':
            return{
                ...state,
                isLoading:false,
                subcategory:{},
                error:action.payload}
        case SET_SUBCATEGORY:
            return{
                ...state,
                subcategory:action.payload
            }
            case SET_SUBCATEGORIES:
            return{
                ...state,
                subcategories:action.payload
            }
            case DELETE_SUBCATEGORY:
             return {
              ...state,
              subcategories: state.subcategories.filter(p =>p._id !== action.payload),
              }
              case UPDATE_SUBCATEGORY:
            return{
                ...state,
                subcategory:action.payload
            } 
             default:return state
    }
}
export default subcategoryReducer