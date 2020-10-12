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
  sendMessage (context, payload = {}) {
    axios({
      method: 'post',
      url: 'https://api.instantavite.com/api/questions',
      data: payload.data
    })
    .then((response) => {
      return response;
    });
  }, // End of requestAccessToken method

  /**
   * Action for getting the products.
   *
   * @params {object} context - current Vuex scope.
   * @params {object} payload - contains useful values.
   * @params {object} payload.translator_id - ID of the target translator.
   * @params {object} payload.params - query params that will be sent to API.
   * @returns {*}
   */
  getList (context, payload = {}) {
    axios.get(`https://api.instantavite.com/api/questions?filter[email]=${payload.user_id}`)
    .then((response) => {
      context.commit('setList', response.data)
    });
  }, // End of requestAccessToken method


} // End of export default
