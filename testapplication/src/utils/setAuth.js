import axios from "axios"

export const SetAuth=(token)=>{
    if(token){ //send token to the headers
        axios.defaults.headers.common['Authorization']=token
    }
    else{
        delete axios.defaults.headers.common['Authorization']
    }

}