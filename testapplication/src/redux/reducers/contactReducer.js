const initialState={
    isLoading:false,
    message:{},
    messages:[],
    error: null,
}
const contactReducer=(state=initialState,action)=>{
    switch(action.type){
      case 'SET_CONTACT_REQUEST':
                        return{
                            ...state,
                            isLoading:true,
                            messages:[],
                            
                            error:null}
    case 'SET_CONTACTS_SUCCESS':
                        return{
                            ...state,
                            isLoading:false,
                            // messages:action.payload,
                            messages:state.messages.concat(action.payload),
                            error:null}
    case 'SET_CONTACTS_FAILURE':
                        return{
                            ...state,
                            isLoading:false,
                            message:{},
                            messages:[],
                            error:action.payload}
    case 'SET_CONTACT_SUCCESS':
      return {
        ...state,
         isLoading:false,
         message:action.payload,
        //  messages:state.messages.concat(action.payload)
    }
    case 'DELETE_CONTACT':
        return{
            ...state,
            isLoading:false,
            messages: state.messages.filter(p =>p._id !== action.payload),
        }
     default:
            return state;
    }
}
export default contactReducer