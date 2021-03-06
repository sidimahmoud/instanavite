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
    listData: (state) => state.listData,
    listPagination: (state) => state.pagination,
    getItem: (state) => state.item,

} // End of export default

