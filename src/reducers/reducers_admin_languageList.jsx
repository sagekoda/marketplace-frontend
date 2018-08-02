//@desc language list reducers on the admin marketplace
//@author Sylvia Onwukwe
import { 
    POST_LANGUAGE_LIST,
    FETCH_LANGUAGES_LIST,
    UPDATE_LANGUAGE_LIST,
    DELETE_LANGUAGE_LIST
     } from "../actions/actions_admin_languageList";
    
    const languageList = (state = {}, action) => {
        let output;
        switch(action.type){
            case POST_LANGUAGE_LIST:
                output = {addLanguageList: action.payload};
            break;
            case FETCH_LANGUAGES_LIST:
                output = {languagesList: action.payload};
            break;
            case UPDATE_LANGUAGE_LIST:
                output = {updateLanguageList: action.payload}
            break;
            case DELETE_LANGUAGE_LIST:
                output = {deleteLangauageList: action.payload}
            break;
            default:
                output = state;
            break;
        }
    
        return output;
    }
    
    export default languageList;