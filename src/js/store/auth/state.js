/*
|--------------------------------------------------------------------------
| Store > Auth > State
|--------------------------------------------------------------------------
|
| This file contains the state property of Auth Vuex Module
|
| You may freely extend this store file if the store file that you will
| be building has similar characteristics.
|
*/
'use strict';

export default {

    /**
     * Value for the access token for API consumption.
     * @type {string|null}
     */
    accessToken: null,

    /**
     * Value to determine token type for API consumption.
     * @type {string|null}
     */
    tokenType: null,

    /**
     * Value to determine of two factor is enabled.
     * @type {boolean}
     */
    twoFactorEnabled: false,

    /**
     * Value for the QR code of 2FAuth
     * @type {string|null}
     */
    qrCode: null,

    /**
     * Container for User Data.
     */
    userData: {
        id: '',
        email: '...',
        name: '...',
    },
    
    /**
     * Container for User Roles.
     */
    userRoles: {},

    user_email: ''

} // End of export default