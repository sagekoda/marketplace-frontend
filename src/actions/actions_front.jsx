/**
 * @description All the actions for the frontend users resides here.
 * @author Mohammed Odunayo
 * @name actions_front
 */

export const SLIDERS = 'SLIDERS';
export const CATEGORIES = 'CATEGORIES';
export const VENDORS = 'VENDORS';
export const BRANDS = 'BRANDS';
export const PRODUCTS = 'PRODUCTS';

export function getProducts() {
  return dispatch => fetch('http://www.json-generator.com/api/json/get/ceTGDOLMbS?indent=2', {method: 'GET'})
    .then(response => response.json())
    .then((json) => {
      dispatch(displayProducts(json));
    })
    .catch(error => console.log(error));
}

export function displayProducts(products) {
  
  return {
    type: PRODUCTS,
    payload: products
  }
}

export function getBrands() {
  // return dispatch => fetch('http://www.json-generator.com/api/json/get/cfXRcSJNOW?indent=2', {method: 'GET'})
  //   .then(response => response.json())
  //   .then((json) => {
  //     dispatch(displayBrands(json));
  //   })
  //   .catch(error => console.log(error));
  const brands = {
      "brands": [
          {
              "image": require("../assets/img/brand1.jpg"),
              "name": "Apple"
          },
          {
              "image": require("../assets/img/brand2.jpg"),
              "name": "Rolex"
          },
          {
              "image": require("../assets/img/brand3.jpg"),
              "name": "Nike"
          },
          {
              "image": require("../assets/img/brand4.jpg"),
              "name": "Adidas"
          },
          {
              "image": require("../assets/img/brand5.jpg"),
              "name": "Gucci"
          },
          {
              "image": require("../assets/img/brand6.jpg"),
              "name": "Calvin Klein"
          },
          {
              "image": require("../assets/img/brand7.jpg"),
              "name": "Polo"
          },
          {
              "image": require("../assets/img/brand8.jpg"),
              "name": "Dior"
          },
          {
              "image": require("../assets/img/brand9.jpg"),
              "name": "Ford"
          },
          {
              "image": require("../assets/img/brand10.jpg"),
              "name": "Audi"
          }
      ]
  };
  return dispatch => dispatch(displayBrands(brands));
}

export function displayBrands(brands) {
  
  return {
    type: BRANDS,
    payload: brands
  }
}

export function getVendors() {
  // return dispatch => fetch('http://www.json-generator.com/api/json/get/cknaNltAmW?indent=2', {method: 'GET'})
  //   .then(response => response.json())
  //   .then((json) => {
  //     dispatch(displayVendors(json));
  //   })
  //   .catch(error => console.log(error));
  const vendors = {
      "vendors": [
          {
              "email": "name@bezop.com",
              "slide": "https://images.pexels.com/photos/871495/pexels-photo-871495.jpeg?auto=compress&cs=tinysrgb&h=350",
              "name": "Paul Harris",
              "image": require("../assets/img/cat0.jpg"),
              "address": "9A, Akinyemi Street, Lagos"
          },
          {
              "email": "name@bezop.com",
              "slide": "https://images.pexels.com/photos/842811/pexels-photo-842811.jpeg?auto=compress&cs=tinysrgb&h=350",
              "name": "Handy Andy Home Improvement Center",
              "image": require("../assets/img/cat1.jpg"),
              "address": "145, Warri-Sapele Road, Warri Central, Delta"
          },
          {
              "email": "name@bezop.com",
              "slide": "https://images.pexels.com/photos/404168/pexels-photo-404168.jpeg?auto=compress&cs=tinysrgb&h=350",
              "name": "Band Seung",
              "image": require("../assets/img/cat2.jpg"),
              "address": "27-7, Bookri, Bogil-myeon, Wando-gun, Jeollanam-do, Korea"
          },
          {
              "email": "name@bezop.com",
              "slide": "https://images.pexels.com/photos/341523/pexels-photo-341523.jpeg?auto=compress&cs=tinysrgb&h=350",
              "name": "Cal Stereo",
              "image": require("../assets/img/cat3.jpg"),
              "address": "Windhoek, Namibia"
          },
          {
              "email": "name@bezop.com",
              "slide": "https://images.pexels.com/photos/463467/pexels-photo-463467.jpeg?auto=compress&cs=tinysrgb&h=350",
              "name": "Rainbow Life",
              "image": require("../assets/img/cat4.jpg"),
              "address": "21 Newgreen Rd, Mandeville, Mandeville,  Jamaica"
          },
          {
              "email": "name@bezop.com",
              "slide": "https://images.pexels.com/photos/871495/pexels-photo-871495.jpeg?auto=compress&cs=tinysrgb&h=350",
              "name": "Prestigabiz",
              "image": require("../assets/img/cat0.jpg"),
              "address": "2264  Telford Ave, Mothibistad, North West, South Africa"
          },
          {
              "email": "name@bezop.com",
              "slide": "https://images.pexels.com/photos/842811/pexels-photo-842811.jpeg?auto=compress&cs=tinysrgb&h=350",
              "name": "Joseph Magnin",
              "image": require("../assets/img/cat1.jpg"),
              "address": "Unit 16, 1st Fl., Dental Trade Center, Bet. Mortazavi Brdg & Shahrdary, Navvab Exp. Way, Tehran, Iran"
          },
          {
              "email": "name@bezop.com",
              "slide": "https://images.pexels.com/photos/404168/pexels-photo-404168.jpeg?auto=compress&cs=tinysrgb&h=350",
              "name": "Mode O",
              "image": require("../assets/img/cat2.jpg"),
              "address": "27 Roxy Square; Heliopolis; Cairo, Egypt"
          },
          {
              "email": "name@bezop.com",
              "slide": "https://images.pexels.com/photos/341523/pexels-photo-341523.jpeg?auto=compress&cs=tinysrgb&h=350",
              "name": "Food Giant",
              "image": require("../assets/img/cat3.jpg"),
              "address": "102  Rue de la Pompe, MAMOUDZOU, Mayotte, France"
          },
          {
              "email": "name@bezop.com",
              "slide": "https://images.pexels.com/photos/463467/pexels-photo-463467.jpeg?auto=compress&cs=tinysrgb&h=350",
              "name": "Kinney Shoes",
              "image": require("../assets/img/cat4.jpg"),
              "address": "Mohajreen, Damascus, Syria"
          }
      ]
  };
  return dispatch => dispatch(displayVendors(vendors));
}

export function displayVendors(vendors) {
  
  return {
    type: VENDORS,
    payload: vendors
  }
}

export function getCategories() {
  // return dispatch => fetch('http://www.json-generator.com/api/json/get/bPWNcDZhAi?indent=2', {method: 'GET'})
  //   .then(response => response.json())
  //   .then((json) => {
  //     dispatch(displayCategories(json));
  //   })
  //   .catch(error => console.log(error));
  const categories = {
      "categories": [
          {
              "info": "Visit our women fashion collection and order for yours.",
              "image": require("../assets/img/cat0.jpg"),
              "name": "Women Fashion"
          },
          {
              "info": "Visit our men fashion collection and order for yours.",
              "image": require("../assets/img/cat1.jpg"),
              "name": "Men Fashion"
          },
          {
              "info": "Visit our shoes collection and order for yours.",
              "image": require("../assets/img/cat2.jpg"),
              "name": "Shoes"
          },
          {
              "info": "Visit our phones collection and order for yours.",
              "image": require("../assets/img/cat3.jpg"),
              "name": "Phones"
          },
          {
              "info": "Visit our bags collection and order for yours.",
              "image": require("../assets/img/cat4.jpg"),
              "name": "Bags"
          },
          {
              "info": "Visit our women fashion collection and order for yours.",
              "image": require("../assets/img/cat0.jpg"),
              "name": "Women Fashion"
          },
          {
              "info": "Visit our men fashion collection and order for yours.",
              "image": require("../assets/img/cat1.jpg"),
              "name": "Men Fashion"
          },
          {
              "info": "Visit our shoes collection and order for yours.",
              "image": require("../assets/img/cat2.jpg"),
              "name": "Shoes"
          },
          {
              "info": "Visit our phones collection and order for yours.",
              "image": require("../assets/img/cat3.jpg"),
              "name": "Phones"
          },
          {
              "info": "Visit our bags collection and order for yours.",
              "image": require("../assets/img/cat4.jpg"),
              "name": "Bags"
          }
      ]
  };
  return dispatch => dispatch(displayCategories(categories));
}

export function displayCategories(categories) {
  
  return {
    type: CATEGORIES,
    payload: categories
  }
}

export function getSliders() {
  // return dispatch => fetch('http://www.json-generator.com/api/json/get/bPTZPnkOtK?indent=2', {method: 'GET'})
  //   .then(response => response.json())
  //   .then((json) => {
  //     dispatch(displaySliders(json));
  //   })
  //   .catch(error => console.log(error));
  const sliders = {
      "sliders": [
          {
              "image": require("../assets/img/img1.jpg"),
              "captionInfo": "Worlds First Decentralized Store",
              "key": 1,
              "captionHead": "Bezop Store"
          },
          {
              "image": require("../assets/img/img2.jpg"),
              "captionInfo": "Worlds First Decentralized Store",
              "key": 2,
              "captionHead": "Bezop Store"
          },
          {
              "image": require("../assets/img/img3.jpg"),
              "captionInfo": "Worlds First Decentralized Store",
              "key": 3,
              "captionHead": "Bezop Store"
          },
          {
              "image": require("../assets/img/img4.jpg"),
              "captionInfo": "Worlds First Decentralized Store",
              "key": 4,
              "captionHead": "Bezop Store"
          },
          {
              "image": require("../assets/img/img5.jpg"),
              "captionInfo": "Worlds First Decentralized Store",
              "key": 4,
              "captionHead": "Bezop Store"
          }
      ]
  };
  return dispatch => dispatch(displaySliders(sliders));
}

export function displaySliders(sliders) {
  return {
    type: SLIDERS,
    payload: sliders
  }
}
