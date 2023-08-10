import { DELETE_CATEGORY, SET_CATEGORIES,SET_CATEGORY,UPDATE_CATEGORY,PUSH_SUBCATEGORY_REQUEST,PULL_SUBCATEGORY_REQUEST} from "../types"
const initialState={
    isLoading:false,
    category:{},
    categories:[],
    error: null,
}
const categoryReducer=(state=initialState,action)=>{
    switch(action.type){
      case 'SET_CATEGORIES_REQUEST':
                        return{
                            ...state,
                            isLoading:true,
                            error:null}
    case 'SET_CATEGORIES_SUCCESS':
                        return{
                            ...state,
                            isLoading:false,
                            category:{},
                            categories:action.payload,
                            error:null}
    case 'SET_CATEGORIES_FAILURE':
                        return{
                            ...state,
                            isLoading:false,
                            category:{},
                            categories:[],
                            error:action.payload}
    case 'SET_CATEGORY_SUCCESS':
      return {
        ...state,
         isLoading:false,
        category:action.payload,
        categories:state.categories.concat(action.payload)
    }
                            
        case SET_CATEGORY:
            return{

                ...state,
                isLoading:false,
                category:action.payload,
                categories:state.categories.concat(action.payload)
            }
            case SET_CATEGORIES:
            return{
                ...state,
                categories:action.payload,
                isLoading:false,
            }
            case DELETE_CATEGORY:
             return {
              ...state,
              isLoading:false,
              categories: state.categories.filter(p =>p._id !== action.payload),
              }
            case 'UPDATE_CATEGORY':
              const updatedCategory = action.payload;
                    const updatedcategories = state.categories.map((c) =>
                      c._id === updatedCategory._id ? updatedCategory : c
                    );
                    return {
                      ...state,
                      isLoading: false,
                      category: updatedCategory,
                      categories: updatedcategories,
                      error: null,
                    };
                    
                  
                    
            case 'PUSH_SUBCATEGORY_REQUEST':
                return {
                  ...state,
                  isLoading: true,
                  error: null,
                  data: null,
                };
              case 'PUSH_SUBCATEGORY_SUCCESS':
                return {
                  ...state,
                  isLoading: false,
                  data: action.payload,
                };
              case 'PUSH_SUBCATEGORY_FAILURE':
                return {
                  ...state,
                  isLoading: false,
                  error: action.payload,
                };
                case 'PULL_SUBCATEGORY_REQUEST':
                return {
                  ...state,
                  isLoading: true,
                  error: null,
                  data: null,
                };
              case 'PULL_SUBCATEGORY_SUCCESS':
                return {
                  ...state,
                  isLoading: false,
                  data: action.payload,
                };
              case 'PULL_SUBCATEGORY_FAILURE':
                return {
                  ...state,
                  isLoading: false,
                  error: action.payload,
                };
              default:
                return state;
    }
}
export default categoryReducer