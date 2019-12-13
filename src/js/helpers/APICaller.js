/*
|--------------------------------------------------------------------------
| API Caller
|--------------------------------------------------------------------------
|
| This is a helper file which contains the API Caller.
|
| This is used for reaching out to the API endpoint in a consistent manner.
|
*/

import {isEmpty} from "./Common";

/**
 * Fetches response from API
 *
 * @param  {Object} o
 *   : An Object variable that contains option values. Expected are:
 *     > token
 *     > method
 *     > endpoint
 *     > params
 *     > data
 *     > isDataRaw
 *     > headers
 *     > onSuccessCallback
 *     > onErrorCallback
 *
 * @return {*}
 */
export default function(o) {

    let opts = {}; // Prepare axios options container

    // Set default values
    // **************************************************

    // Set default value for header if it does not exist
    if ( _.isUndefined(o.headers) ) {
        o.headers = {};
    }

    // Set default value for endpoint if it does not exist
    if ( _.isUndefined(o.endpoint) ) {
        o.endpoint = '';
    }

    // Set default value for method if it does not exist
    if ( _.isUndefined(o.method) ) {
        o.method = 'get';
    }

    // Set default value for isDataRaw if it does not exist
    if ( _.isUndefined(o.isDataRaw) ) {
        o.isDataRaw = false;
    }

    // Set default value for isParamsRaw if it does not exist
    if ( _.isUndefined(o.isParamsRaw) ) {
        o.isParamsRaw = false;
    }

    // Set required values for axios options
    // **************************************************
    opts.method = o.method;

    // Set URL value ---

    // Make sure app_api exists, else throw an error in the console.
    if (_.isNil(app_api) || app_api === '') {
        console.error(
          'Missing value for window.app_api',
          'It should be defined in a proper format.',
        );
    }

    // If in app_dev_mode, Check if the URL has a subdomain.
    let branchSubdomain = '';

    if (
      app_dev_mode
      && (process.browser || process.client)
      && !_.isNil(window)
      && !_.isNil(window.location)
      && !_.isNil(window.location.href)
    ) {
        // Check if the url has subdomain by check the dot(.) quantity.
        let urlSplit = (window.location.href).split('.');
        if (urlSplit.length > 3) {
            branchSubdomain = urlSplit[0].split('://')[1]; // Get the very first subdomain part.
        }
    }

    // If branch subdomain was defined properly above, include it in the base API URL.
    if (branchSubdomain !== '') {
        const apiBaseSplit = app_api.split('://');
        const apiBaseFormatted = `${apiBaseSplit[0]}://${branchSubdomain}.${apiBaseSplit[1]}`;

        opts.url = apiBaseFormatted + o.endpoint;
    } else {
        opts.url = app_api + o.endpoint;
    }

    // If (query)params exists, add it to opts, otherwise, leave it be
    if ( (!_.isUndefined(o.params)) && (!_.isEmpty(o.params)) ) {
        opts.url = o.isParamsRaw ? opts.url + '?' + o.params : opts.url + '?' + querystringify(o.params);
    }

    // If data exists, add it to opts, otherwise, leave it be
    if ( (!_.isUndefined(o.data)) && (!_.isEmpty(o.data)) ) {
        opts.data = o.isDataRaw ? o.data : querystringify(o.data);
    }

    // Set headers -----
    opts.headers = o.headers;

    // Authorization
    let token = localStorage.getItem("app_access_token");
    if ( !isEmpty(token) ) {
        opts.headers['Authorization'] = 'Bearer ' + token;
    }

    //set request is file
    if(!isEmpty(o.isBlob)){
        opts.responseType = 'blob'
    }

    // Set Default for Content-Type if its empty
    // if ( _.isUndefined(o.headers['Content-Type']) ) {
    //     opts.headers['Content-Type'] = 'application/x-www-form-urlencoded';
    // }

    return new Promise((resolve, reject) => {

        // Start calling API using axios
        // noinspection ES6ModulesDependencies
        console.log(opts);
        window.axios(opts)
            .then((response) => {

                //TODO: change this format with jsend
                // let responses = response.data
                console.groupCollapsed('API Call Successful');
                console.log('Response:', response);
                console.groupEnd();

                // If callback exists, run it
                if (
                      (!_.isUndefined(o.onSuccessCallback)) &&
                      (_.isFunction(o.onSuccessCallback))
                   ) {
                        o.onSuccessCallback(response);
                }

                resolve(response);
            })
            .catch((error) => {

                console.groupCollapsed('API Call Failed');
                console.error('Response:', error);
                console.groupEnd();

                // If callback exists, run it
                if (
                      (!_.isUndefined(o.onErrorCallback)) &&
                      (_.isFunction(o.onErrorCallback))
                   ) {
                        o.onErrorCallback(error);
                }

                reject(error);
            });
    });
}; // End of apiCall method

/**
 * Helper method to convert an object to querystring
 *
 * @param  {object} obj
 *   : the object to be converted
 *
 * @return {string}
 */
function querystringify(obj) {
    let has = Object.prototype.hasOwnProperty;
    let pairs = [];

    for (let key in obj) {
        if (has.call(obj, key)) {
            if (_.isArray(obj[key])) {
                for (let v in obj[key]) {
                    // noinspection JSUnfilteredForInLoop
                    pairs.push(encodeURIComponent(key) +'[]='+ encodeURIComponent(obj[key][v]));
                }
            } else {
                pairs.push(encodeURIComponent(key) +'='+ encodeURIComponent(obj[key]));
            }
        }
    }
    return pairs.join('&');
} // End of querystringify() method
