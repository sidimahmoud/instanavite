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

    return APICaller({
      method: 'post',
      endpoint: '/api/oauth/token',
      data: payload.data,
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
        console.groupEnd();

      }

        return r;
      })
      .catch((e) => e);

  }, // End of requestAccessToken method

} // End of export default
