//@desc blog reducers on the admin marketplace
//@author Sylvia Onwukwe
import { 
    FETCH_BLOG,
    DELETE_BLOG
     } from "../actions/actions_admin_blog.jsx";
    
    const adminBlog = (state = {}, action) => {
        let output;
        switch(action.type){
            case FETCH_BLOG:
                output = {blog: action.payload};
            break;
            case DELETE_BLOG:
                output = {deleteBlog: action.payload}
            break;
            default:
                output = state;
            break;
        }
    
        return output;
    }
    
    export default adminBlog;