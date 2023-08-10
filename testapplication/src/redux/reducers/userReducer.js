import { SET_PROFILE,GET_PROFILE,SET_PROFILES,UPDATE_PROFILE,DELETE_PROFILE,UPDATE_USER} from "../types";
const initialState={
    profile:{},
    profiles:[],
    loading:false,
    errors:null,
    next:{},
    previous:{}
}
const userReducer=(state=initialState,action)=>{
    switch(action.type){
      case 'SET_USERS_REQUEST':
            return{
                ...state,
                loading:true
            }
      case 'SET_USERS_SUCCESS':
              return{
                  ...state,
                  loading:false,
                  profile:{},
                  profiles:action?.payload.profiles,
                 next:action?.payload.next,
                 previous:action?.payload.previous,
              }
      case 'SET_USERS_FAILURE':
                return{
                    ...state,
                    loading:false,
                    profiles:[],
                    profile:{},
                    errors:action.payload

                }
                case 'SET_USER_REQUEST':
                  return{
                      ...state,
                      loading:true
                  }
            case 'SET_USER_SUCCESS':
                    return{
                        ...state,
                        loading:false,
                        profile:action.payload,
                        profiles:[],
                    }
                    case 'SET_EMAIL_SUCCESS':
                      return{
                          ...state,
                          loader:false,
                      }
            case 'SET_USER_FAILURE':
                      return{
                          ...state,
                          loading:false,
                          profiles:[],
                          profile:{},
                          errors:action.payload
      
                      }
        case SET_PROFILE:
            return{
                ...state,
                profile:action.payload,
                loading:false
            }
            case SET_PROFILES:
            return{
                ...state,
                profiles:action.payload,
                profile:{},
                loading:false
            }
            case GET_PROFILE:
              return{
                ...state,
                profile:action.payload,
                loading:false
              }
            case UPDATE_PROFILE:
            return{
                ...state,
                profile:action.payload
            }
            case UPDATE_USER:
            return{
                ...state,
                profile:action.payload
            }
            case DELETE_PROFILE:
             return {
              ...state,
              profiles: state.profiles.filter(p =>p._id !== action.payload),
              } 
              case 'VERIFY_ACCOUNT_SUCCESS':
                return {
                  ...state,
                  // user: action.payload,
                  profile: action.payload,
                //   message: action.payload.message,
                  error: null,
                };
                case 'RESET_PASSWORD':
                return {
                  ...state,
                  // user: action.payload,
                //   message: action.payload.message,
                  profile: action.payload,
                  error: null,
                };  
            default: return state
            
    }
}
export default userReducer