import React from 'react'
import { Navigate } from 'react-router-dom'
const AdminGuard=({role,children})=> {
    //  console.log('roooooooooole',role==='Admin')
   if(role==='Admin'){
    return children
    }
    return <Navigate to="/noaccess" replace/>
  }
  
  export default AdminGuard
  