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
   * Action for getting the products by params.
   *
   * @params {object} context - current Vuex scope.
   * @params {object} payload - contains useful values.
   * @params {object} payload.translator_id - ID of the target translator.
   * @params {object} payload.params - query params that will be sent to API.
   * @returns {*}
   */
  fetchProgressOrders (context, payload = {}) {
    axios.get(`https://api.instantavite.com/api/orders?filter[client_id]=${payload.id}&sort=-created_at`, {
      params: payload
    })
    .then((response) => {
      context.commit('setProgressList', response.data.data)
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
  createUser (context, payload = {}) {
    return axios({
      method: 'post',
      url: 'https://api.instantavite.com/api/users',
      data: payload
    })
    .then(r => {
      return r;
    })
    .catch((e) => {return "error"});
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
  findUser (context, payload = {}) {
    return axios({
      method: 'get',
      url: `https://api.instantavite.com/api/users?filter[email]=${payload.email}`,
    })
    .then(r => {
      context.commit('setUser', r.data[0]);
      return r;
    })
    .catch((e) => {return "error"});
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
  createUser (context, payload = {}) {
    return axios({
      method: 'post',
      url: `https://api.instantavite.com/api/users`,
      data: payload
    })
    .then(r => {
      console.log('r');
      console.log(r.data);
      context.commit('setUser', r.data);
      return r;
    })
    .catch((e) => {return "error"});
  },

} // End of export default
