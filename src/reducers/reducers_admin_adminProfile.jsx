//@desc admin profile reducer used by redux
//@author Sylvia Onwukwe
import {
    UPDATE_ADMIN_PROFILE,
    FETCH_ADMIN_PROFILE
} from "../actions/actions_admin_adminProfile";

const adminProfile = (state = {}, actions) => {
    let output;
    switch(actions.type){
        case UPDATE_ADMIN_PROFILE:
            output = {updateProfile: actions.payload};
        break;
        case FETCH_ADMIN_PROFILE:
            output = {getProfile: actions.payload};
        break;
        default:
            output = state;
        break;
    }

    return output;
}

export default adminProfile; 