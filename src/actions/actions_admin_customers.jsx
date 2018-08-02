//@desc the customers action used by redux on admin marketplace
//@author Sylvia Onwukwe
import 'whatwg-fetch';
export const FETCH_CUSTOMERS = "FETCH_CUSTOMERS";
export const DELETE_CUSTOMERS = "DELETE_CUSTOMERS";


export function loadCustomers(result){
  return {
    type: FETCH_CUSTOMERS,
    payload: result
  }
}

export function fetchCustomers(){
  return dispatch => fetch(`${process.env.REACT_APP_PROD_API_URL}/customers`,
 { method: 'GET'})
 .then(response => response.json())
 .then(json => {
   dispatch(loadCustomers(json));
 })
 .catch(error => console.log(error))

}

export function loadDeleteCustomers(results){
  return {
    type: DELETE_CUSTOMERS,
    payload: results,
  };
}

export function deleteCustomers(customerID) {
  console.log(customerID);
  return dispatch => fetch(`${process.env.REACT_APP_PROD_API_URL}/customers/${customerID}`, {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
  })
    .then(response => response.json())
    .then((json) => {
      dispatch(loadDeleteCustomers(json));
    })
    .catch(error => console.log(error));
}




