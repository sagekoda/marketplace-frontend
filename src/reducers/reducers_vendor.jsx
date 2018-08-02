import {
    UPDATE_VENDOR_PROFILE,
    FETCH_VENDOR_PROFILE
} from "../actions/actions_vendor";

const vendorProfile = (state = {}, actions) => {
    let output;
    let data;
    switch(actions.type){
        case UPDATE_VENDOR_PROFILE:
            data = actions.payload.success ? actions.payload.data : "There was error updating the vendor's profile"
            output = {updateProfile: data};
        break;
        case FETCH_VENDOR_PROFILE:
            data = actions.payload.success ? actions.payload.data : "There was error fetching the vendor's profile"
            output = {getProfile: data};
        break;
        default:
            output = state;
        break;
    }

    return output;
}

export default vendorProfile; 