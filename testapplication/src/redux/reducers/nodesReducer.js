import { DELETE_NODE, SET_NODE,SET_NODES,UPDATE_NODE} from "../types"
const initialState={
    isloading:false,
    node:{},
    nodes:[],
    error: null,
}
 const nodesReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_NODE_REQUEST':
            return{
                ...state,
                isloading:true,
                node:{}
            }
      case 'SET_NODE_SUCCESS':
              return{
                  ...state,
                  isloading:false,
                  node:action.payload,
              }
      case 'SET_NODE_FAILURE':
                return{
                    ...state,
                    isloading:false,
                    node:{},
                    error:action.payload
                 }
     case 'SET_NODES_FAILURE':
                    return{
                        ...state,
                        isloading:false,
                        nodes:[],
                        node:{},
                        error:action.payload
                     }
        case 'SET_NODES_SUCCESS':
                    return{
                        ...state,
                        isloading:false,
                        nodes:action.payload,
                    }
        case SET_NODE:
            return{
                ...state,
                node:action.payload
            }
            case SET_NODES:
            return{
                ...state,
                nodes:action.payload
            }
            case DELETE_NODE:
             return {
              ...state,
              nodes: state.nodes.filter(p =>p._id !== action.payload),
              }
              case UPDATE_NODE:
            return{
                ...state,
                node:action.payload
            } 
      default:
        return state;
    }
  };
export default nodesReducer