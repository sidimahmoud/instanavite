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
        state.listData = payload;
    },


} // End of export default
