/* eslint-disable import/no-anonymous-default-export */
import isEmpty from "../../utils/isEmpty"
import { SET_USER } from "../types"
const initialState={
    isConnected:false,
    isLoading:false,
    user: {},
    errors:null
}
export default function(state=initialState,action){
    switch(action.type){
         case 'SET_AUTH_REQUEST':
            return{
                ...state,
                isLoading:true
            }
        case 'RESET_PASSWORD':{
            return{
                ...state,
                isLoading:false
            }
        }
        case 'SET_PWD_REQUEST':
            return{
                ...state,
                isLoading:true
            }
            case 'SET_PWD_FAILURE':
            return{
                ...state,
                isLoading:false,
                errors:action.payload
            }
        case 'SET_AUTH_SUCCESS':
            return{
                ...state,
                isConnected:!isEmpty(action.payload),
                isLoading:false,
                user:action.payload,
                errors:null
            }
            case 'SET_AUTH_FAILURE':
                return{
                    ...state,
                    isConnected:false,
                    isLoading:false,
                   errors:action.payload
                }
            case 'VERIFY_ACCOUNT_SUCCESS':
                return{
                        ...state,
                        isLoading:false,
                       errors:null
                }
            default:return state
    }
}