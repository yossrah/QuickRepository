import {  SET_COMPONENT,SET_COMPONENTS,} from "../types"
const initialState={
    loading:false,
    component:{},
    components:[],
    componentsname:[],
    error: null,
    next:{},
    previous:{}
}
 const componentReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_ACTION_REQUEST':
        return{
           ...state,
            component:{},
          
           loading:true
        }
      case 'SET_ACTIONSBYCATEG_SUCCESS':
      return{
        ...state,
        loading:true,
        
      }
      case 'SET_ACTION_SUCCESS':
        return {
          ...state,
           component:action.payload,
           components:state.components.concat(action.payload),
           loading: false,
        };
        
      case 'SET_ACTIONS_SUCCESS':
        return {
          ...state,
            components:action.payload,
            loading: false,
          };
      case 'SET_ACTIONSPAGINATED_SUCCESS':
        return{
          ...state,
          loading:false,
          components:action?.payload.components,
          next:action?.payload.next,
          previous:action?.payload.previous,
        }
      case 'SET_ACTIONSBYNAME_SUCCESS':
        return {
          ...state,
            componentsname:action.payload,
            // components:[],
            loading: false,
          };
      case 'SET_ACTION_FAILURE':
        return {
          ...state,
          loading: false,
          component:{},
          components:[],
          error: action.payload,
        };
        case SET_COMPONENT:
            return{
                ...state,
                component:action.payload
            }
            case SET_COMPONENTS:
            return{
                ...state,
                components:action.payload
            }
            case 'DELETE_ACTION':
             return {
              ...state,
              components: state.components.filter(p =>p._id !== action.payload),
              loading:false
              }
              case 'UPDATE_ACTION':
                const updatedaction = action.payload;
                const updatedactions = state.components.map((c) =>
                      c._id === updatedaction._id ? updatedaction : c
                    );
                    return {
                      ...state,
                      loading: false,
                      component: updatedaction,
                      components: updatedactions,
                      error: null,
                    };
            
              
                    
      default:
        return state;
    }
  };
export default componentReducer