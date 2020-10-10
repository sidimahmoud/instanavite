/*
|--------------------------------------------------------------------------
| Store > Auth > Getters
|--------------------------------------------------------------------------
|
| This file contains the getters property of Auth Vuex Module
|
| You may freely extend this store file if the store file that you will
| be building has similar characteristics.
|
*/
'use strict';

import {isEmpty} from "../../helpers/Common";

export default {

    /**
     * Get the User's email
     *
     * @param  {object} state
     *   : the current state of the current Vuex Object
     *
     * @return {string}
     */
    userEmail: (state) => state.userData.email,

    /**
     * Get the User's name
     *
     * @param  {object} state
     *   : the current state of the current Vuex Object
     *
     * @return {string}
     */
    userName: (state) => state.userData.name,

    /**
     * Get the User's name
     *
     * @param  {object} state
     *   : the current state of the current Vuex Object
     *
     * @return {string}
     */
    userID: function (state) {

        return isEmpty(state.userData) ? "" : state.userData.id;
    }, // End of userEmail getter method

    /**
     * Get the hasAccessToken value
     *
     * @return {boolean}
     */
    hasAccessToken: function () {

        // Get the API Access Token from localStorage
        let t = localStorage.getItem("app_access_token");

        return isEmpty(t);
    },

    /**
     * Returns access token from local storage.
     * @returns {string}
     */
    accessToken () {
        return localStorage.getItem("app_access_token");
    },

    //check users data
    hasUserData: function () {

        // Get the API Access Token from localStorage
        let t = localStorage.getItem("app_user_data");
        return !isEmpty(t);
    },

    /**
     * Get the User Data
     *
     * @param  {object} state
     *   : the current state of the current Vuex Object
     *
     * @return {object}
     */
    userData: function (state) {
        console.log('get userData');
        console.log(state.userData);
        if (!isEmpty(state.userData) && state.userData.id.length <= 0) {
            let t = localStorage.getItem("app_user_data");
            if (!isEmpty(t)) {
                state.userData = JSON.parse(t);
            }
        }
        
        return state.userData;
    },

    /**
     * Get the User Roles
     *
     * @param  {object} state
     *   : the current state of the current Vuex Object
     *
     * @return {object}
     */
    userRoles: function (state) {
        if (typeof state.userData.roles != 'undefined') {
            return state.userData.roles;
        }
        return [];
    },

    userRoleNames(state) {
        let names = [];
        if (typeof state.userData.roles != 'undefined') {
            for (let r of state.userData.roles) {
                names.push(r.name);
            }
        }
        return names;
    },

    userRoleLabels(state) {
        let labels = [];
        if (typeof state.userData.roles != 'undefined') {
            for (let r of state.userData.roles) {
                labels.push(r.label);
            }
        }
        return labels;
    },

    userRolePaths(state, getter) {
        let paths = [];
        if (!isEmpty(getter.userData.roles)) {
            for (let r of state.userData.roles) {
                for (let p of r.permissions) {
                    if (!p.can_view) {
                        for (let path of p.paths) {
                            paths.push(path.path);
                        }
                    }
                }
            }
        }
        return paths;
    },

    userCollectivePermissions(state) {

        let overridePermissionsWithPivotData = function(permission, permissionsWithPivot) {
            for (let p of permissionsWithPivot) {
                if (permission.id === p.id) {
                    permission.can_view = p.pivot.can_view;
                    permission.can_create = p.pivot.can_create;
                    permission.can_update = p.pivot.can_update;
                    break;
                }
            }
            return permission;
        }

        let permissions = [];

        if (!isEmpty(state.userData.roles)) {
            for (let r of state.userData.roles) {
                for (let p of r.permissions) {
                    let permission = overridePermissionsWithPivotData(p, state.userData.permissions);
                    let matchPermission = permissions.find((p) => {
                        return p.page_name.toLowerCase() === permission.page_name.toLowerCase();
                    });
                    if (typeof matchPermission === 'undefined') {
                        permissions.push(permission);
                    } else if (!permission.can_view) {
                        let index = permissions.indexOf(matchPermission);
                        permissions[index] = permission;
                    }
                }
            }
        }

        return permissions;
    }

} // End of export default

