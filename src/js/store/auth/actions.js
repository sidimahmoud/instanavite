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
import {gep} from "../../helpers/Vuex";

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
      endpoint: '/oauth/token',
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

  /**
   * API Action to get the user data from the API by using
   * the given token.
   *
   * @param  {object} context - the context of $store
   *
   * @param  {object} payload - an object which contains option values
   *
   */
  getUserData (context, payload) {

    const method = 'get';
    const endpoint = gep('users/profile?include=roles.permissions.paths,permissions', apiPrefix);
    //const endpoint = gep('users/profile', apiPrefix);

    return APICaller({method, endpoint})
      .then((r) => {
        const data = r.data.data.user;

        context.commit('setUserData', data);
      })
      .catch((e) => {
        console.error(e);
      });
  },

  /**
   * Update the Two Factor Auth Enabler / Disabler
   *
   * @param  {object} context
   *   : the context of $store
   *
   * @param  {object} payload
   *   : an object which contains option values
   *
   * @return {*}
   */
  update2FA: function (context, payload) {

    // Define the suffix to be used for the endpoint
    let suffix = payload.enable ? 'enable' : 'disable';

    // Reach out to API
    return APICaller({
      endpoint: '/api/v1/users/1/two-factor/' + suffix,
      method: 'post',
    });

  }, // End of update2FA

  /**
   * Login impersonaion as specific user
   *
   * @param  {object} context
   *   : the context of $store
   *
   * @param  {object} payload
   *   : an object which contains option values
   *
   * @return {*}
   */
  loginAs: function (context, payload) {
    // Reach out to API
    return APICaller({
      method: 'post',
      endpoint: gep('users/login/as', apiPrefix),
      data: payload,
    });

  }, // End of update2FA

} // End of export default
