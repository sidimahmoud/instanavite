/*
|--------------------------------------------------------------------------
| Store > Auth > Actions
|--------------------------------------------------------------------------
|
| This file contains the actions property of Auth Vuex Module
|
| You may freely extend this store file if the store file that you will
| be building has similar characteristics.
|
*/
'use strict';

import APICaller from "../../helpers/APICaller";

let apiPrefix = window.app_api_prefix_3;

export default {

  /**
   * Reach out to API for token request
   *
   * @param  {object} context
   *   : the context of $store
   *
   * @param  {object} payload
   *   : an object which contains option values
   *
   * @return {*}
   */
  requestAccessToken: function (context, payload) {

    return axios({
        method: 'post',
        url: 'https://api.instantavite.com/oauth/token',
        data: payload.data
      })
      .then((r) => {
        //if response return qr and access_code
        //return
        if(r.data.token_type === 'Bearer'){
        let token = r.data.access_token;
        let userData = r.data.user;
        console.group('Gathering Login Responses');
        context.commit('setAccessToken', token);
        context.commit('setUserData', userData);
        context.dispatch('getUserData');
        console.groupEnd();

      }

        return r;
      })
      .catch((e) => e);

  }, // End of requestAccessToken method

  getUserData: function (context, payload) {

    let token = localStorage.getItem("app_access_token")
    return axios({
      method: 'get',
      url: 'https://api.instantavite.com/api/users/current',
      headers: {'Authorization': `Bearer ${token}`},
    })
    .then((r) => {
      let userData = r.data;
      context.commit('setUserData', userData);
      return r;
    })
    .catch((e) => e);
    
  }

} // End of export default
