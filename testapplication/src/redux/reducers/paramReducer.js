import { DELETE_PARAM, SET_PARAM,SET_PARAMS} from "../types"
const initialState={
    loading: false,
    param:{},
    params:[],
    next:{},
    previous:{}
}
const paramReducer=(state=initialState,action)=>{
    switch(action.type){
        case 'SET_PARAM_REQUEST' :
                        return{
                            ...state,
                            loading:true,
                            // params:[],
                            error:null
                        }
        case 'UPDATE_PARAM_SUCCESS':
                            const updatedparam = action.payload;
                            const updatedparams = state.params.map((p) =>
                              p._id === updatedparam._id ? updatedparam : p
                            );
                          
                            return {
                              ...state,
                              loading: false,
                              param: updatedparam,
                              params: updatedparams,
                              error: null,
                            };
        case SET_PARAM:
            return{
                ...state,
                loading:false,
                params:state.params.concat(action.payload),
                param:action.payload
            }
            case 'SET_PARAMS_SUCCESS':
                        return{
                            ...state,
                            loading:false,
                            param:{},
                            params:action.payload,
                            error:null}
            case SET_PARAMS:
            return{
                ...state,
                loading:false,
                params:action?.payload.params,
                next:action?.payload.next,
                previous:action?.payload.previous,
                param:{}
            }
            case DELETE_PARAM:
             return {
              ...state,
              loading:false,
              params: state.params.filter(p =>p._id !== action.payload),
              } 
            default:return state
    }
}
export default paramReducer