import { combineReducers } from "redux";
import authReducer from './authReducer'
import userReducer from './userReducer'
import roleReducer from './roleReducer'
import errorsReducer from './errorsReducer'
import categoryReducer from "./categoryReducer";
import subcategoryReducer from "./subcategReducer";
import componentReducer from "./componentReducer";
import paramReducer from "./paramReducer";
import nodesReducer from "./nodesReducer";
import flowReducer from "./flowReducer";
import contactReducer from "./contactReducer";
export default combineReducers({
    auth:authReducer, //authSlice
    errors: errorsReducer, //errorSlice
    users:userReducer,
    roles: roleReducer,
    categorie:categoryReducer,
    souscategories:subcategoryReducer,
    components:componentReducer,
    params:paramReducer,
    nodes:nodesReducer,
    flows:flowReducer,
    contact:contactReducer,
})