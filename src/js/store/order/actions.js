/*
|--------------------------------------------------------------------------
| Store > product > Actions
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
   * Action for getting the products by params.
   *
   * @params {object} context - current Vuex scope.
   * @params {object} payload - contains useful values.
   * @params {object} payload.translator_id - ID of the target translator.
   * @params {object} payload.params - query params that will be sent to API.
   * @returns {*}
   */
  fetchOrder (context, payload = {}) {
    axios.get(`https://api.instantavite.com/api/orders/${payload.id}?include=products.product,driver.driver`)
    .then((response) => {
      context.commit('setItemData', response.data)
    });
  }, // End of requestAccessToken method
  /**
   * Action for getting the products by params.
   *
   * @params {object} context - current Vuex scope.
   * @params {object} payload - contains useful values.
   * @params {object} payload.translator_id - ID of the target translator.
   * @params {object} payload.params - query params that will be sent to API.
   * @returns {*}
   */
  recieptOrder (context, payload = {}) {
    axios.get(`https://api.instantavite.com/api/get-reciept`)
    .then((response) => {
    });
  },
  /**
   * Action for getting the products by params.
   *
   * @params {object} context - current Vuex scope.
   * @params {object} payload - contains useful values.
   * @params {object} payload.translator_id - ID of the target translator.
   * @params {object} payload.params - query params that will be sent to API.
   * @returns {*}
   */
  rateOrder (context, payload = {}) {
    axios({
      method: 'post',
      url: `https://api.instantavite.com/api/order/${payload.order_id}/rate`,
      data: payload
    })
    .then((response) => {
      Notification({
        title: 'Success',
        message: 'Thank you for your rate.',
        type: 'success'
      });
      return response;
    });
  },

} // End of export default
