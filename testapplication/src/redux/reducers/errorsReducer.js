import {ERRORS } from "../types"
const initialState={
    isConnected:false
}
export default function(state=initialState,action){
    switch(action.type){
        case ERRORS:
            return action.payload //initialstate prend les erreurs provenant du backend
            
        default:
            return state
    }
}