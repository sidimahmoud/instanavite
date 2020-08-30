import moment from 'moment';
import 'moment-timezone';
import { extendMoment } from 'moment-range';
// Create a helper for setting default values if variable is undefined or null.
let sd = (v, d) => {
  return v === undefined || v === null ? d : v;
};
// Import window.Vue...
window.vue = require('vue');

// Set API url
// noinspection ES6ModulesDependencies
window.app_api = process.env.MIX_APP_API;

// Set API url
// noinspection ES6ModulesDependencies
window.app_dev_mode = sd(parseInt(process.env.MIX_APP_DEV_MODE), 0); // Using Integer as boolean.

// Set Locale
// noinspection ES6ModulesDependencies
window.app_locale = process.env.MIX_APP_LOCALE;

// Set Client ID and SECRET
// noinspection ES6ModulesDependencies
window.app_client_id = process.env.MIX_CLIENT_ID;
// noinspection ES6ModulesDependencies
window.app_client_secret = process.env.MIX_CLIENT_SECRET;
window.app_client_grant_type = sd(process.env.MIX_CLIENT_GRANT_TYPE, "admin");

// Set API Prefixes
// noinspection ES6ModulesDependencies
window.app_api_prefix_3 = sd(process.env.MIX_APP_API_PREFIX_3, "v3");

// Set Logout Redirect Path
window.APP_LOGOUT_REDIRECT = sd(process.env.MIX_APP_LOGOUT_REDIRECT, "https://digitaltolk.se/");

// notifier configs
window.app_dt_notifier_url = sd(process.env.MIX_DT_NOTIFIER_URL, 'https://pling.digitaltolk.se');
window.app_dt_notifier_project_code = sd(process.env.MIX_DT_NOTIFIER_PROJECT_CODE, 'dt-admin');
window.app_core_project_code = sd(process.env.MIX_CORE_PROJECT_CODE, 'dt-core');


window.app_dt_handesk_url = sd(process.env.MIX_DT_HANDESK_URL, 'https://post.digitaltolk.com/');
window.app_dt_handesk_token = sd(process.env.MIX_DT_HANDESK_TOKEN, 'the-api-token');
/**
 * @type {int}
 * If your gonna assigned an int value, it should be limited by 0 - 1
 * to represent boolean.
 */
window.app_pusher_enabled = parseInt(sd(process.env.MIX_APP_PUSHER_ENABLED, 1));
window.app_nimbus_enabled = parseInt(sd(process.env.MIX_APP_NIMBUS_ENABLED, 1));

// Use lodash
window._ = require('lodash');

// Use moment js

window.moment = extendMoment(moment);
// window.moment = moment;
// set moment timezone
window.moment.tz.setDefault("Europe/Stockholm");
// Use Jquery
// try {
//     window.$ = window.jQuery = require('jquery');
// } catch (e) {}

// Use axios
window.axios = require('axios');
// Intercept the request config as a workaround for Laravel Echo
// window.axios.interceptors.request.use((config) => {
//     console.log(config);
//     return config;
// }, (error) => {
//     return Promise.reject(error);
// });

// window.axios.defaults.headers.common['Access-Control-Allow-Headers'] = '*';
// window.axios.defaults.headers.common['Access-Control-Allow-Credentials'] = 'true';
// window.axios.defaults.headers.common['Access-Control-Allow-Methods'] = 'GET,PUT,POST,DELETE,PATCH,OPTIONS';

// Inject commonly used headers, comment out if there is a CORS issue.
// window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
// window.axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
// window.axios.defaults.headers.common['Accept'] = 'application/json, text/plain, */*';
window.axios.defaults.headers.common['Content-Type'] = 'application/json';

// if (window.app_dev_mode) {
//   window.axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
// }

/**
 * Next we will register the CSRF Token as a common header with Axios so that
 * all outgoing HTTP requests automatically have it attached. This is just
 * a simple convenience so we don't have to attach every token manually.
 */

// let token = document.head.querySelector('meta[name="csrf-token"]');

// if (token) {
//     window.axios.defaults.headers.common['X-CSRF-TOKEN'] = token.content;
// } else {
//     console.error('CSRF token not found: https://laravel.com/docs/csrf#csrf-x-csrf-token');
// }

/**
 * Echo exposes an expressive API for subscribing to channels and listening
 * for events that are broadcast by Laravel. Echo and event broadcasting
 * allows your team to easily build robust real-time web applications.
 */

// interceptor of axios request
axios.interceptors.request.use( (config) => {
    // check if x-socket-id is defined and removed it in the request header
    // for the ajax to properly work

    // check if url is for the API
    // const isAPI = request.url.includes(window.app_api);
    // if (isAPI && typeof config.headers['X-Socket-Id'] !== 'undefined')

    if (typeof config.headers['X-Socket-Id'] !== 'undefined') {
      delete config.headers['X-Socket-Id']
    }

    return config;
  }, (error) => {
      return Promise.reject(error);
});

/**
//moved to appInitialization.js due to DIG-2693 requirement
import Echo from 'laravel-echo'
// noinspection ES6UnusedImports
import Pusher from 'pusher-js';
import {
  showNotification,
  bookingCreated,
  bookingExpired
} from './helpers/DesktopNotifications'


if (app_pusher_enabled) {
    window.Echo = new Echo({
        broadcaster: 'pusher',
        key: process.env.MIX_PUSHER_APP_KEY,
        cluster: process.env.MIX_PUSHER_APP_CLUSTER,
        encrypted: true
    });
    window.Echo.channel('booking')
                .listen('.booking.created', showNotification)
                .listen('.booking.accepted', showNotification)
}
*/
