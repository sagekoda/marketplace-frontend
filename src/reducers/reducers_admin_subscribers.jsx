//@desc subscribers list reducers on the admin marketplace
//@author Sylvia Onwukwe
import { 
    FETCH_SUBSCRIBERS,
    DELETE_SUBSCRIBER
     } from "../actions/actions_admin_subscribers";
    
    const subscriber = (state = {}, action) => {
        let output;
        switch(action.type){
            case FETCH_SUBSCRIBERS:
                output = {subscribers: action.payload};
            break;
            case DELETE_SUBSCRIBER:
                output = {deleteSubscriber: action.payload}
            break;
            default:
                output = state;
            break;
        }
    
        return output;
    }
    
    export default subscriber;