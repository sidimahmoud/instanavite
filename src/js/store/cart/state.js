/*
|--------------------------------------------------------------------------
| Store > cart > State
|--------------------------------------------------------------------------
|
| This file contains the state property of Auth Vuex Module
|
| You may freely extend this store file if the store file that you will
| be building has similar characteristics.
|
*/
'use strict';
let cart = window.localStorage.getItem('cart');
let cartCount = window.localStorage.getItem('cartCount');
let cartTotal = window.localStorage.getItem('cartTotal');
let cartAddress = window.localStorage.getItem('cartAddress');
let cartPostal = window.localStorage.getItem('cartPostal');
let cartCoordinates = window.localStorage.getItem('cartCoordinates');

export default {  
    cart: cart ? JSON.parse(cart) : [],
    cartCount: cartCount ? parseInt(cartCount) : 0,
    cartTotal: cartTotal ? parseFloat(cartTotal) : 0,
    tips : 0,
    cartAddress: cartAddress ? cartAddress : '',
    cartPostal: cartPostal ? cartPostal : '',
    cartCoordinates: cartCoordinates? cartCoordinates: '',
} // End of export default