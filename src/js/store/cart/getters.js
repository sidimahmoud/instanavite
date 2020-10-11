/*
|--------------------------------------------------------------------------
| Store > Auth > Getters
|--------------------------------------------------------------------------
|
| This file contains the getters property of Auth Vuex Module
|
| You may freely extend this store file if the store file that you will
| be building has similar characteristics.
|
*/
'use strict';

export default {
    cartData: (state) => state.cart,
    cartCount: (state) => state.cartCount,
    cartTotal: (state) => state.cartTotal,
    cartAllTotal: (state) =>  parseFloat(state.cartTotal + state.tips + 4).toFixed(2),
    getTips: (state) => state.tips,
    cartAddress: (state) => state.cartAddress,
    cartPostal: (state) => state.cartPostal,
    cartCoordinates: (state) => state.cartCoordinates,
} // End of export default

