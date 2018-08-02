//@desc the admin profile reducers used by Redux
//@author Sylvia Onwukwe
import { 
    FETCH_ADMIN_PROFILE_DETAILS,
    UPDATE_ADMIN_PROFILE,
    DELETE_ADMIN_PROFILE_DETAILS
     } from "../actions/actions_admin_profile";
    
    const adminProfile = (state = {}, action) => {
        let output;
        switch(action.type){
            case FETCH_ADMIN_PROFILE_DETAILS:
                output = {profile: action.payload};
            break;
            case UPDATE_ADMIN_PROFILE:
                output = {updateProfile: action.payload}
            break;
            case DELETE_ADMIN_PROFILE_DETAILS:
                output = {deleteProfile: action.payload}
            break;
            default:
                output = state;
            break;
        }
    
        return output;
    }
    
    export default adminProfile;