import { createSlice } from "@reduxjs/toolkit";
import { Registration,LoginAction } from "./authAction";
import isEmpty from "../../../utils/isEmpty";
const initialState={
    isLoading: false,
    user:{},
    isAuthenticated:false,
    isSuccess:false,
    errors:{},
    jwt:null
}
const authSlice=createSlice({
    name:'auth',
    initialState,
    reducers:{
        setUser: (state, action) => {
            state.isAuthenticated = !isEmpty(action.payload);
            state.user = action.payload;
          },
        ERRORS:(state,action)=>{
            state.errors= action.payload
        } ,
        reset:(state)=>{
         state.isLoading=false
         state.isSuccess=false
        }      
    },
    extraReducers:(builder)=>{
        builder.addCase(Registration.pending,(state)=>{
            state.isLoading= true
            })
        builder.addCase(Registration.fulfilled,(state,navigate,action)=>{
            state.isLoading= false
            state.isSuccess= true
            state.user=action.payload
            state.errors = {};
            navigate('/admin')
        })
        builder.addCase(Registration.rejected,(state,action)=>{
            state.isLoading= false
            state.errors = action.payload;
            state.user=null

        })
        builder.addCase(LoginAction.fulfilled, (state, action) =>{
            state.user=action.payload
            state.isAuthenticated=true
     })
        .addCase(LoginAction.rejected, (state, action) => {
            state.isLoading= false
            state.errors = action.payload;
            state.user=null
     })
     ;
    }
})
export const {ERRORS,setUser}=authSlice.actions
export default authSlice.reducer