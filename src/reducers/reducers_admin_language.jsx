//@desc language reducers on the admin marketplace
//@author Sylvia Onwukwe
import { 
    POST_STORE_LANGUAGE,
    FETCH_STORE_LANGUAGES,
    UPDATE_STORE_LANGUAGE,
    DELETE_STORE_LANGUAGE
     } from "../actions/actions_admin_language";
    
    const adminLanguage = (state = {}, action) => {
        let output;
        switch(action.type){
            case POST_STORE_LANGUAGE:
                output = {addLanguage: action.payload};
            break;
            case FETCH_STORE_LANGUAGES:
                output = {language: action.payload};
            break;
            case UPDATE_STORE_LANGUAGE:
                output = {updateLanguage: action.payload}
            break;
            case DELETE_STORE_LANGUAGE:
                output = {deleteLanguage: action.payload}
            break;
            default:
                output = state;
            break;
        }
    
        return output;
    }
    
    export default adminLanguage;