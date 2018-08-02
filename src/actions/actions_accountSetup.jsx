/**
 * @description All the actions for vendor account setup resides here.
 * @author Mohammed Odunayo
 * @name actions_accountSetup
 */

export const SLIDERS = 'SLIDERS';
export const CATEGORIES = 'CATEGORIES';
export const VENDORS = 'VENDORS';
export const BRANDS = 'BRANDS';
export const PRODUCTS = 'PRODUCTS';

export function getVendor() {
  return dispatch => fetch('http://www.json-generator.com/api/json/get/ceTGDOLMbS?indent=2', {method: 'GET'})
    .then(response => response.json())
    .then((json) => {
      dispatch(displayProducts(json));
    })
    .catch(error => console.log(error));
}