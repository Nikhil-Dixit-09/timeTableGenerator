import { combineReducers } from "redux";
import clas from './clas'
import auth from './auth'
import user from './user'
export default combineReducers({
    clas,auth,user
});