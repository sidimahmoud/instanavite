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
import i18n from '../../i18n';
const LANGUAGE_KEY = 'app_language';

export default {

    /**
   * Method to save the language upon selecting it.
   *
   * @param {object} state - vuex state of current store scope.
   * @param {*} payload - contains mixed values necessary inside the method.
   *
   * @return {void}
   */
  saveLanguage(state, payload) {
    state.language = payload;
    i18n.locale=payload;
    localStorage.setItem(LANGUAGE_KEY, payload);
  },
  /**
   * Method to load the language upon site initialization.
   *
   * @param {object} state - vuex state of current store scope.
   *
   * @return {void}
   */
  loadLanguage(state) {
    const lang = localStorage.getItem(LANGUAGE_KEY);
    if (!_.isNil(lang)) {
      i18n.locale = lang;
      state.language = lang;
    } else {
      i18n.locale = 'se';
      state.language = 'se'
    }
  },

} // End of export default
