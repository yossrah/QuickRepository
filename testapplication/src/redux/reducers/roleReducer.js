import { DELETE_ROLE, SET_ROLE,SET_ROLES} from "../types"
const initialState={
    isLoading: false,
    roleuser:{},
    rolesuser:[],
    error:null
}
const roleReducer=(state=initialState,action)=>{
    switch(action.type){
        case 'CREATE_ROLE_REQUEST':
            return{
                ...state,
                isLoading:true,
                error:null}
        case 'CREATE_ROLE_SUCCESS':
            return{
                ...state,
                isLoading:false,
                roleuser:action.payload,
                rolesuser:state.rolesuser.concat(action.payload),
                error:null}
        case 'CREATE_ROLE_FAILURE':
            return{
                ...state,
                isLoading:false,
                roleuser:{},
                error:action.payload}
        case 'UPDATE_ROLE_REQUEST':
            return{
                ...state,
                isLoading:true,
                error:null}
                case 'UPDATE_ROLE_SUCCESS':
                    const updatedRoleuser = action.payload;
                    const updatedRolesuser = state.rolesuser.map((role) =>
                      role._id === updatedRoleuser._id ? updatedRoleuser : role
                    );
                  
                    return {
                      ...state,
                      isLoading: false,
                      roleuser: updatedRoleuser,
                      rolesuser: updatedRolesuser,
                      error: null,
                    };
        case 'UPDATE_ROLE_FAILURE':
            return{
                ...state,
                isLoading:false,
                roleuser:{},
                error:action.payload}
        case 'SET_ROLES_REQUEST':
            return{
                ...state,
                isLoading:true,
                error:null}
        case 'SET_ROLES_SUCCESS':
            return{
                ...state,
                isLoading:false,
                rolesuser:action.payload,
                roleuser:{},
                error:null}
        case 'SET_ROLES_FAILURE':
            return{
                ...state,
                    isLoading:false,
                    rolesuser:[],
                    roleuser:{},
                    error:action.payload}
        case 'SET_ROLE_REQUEST':
            return{
                ...state,
                isLoading:true,
                                        error:null}
        case 'SET_ROLE_SUCCESS':
                                    return{
                                        ...state,
                                        isLoading:false,
                                        roleuser:action.payload,
                                        error:null}
        case 'SET_ROLE_FAILURE':
                                    return{
                                        ...state,
                                        isLoading:false,
                                        roleuser:{},
                                        error:action.payload}
                                        case 'DELETE_ROLE_REQUEST':
                                            return{
                                                ...state,
                                                isLoading:true,
                                                error:null}
                                case 'DELETE_ROLE_SUCCESS':
                                            return{
                                                ...state,
                                                isLoading:false,
                                                rolesuser: state.rolesuser.filter(p =>p._id !== action.payload),
                                                error:null}
                                case 'DELETE_ROLE_FAILURE':
                                            return{
                                                ...state,
                                                isLoading:false,
                                                roleuser:{},
                                                error:action.payload}
        case SET_ROLE:
            return{
                ...state,
                roleuser:action.payload
            }
            case SET_ROLES:
            return{
                ...state,
                rolesuser:action.payload,
                roleuser:{}
            }
            case DELETE_ROLE:
             return {
              ...state,
              rolesuser: state.rolesuser.filter(p =>p._id !== action.payload),
              } 
            default:return state
    }
}
export default roleReducer