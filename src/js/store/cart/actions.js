/*
|--------------------------------------------------------------------------
| Store > cart > Actions
|--------------------------------------------------------------------------
|
| This file contains the actions property of Auth Vuex Module
|
| You may freely extend this store file if the store file that you will
| be building has similar characteristics.
|
*/
'use strict';
import { Notification } from 'element-ui';


export default {

  /**
   * Action for getting the products.
   *
   * @params {object} context - current Vuex scope.
   * @params {object} payload - contains useful values.
   * @params {object} payload.translator_id - ID of the target translator.
   * @params {object} payload.params - query params that will be sent to API.
   * @returns {*}
   */
  async createOrder (context, payload = {}) {
    await axios({
      method: 'post',
      url: 'https://api.instantavite.com/api/orders',
      data: payload
    })
    .then((response) => {
      Notification({
        title: 'Success',
        message: 'Thank you for your order we will deliver soon.',
        type: 'success'
      });
      return response;
    })
    .catch((e) => {
      Notification({
        title: 'Error',
        message: e,
        type: 'error'
      });
      return e;
    });
  }, // End of requestAccessToken method



} // End of export default
