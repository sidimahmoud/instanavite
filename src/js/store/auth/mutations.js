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

import {isEmpty} from '../../helpers/Common';

export default {

    /**
     * Pullout the token from the local storage upon initial Vue run
     *
     * @param  {object} state
     *   : the state property the current Vuex Object
     *
     * @return {void}
     */
    initAccessToken: function (state) {

        // Get token from localStorage
        let token = localStorage.getItem("app_access_token");

        console.group('Access Token Verification');

        // Set the state of token
        if (isEmpty(token)) {

            // Warn user that there is no token.
            console.error('There is no token value.');

        } else {

            console.groupCollapsed('Expand to view token' + '( ' + token.substr(0, 5) + '...' + ')');
            console.log(token);
            console.groupEnd();

            // Set the token into this module's state.
            state.accessToken = token;
        }

        console.groupEnd();

    }, // End of initAccessToken method

    /**
     * Set the accessToken
     *
     * @param  {object} state
     *   : the state property the current Vuex Object
     *
     * @param {string} token
     *   : the access token that was fetch from the API
     *
     * @return {void}
     */
    setAccessToken: function (state, token) {

        console.group('Access Token Update');
        console.groupCollapsed('Expand to view token' + '( ' + token.substr(0, 5) + '...' + ')');
        console.log(token);
        console.groupEnd();
        console.groupEnd();

        // Set the state of the token, and store it to localStorage
        state.accessToken = token;
        localStorage.setItem('app_access_token', token);

    }, // End of setAccessToken method

    /**
     * Destory the accessToken
     *
     * @param  {object} state
     *   : the state property the current Vuex Object
     *
     * @return {void}
     */
    destroyAccessToken: function (state) {

        console.log('Clearing Access Token');

        // Destroy the token and its state
        state.accessToken = null;
        //localStorage.removeItem('app_access_token');


    }, // End of destroyAccessToken method


    /**
     * Pullout the userData from the local storage
     *
     * @param  {object} state
     *   : the state property the current Vuex Object
     *
     * @return {void}
     */
    initUserData: function (state) {

        // if (state.hasAccessToken) {

            // If token exists, get the user data from localStorage
            state.userData = JSON.parse(localStorage.getItem("app_user_data"));

            console.group('Initializing User Data');
            console.log('User Data is :', state.userData);
            console.groupEnd();
        // }

    }, // End of initUserDetails method


    /**
     * Set the userData
     *
     * @param  {object} state
     *   : the state property the current Vuex Object
     *
     * @param  {object} userData
     *   : an object which contains the user's data
     *
     * @return {void}
     */
    setUserData: function (state, userData) {

        // Set userData values and store it to localStorage
        state.userData = userData;
        localStorage.setItem('app_user_data', JSON.stringify(userData));

        console.group('Updating User Data');
        console.log('User Data is :', userData);
        console.groupEnd();

    }, // End of setUserData method

    /**
     * Delete the userData
     *
     * @param  {object} state
     *   : the state property the current Vuex Object
     *
     * @return {void}
     */
    destroyUserData: function (state) {

        // Remove userData values and delete it from localStorage
        state.userData = {};
        localStorage.removeItem('app_user_data');

        console.log('Clearing User Data');

    }, // End of destroyUserData method

    /**
     * Pullout the userRoles from the local storage
     *
     * @param  {object} state
     *   : the state property the current Vuex Object
     *
     * @return {void}
     */
    initUserRoles: function (state) {

        // If token exists, run this
        if (state.hasAccessToken) {

            console.group('Initializing User Roles');

            state.userRoles = JSON.parse(localStorage.getItem("app_user_roles"));

            console.log('User Roles :', state.userRoles);

            console.groupEnd();

        } // End of if...

    }, // End of initUserRoles method

    /**
     * Set the userRoles
     *
     * @param  {object} state
     *   : the state property the current Vuex Object
     *
     * @param  {array} userRoles
     *   : the collection of roles that was associated to the user.
     *
     * @return {void}
     */
    setUserRoles: function (state, userRoles) {

        console.group('Updating User Roles');

        state.userRoles = userRoles;
        console.log('Users Roles:', userRoles);

        localStorage.setItem('app_user_roles', JSON.stringify(state.userRoles));

        console.groupEnd();
    }, // End of setUserRoles method

    /**
     * Delete the userRoles
     *
     * @param  {object} state
     *   : the state property the current Vuex Object
     *
     * @return {void}
     */
    destroyUserRoles: function (state) {
        console.group('Clearing User Roles');
        console.log('Resetting User Role Status');
        console.groupEnd();

        state.userRoles = {};
        state.isSuperAdmin = false;
        state.isConsumer = false;
        state.isMerchant = false;
        state.isGuest = false;
        localStorage.removeItem('app_user_roles');
        localStorage.removeItem('app_user_role_status');
    }, // End of destroyUserRoles method

    /**
     * Update state > twoFactorEnabled value
     *
     * @param  {object} state
     *   : the state property the current Vuex Object
     *
     * @param  {object} payload
     *   : an object which contains option values
     *
     * @return {void}
     */
    enableTwoFactor: function (state, payload) {
        state.twoFactorEnabled = payload;
    },

    /**
     * Update state > qrCode value
     *
     * @param  {object} state
     *   : the state property the current Vuex Object
     *
     * @param  {object} payload
     *   : an object which contains option values
     *
     * @return {void}
     */
    addQrCode: function (state, payload) {
        state.qrCode = payload;
    }

} // End of export default
