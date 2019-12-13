/*
|--------------------------------------------------------------------------
| Vuex Helpers
|--------------------------------------------------------------------------
|
| This is a helper file which contains all Vuex related helpers
| that will possibily be called multiple times in different files.
|
| Kind put your methods in here and then just use them on Vuex or Components
| for cleaner implementation.
|
*/

import {sd, errThrow, isEmpty} from "./Common";

/**
 * This helper method checks if the data given is empty,
 * and then populates it.
 *
 * @param {object} vue - The Vue reference (this) value.
 * @param {string} action - The action that will be called.
 * @param {string} data - The data that will be evaluated if empty or not.
 * @param {object} options - The set of option values that will be used all through out the method.
 *
 * @return {void}
 */
export function populate(vue, action, data = '', options = {}) {

  // Map the options into their respective containers.
  let {

    /**
     * @type {boolean} [force = false]
     *   A switch value wether to force the population regards is data is empty or not.
     */
    force,

    /**
     * @type {string} [ref = "The list"]
     *   String reference for showing information on console log.
     */
    ref,

    /**
     * @type {object} [payload = {}]
     *   The value that will be sent when action is dispatched.
     */
    payload,

    /**
     * @type {object} [params = {}]
     *   The value the will be used as query params for the GET request.
     */
    params,

    /**
     * @type {Function} [beforeActionCb] - Method to call before reaching out to API.
     */
    beforeActionCb,

    /**
     * @type {Function} [thenCb] - Callback for then()
     */
    thenCb,

    /**
     * @type {Function} [catchCb] - Callback for catch()
     */
    catchCb,

    /**
     * @type {Function} [finallyCb] - Callback for finallyCb()
     */
    finallyCb,

  } = options;

  // Set default values for the option nodes.
  force = sd(force, false);
  ref = sd(ref, 'The list');
  params = sd(params, {});
  params.page = sd(params.page, 1);
  payload = sd(payload, {});

  // Make sure the following params are filled, else throw an error.
  errThrow(vue, 'empty', 'Vue(this) Reference is missing');
  errThrow(action, 'empty', 'Action Reference (string) is missing');

  // If data is empty if force is enabled, run this block.
  if (isEmpty(vue[data]) || force) {
    console.log(ref + ' is currently being populated...');

    payload.extendParams = params;

    if (!_.isNil(beforeActionCb)) { beforeActionCb(vue); }

    // Call the Vuex action for filling the state.
    vue[action](payload)
      .then((r) => {
        console.log(ref + ' is successfully filled with data.');
        if (!_.isNil(thenCb)) { thenCb(vue, r); }
      })
      .catch((e) => {
        if (!_.isNil(catchCb)) { catchCb(vue, e); }
      })
      .finally(() => {
        if (!_.isNil(finallyCb)) { finallyCb(vue); }
      });

  } else {
    console.log(ref + ' is already filled with data. No need to refill.');

  } // End of if...else

} // End of populate() method


/**
 * Helper method for force reloading the list.
 *
 * @param {object} vue
 *   The Vue reference (this) value that will be used to reachout to $store.
 *
 *   The data that will be evaluated if empty or not.
 *
 * @param {string} action
 *   The action method that will be called if the data is empty.
 *
 * @param {string} [ref = "The list"]
 *   String reference for showing information on console log.
 *
 * @param {object} [params = {}]
 *   The value the will be used as query params for the GET request.
 *
 * @return {void}
 */
export function forcePopulate(vue, action, ref = 'The list', params = {}) {

  // Set default value for the current page.
  if (_.isUndefined(params.page) && _.isUndefined(vue.$route.query.page)) {

    // If both of the source are undefined, set the page to 1
    params.page = 1;

  } else {

    // Else, assign one of them whichever has value.
    params.page = _.isUndefined(params.page) ? vue.$route.query.page : params.page;
  }

  populate(vue, action, '', {
    force: true,
    params,
    ref: ref + ' (forced)',
  });
} // End of forceReloadList() method


/**
 * Helper method for generating an endpoint according to the given resource.
 * The letters g-e-p stands for Generate Endpoint.
 *
 * @param {string} resource
 *   The target resource
 *
 * @param {string} [prefix = '']
 *   The API Prefix value if there is any. This is optional.
 *
 * @return {string}
 */
export function gep(resource, prefix = '') {
  return isEmpty(prefix) ? '/api/' + resource : '/api/' + prefix + '/' + resource;
} // End of genEndpoint() method


/**
 * Helper method for evaluating the User Type.
 * The Letters eut stands for Evaluate User Type.
 *
 * @param {string|int} userType
 *   The type of user being targeted.
 *
 * @return {string}
 */
export function eut(userType) {

  if (_.isInteger(userType)) {

    // If the user type given is an integer. then run this block...
    switch (userType) {
      case 0:
        return 'user';
      case 1:
        return 'admin';
      case 2:
        return 'customer';
      case 3:
        return 'translator';
    }

  } else if (_.isString(userType)) {

    // If the user type given is a string. then run this block...
    switch (true) {
      case _.includes(userType, 'user'):
        return 'user';
      case _.includes(userType, 'admin'):
        return 'admin';
      case _.includes(userType, 'customer'):
        return 'customer';
      case _.includes(userType, 'translator'):
        return 'translator';
    }

  } else {
    console.error('Invalid value for userType.');
  }

} // End of setTarget() method

/**
 * Helper method to determine the key of the user's meta/data according
 * to the given user_type value.
 *
 * @param {int} type
 *   The value to be evaluated.
 *
 * @return {string}
 */
export function userDataKey(type) {

  if (parseInt(type) === 2)
    return 'customer_data';
  else if (parseInt(type) === 3)
    return 'translator_data';
  else
    return 'user_data';

} // End of userDataKey() method

/**
 * Helper method for generating properties based on the given collection.
 *
 * @param {array} col - the collection that will be iterated.
 * @param {*} val - the value to be assigned.
 * @return {object}
 */
export function genPropsFromCollection(col, val) {
  let result = {};
  _.each(col, (v) => {
    result[v] = _.cloneDeep(val);
  });
  return result;
}

/**
 * Helper method for formatting the time.
 *
 * @param {string} mode - varies between get an set.
 * @param {*} v - the value to be formatted.
 *
 * @return {*}
 */
export function timePickerFormatter(mode, v) {
  if (mode === 'get') {
    // noinspection ES6ModulesDependencies
    return v === '' ? '' : moment(v, 'HH:mm').toDate();

  } else if (mode === 'set') {
    if (v !== '') {
      // noinspection ES6ModulesDependencies
      return moment(v).format('HH:mm');
    }
  }
}


// /**
//  * Helper method for the proper expectation of what Vuex map state should do.
//  *
//  * @param {string} module
//  *   This is the target's module name
//  *
//  * @param {array} states
//  *   This is the target's state to be mapped.
//  *
//  * @return {object}
//  */
// export function mapState(module, states) {
//
//     // Prepare the result container.
//     let result = {};
//
//     let h = (target) => {
//         return {
//             get() { return this.$store.state[module][target] },
//             set(value) { return this.$store.state[module][target] = value; }
//         }
//     };
//
//     // Iterate tru each of state.
//     if (_.isArray(states)) {
//
//         // If the states given is an array, go for this loop.
//         _.forEach(states, (state) => {
//             result[state] = h(state);
//         });
//
//     } else if (_.isObject(states)) {
//
//         // If the states given is an object, go for this loop.
//         _.forOwn(states, (state, key) => {
//             result[key] = h(state);
//         });
//     }
//
//     return result;
//
// } // End of mapState
