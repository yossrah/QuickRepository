import { DELETE_FLOW,
         SET_FLOWS,
         SET_FLOW,
         UPDATE_FLOW
         } from "../types"
const initialState={
    loader:false,
    flow:{},
    flows:[],
    code:{},
    errors: null,
    file:null,
    next:{},
    previous:{}
}
const flowReducer=(state=initialState,action)=>{
    switch(action.type){
        case 'SET_FLOW_REQUEST':
            return{
                ...state,
                flow:{},
                code:{},
                loader:true
            }
            case 'SEND_FLOW_REQUEST':
            return{
                ...state,
                loader:true
            }
        case 'SET_FLOW_SUCCESS':
            return{
                ...state,
                loader:false,
                flow:action?.payload,
            }
        case 'SET_CODE_SUCCESS':
            return{
                ...state,
                loader:false,
                code:action?.payload,
            }
        case 'SEND_CODE_SUCCESS':
                return{
                    ...state,
                    loader:false,
                    
                }
        case 'SET_DOWNLOAD_SUCCESS':
                return{
                    ...state,
                    loader:false,
                    file:action.payload,
                }
        case 'SET_FLOW_FAILURE':
            return{
                ...state,
                loader:false,
                flow:{},
                flows:[],
                errors:action.payload
            }
        case 'SET_FLOWS_SUCCESS':
            // console.log("***************************************************************", action.payload.data,
            //     action.payload.next,
            //     action.payload.previous)
            return{
                ...state,
                loader:false,
                flows:action?.payload.flows,
                next:action?.payload.next,
                previous:action?.payload.previous,
            }
        case SET_FLOW:
            return{
                ...state,
                flow:action?.payload
            }
            case SET_FLOWS:
            return{
                ...state,
                loader:false,
                flows:action?.payload
            }
            case 'SET_CODE_REQUEST':
                return{
                    ...state,
                    code:{},
                    loader:true
                }
            case DELETE_FLOW:
             return {
              ...state,
              flows: state.flows?.filter(p =>p._id !== action.payload),
              }
              case UPDATE_FLOW:
            return{
                ...state,
                loader:false,
                // flow:action?.payload
            }
            case 'UPDATE_FLOW_REQUEST':
            return{
                ...state,
                loader:true,
            }
              default:
                return state;
    }
}
export default flowReducer