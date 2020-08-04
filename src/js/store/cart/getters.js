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

import {isEmpty} from "../../helpers/Common";

export default {
    cartData: (state) => state.cart,
    cartCount: (state) => state.cartCount,

} // End of export default
