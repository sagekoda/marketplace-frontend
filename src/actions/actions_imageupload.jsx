import 'whatwg-fetch';
export const PUT_IMAGE = 'PUT_IMAGE';

export function loadImageUpload(results) {
    return {
      type: PUT_IMAGE,
      payload: results,
    };
  }
  
  
export function postImage(imageDetail, collectionId) {
  return dispatch => fetch(`${process.env.REACT_APP_API_URL_CALL}/api/v1/media/${collectionId}`, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        "authorization" : `Bearer ${JSON.parse(localStorage["bezop-login:vendor"]).accessToken}`
      },
      body: JSON.stringify(imageDetail)
    })
      .then(response => response.json())
      .then((json) => {
        dispatch(loadImageUpload(json));
      })
      .catch(error => console.log(error));
}
  