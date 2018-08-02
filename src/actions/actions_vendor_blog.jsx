import 'whatwg-fetch';
export const POST_BLOG_DETAILS = 'POST_BLOG_DETAILS';
export const FETCH_BLOGS = "FETCH_BLOGS";
export const UPDATE_BLOG_DETAILS = "UPDATE_BLOG_DETAILS";
export const DELETE_BLOG = "DELETE_BLOG";

export function loadBlogs(result){
  return {
    type: FETCH_BLOGS,
    payload: result
  }
}

export function fetchBlogs(){
  return dispatch => fetch(`${process.env.REACT_APP_API_URL_CALL}/api/v1/blogs`,
 {
    method: 'GET',
    headers: {
      "authorization" : `Bearer ${JSON.parse(localStorage["bezop-login:vendor"]).accessToken}`
    }
  })
 .then(response => response.json())
 .then(json => {
   dispatch(loadBlogs(json));
 })
 .catch(error => console.log(error))

}


export function loadBlogDetail(results) {
  return {
    type: POST_BLOG_DETAILS,
    payload: results,
  };
}


export function postBlogDetails(blogDetails) {
  return dispatch => fetch(`${process.env.REACT_APP_API_URL_CALL}/api/v1/blogs`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      "authorization" : `Bearer ${JSON.parse(localStorage["bezop-login:vendor"]).accessToken}`
    },
    body: JSON.stringify(blogDetails)
  })
    .then(response => response.json())
    .then((json) => {
      dispatch(loadBlogDetail(json));
    })
    .catch(error => console.log(error));
}

export function loadUpdatedBlogDetails(results){
  return {
    type: UPDATE_BLOG_DETAILS,
    payload: results,
  };
}

export function putBlogDetails(blogDetails, blogID) {
return dispatch => fetch(`${process.env.REACT_APP_API_URL_CALL}/api/v1/blogs/${blogID}`, {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      "authorization" : `Bearer ${JSON.parse(localStorage["bezop-login:vendor"]).accessToken}`
    },
    body: JSON.stringify(blogDetails)
  })
    .then(response => response.json())
    .then((json) => {
      dispatch(loadUpdatedBlogDetails(json));
    })
    .catch(error => console.log(error));
}

export function loadDeleteBlog(results){
  return {
    type: DELETE_BLOG,
    payload: results,
    
  };
}

export function deleteBlog(blogID) {
return dispatch => fetch(`${process.env.REACT_APP_API_URL_CALL}/api/v1/blogs/${blogID}`, {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      "authorization" : `Bearer ${JSON.parse(localStorage["bezop-login:vendor"]).accessToken}`
    },
  })
    .then(response => response.json())
    .then((json) => {
      dispatch(loadDeleteBlog(json));
    })
    .catch(error => console.log(error));
}




