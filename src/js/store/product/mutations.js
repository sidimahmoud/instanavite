/*
|--------------------------------------------------------------------------
| Store > Auth > Mutations
|--------------------------------------------------------------------------
|
| This file contains the mutations property of Auth Vuex Module
|
| You may freely extend this store file if the store file that you will
| be building has similar characteristics.
|
*/
'use strict';

import Vue from 'vue';
import { Notification } from 'element-ui';
import {isEmpty} from '../../helpers/Common';

export default {

    setList(state, payload) {
        state.listData = payload.data;

        //set the pagination of products
        state.pagination.per_page = payload.per_page;
        state.pagination.current_page = payload.current_page;
        state.pagination.total = payload.total;
    },

    setItem(state, payload) {
        state.item = payload.data;
        console.log('state.item');
        console.log(state.item);
    },

} // End of export default
