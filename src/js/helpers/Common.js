/*
|--------------------------------------------------------------------------
| Common Helpers
|--------------------------------------------------------------------------
|
| This is a helper file which contains all common/generic helpers that will
| be called multiple times in different files.
|
| Kind put your methods in here and then just use them on Vuex or Components
| for cleaner implementation.
|
*/

/**
 * Will combine the value for the extended and the source object. If the two
 * Objects have the same key with different value, the key:value in 'source'
 * will override/replace what's in the extended's key:value pair.
 *
 * @param  {object} extended
 *   : the object to be extended, and which values will be overridden.
 *   : this will be the Parent
 *
 * @param  {object} source
 *   : the object which values will be appended or force replace the extended
 *   : this will be the Child
 *
 * @return {object}
 *
 */
export function extendObj(extended, source) {

    let container = _.cloneDeep(extended);

    let customizer = (objValue, srcValue) => {
        if ( _.isArray(srcValue) ) { return srcValue; }
    };

    return _.mergeWith(container, source, customizer);

} // End of extendObj() method

/**
 * Will combine the value for the extended and the source object. If the two
 * Objects have the same key with different value, the key:value in 'source'
 * will override/replace what's in the extended's key:value pair.
 *
 * @param  {object} extended
 *   : the object to be extended, and which values will be overridden.
 *   : this will be the Parent
 *
 * @param  {object} source
 *   : the object which values will be appended or force replace the extended
 *   : this will be the Child
 *
 * @return {object}
 *
 */
export function extendObjParams(extended, source) {
    return !isEmpty(source) ? extendObj(extended, source.extendParams) : extended;
} // End of extendObj() method

/**
* Will add a key:value pair inside the Object (By Reference manner) only if
* the value that will be tested is not Empty.
*
 * @param  {*} x
 *   : the value to be tested.
 *
 * @param  {string} key
 *   : the object key to where the value will be assigned.
 *
 * @param  {object} obj
 *   : the object on where the value will be appended into.
 *
 */
export function addToObj(x, key, obj) {
    if ( !isEmpty(x) ) { obj[key] = x; }
} // End of addToObj() method

/**
 * Wil map the key:value pairs into the target from the given source.
 *
 * @param {object} source
 *   : the object where values will be coming from.
 *
 * @param {object} target
 *   : the object where values will be mapped into.
 *
 * @param {object} [opts]
 *   : the options that will be used within the method
 *
 * @param {array} [opts.preferredKeys]
 *   : these are the preferred keys to be mapped.
 *
 */
export function mapToObj(source, target, opts) {

    // Set Default values for the opts (options)
    opts = _.isUndefined(opts) ? {} : opts;
    opts.preferredKeys = _.isUndefined(opts.preferredKeys) ?
                            [] : opts.preferredKeys;

    // If Preferred Keys is not Empty, then run this block...
    if (_.size(opts.preferredKeys) !== 0) {
        _.each(opts.preferredKeys, (k) => {
            target[k] = source[k];
        });
    }

    // Else, fallback to default...
    else {
        _.forIn(target, (v,k) => {
            if ( _.has(target, k) && _.has(source, k) ) {
                target[k] = source [k]
            }
        });
    }

} // End of mapToObj() method

/**
 * Maps the properties from the source object to the target object
 *
 * @param  {object} source
 *   : the source object where the values and properties will be coming from
 *
 * @param  {object} target
 *   : the target object where the values will be mapped into
 *
 * @param  {object} [opts={}]
 *   : this is the set of options for the helper, expected are the following:
 *
 * @param  {function} [opts.customizer=false]
 *   : this is the customizer to modify the value before being assigned to target
 *   : has expected args value and key, then should return a mixed value.
 *
 * @param  {array} [opts.exclude=[]]
 *   : this are the properties that will be ignored completely
 *
 * @param  {boolean} [opts.append=false]
 *   : will add the key and value whenever it doesn't exist in the target
 *
 * @param  {boolean} [opts.byRef=true]
 *   : switch whether to modify the target object as byRef or byVal
 *
 * @return {object|void}
 */
export function mapProps(source, target, opts) {

    // Set quick helper for setting default values
    let h = (v, d) => { return _.isUndefined(v) ? d : v; };

    // Define default value for opts ---
    opts = h(opts, {});
    opts.customizer = h(opts.customizer, false);
    opts.exclude = h(opts.exclude, []);
    opts.append = h(opts.append, false);
    opts.byRef = h(opts.byRef, true);
    // ---

    // Put the source and target into a container
    let a = _.cloneDeep(source);
    let b = opts.byRef ? target : _.cloneDeep(target);

    // Iterate source properties
    _.forIn(a, (v, k) => {

        // If the key is NOT in exclude array list, run this block
        if ( !_.includes(opts.exclude, k) ) {

            // Create container for the value
            let val = null;

            // Check if customizer exists, and use it for modifying the value
            if (opts.customizer === false) { val = v; }
            else {
                let cr = opts.customizer(v,k); // Store customizer result
                val = _.isUndefined(cr) ? v : cr;
            }

            // Assign value to the target
            if (opts.append) { b[k] = val; }
            else {
                // If the target has the property(key), assign the value
                if (_.has(b,k)) { b[k] = val; }
            }

        } // End if ( !_.include(opts.exclude, k) )
    }); // End _.forIn()

    if (!opts.byRef) { return b; }

} // End of mapProps() method

/**
 * Validate
 * @param v
 * @returns {boolean}
 */
export function isEmpty(v) {
    if (window._.isArray(v) || window._.isObject(v)) {
        return window._.size(v) === 0;
    } else {
        return (
          window._.isNil(v)
          || window._.trim(v) === ''
          || v === 0
        );
    }
}

/**
 * Will remove all the empty values in an object
 *
 * @param {object} o
 *   : the object that will be modified
 *
 * @param {array} [forceAdd]
 *   : these are the keys to be added regardless if empty or not
 *
 * @return {object}
 */
export function tidyObj(o, forceAdd) {

    // Set Default value for forceAdd keys
    forceAdd = _.isUndefined(forceAdd) ? [] : forceAdd;

    // Clone the object to prevent changing the original object
    let obj = _.cloneDeep(o);
    let has = Object.prototype.hasOwnProperty;
    let result = {};

    for (let key in obj) {
        if (has.call(obj, key)) {
            if (_.includes(forceAdd, key)) {
                result[key] = obj[key];
            } else {
                if (!isEmpty(obj[key])) { result[key] = obj[key]; }
            }
        }
    }

    return result;
} // End of tidyObj() method

/**
 * Will map endpoint values if it exists in payload
 *
 * @param {string} endpoint
 *   : the string endpoint with placeholder {like_this}
 *
 * @param {object} payload
 *  : the payload where the key given will be checked
 *
 *
 * @return {string}
 */
export function mapEndpoint(endpoint, payload) {

    // Get all the placeholder inside endpoint
    // noinspection RegExpRedundantEscape
    let keys = (endpoint.match(/\{.+?\}/g) || [])
                .map(function(str) {
                    return str.slice(1,-1);
                });

    let obj = {}; // Create container for data object
    if ( _.isUndefined(payload.id) &&
         !_.isUndefined(payload.data) &&
         !_.isUndefined(payload.data.id)
       ) {
        obj = payload.data;
    } else {
        obj = payload;
    }

    _.each(keys, (k) => {

        // If the value within the obj[k] is not undefined,
        // run this block...
        if ( !_.isUndefined(obj[k]) ) {

            // Define the placeholder
            let placeholder = '{'+k+'}';
            // Define the endpoint
            endpoint = _.replace(endpoint, placeholder, obj[k]);
        }
    });

    return endpoint;
} // End of mapEndpoint() method

/**
 * Map Object Key (mok)
 * This is a helper method to return the value according to the given
 * dot notated key string
 *
 * @param {object}  obj
 *   : the object where the key will be mapped into
 *
 * @param {string} key
 *   : the key to be used to extract the value from the object
 *
 * @param {function} mutator
 *   : the method to mutate the value that will be returned.
 *
 * @return {*}
 */
export function mok(obj, key, mutator) {

    // Make sure that the object value requested is not undefined.
    if ( !_.isUndefined(_.get(obj, key)) ) {

        if (!_.isUndefined(mutator)) {
            // If mutator exists, mutate the value before returning.
            return mutator(_.get(obj, key), obj);

        } else {
            // If there is no mutator then return the result as is.
            return _.get(obj, key);
        }

    }
} // End of mok() method

/**
 * Defaults for Columns or Row Properties (crProps)
 * This is a helper method for placing defaults for column/row iteration
 * if the provided value is undefined.
 * Here the expected values for Columns and Row Properties
 *   {string} label
 *     : This is the label key that will be used as column label.
 *       Please consider that this value should also exist in the
 *       language files located @ "/src/assets/js/lang".
 *
  *   {string} title
  *     : This is a text that will be used to emphasize a new section
 *
 *   {string} prop
 *     : This will be used to map the value in desired to be displayed
 *       inside the Object (within the collection of objects in tableData).
 *
 *   {string} width
 *     : The desired width for the column.
 *
 *   {string} className
 *     : The desired class (name) to be used for the column.
 *
 *   {string} list
 *     : A switch whether to display the contents as list.
 *
 *   {string} sortable
 *     : Switch wether to make the column sortable.
 *
 * @param {array} col
 *   : the current iteration of column collection.
 *
 * @param {object} key
 *   : the key mapping that will be used to get the property value
 *     from the current iteration of column collection.
 *
 * @return {string}
 */
export function crProps(col, key) {

    // define a quick helper for setting defaults
    let h = (v,d) => { return !_.isUndefined(v) ? v : d; };

    // Set the defaults
    switch (key) {
        case 'label': return h(col[key], 'no_label');
        case 'title': return h(col[key], false);
        case 'prop': return h(col[key], 'no_prop');
        case 'childProp': return h(col[key], 'no_prop');
        case 'width': return h(col[key], '');
        case 'list': return h(col[key], false);
        case 'className': return h(col[key], '');
        case 'sortable': return h(col[key], false);
        case 'showPopover': return h(col[key], false);
        default: return '';
    } // End of switch

} // End of crProps() method

/**
 * Throw an error according to the given value requirement.
 *
 * @param {*} v
 *   : the value to be evaluated
 *
 * @param {string} [mode]
 *   : the behaviour switch of the evaluation
 *
 * @param {string} [errMsg]
 *   : the message that should be displayed upon error
 *
 * @return {void}
 */
export function errThrow(v, mode, errMsg) {

    let hasError = false;

    // Determine which mode will be used, and then throw the errors the
    // the condition has been met correctly.
    switch (mode) {
        case 'undefined':
            if (_.isUndefined(v)) { hasError = true; }
            break;
        case 'empty':
            if (isEmpty(v)) { hasError = true; }
            break;
        default:
            if (_.isUndefined(v)) { hasError = true; }
    }

    // Set Default value for errMsg
    errMsg = sd(errMsg, 'There is an error.');

    // If an error occurred, throw the error.
    if (hasError) { throw new Error(errMsg); }

} // End of errThrow() method

/**
 * Helper method for checking if the value given is valid
 * according to the mode of its evaluation.
 * An improved version of errThrow.
 *
 * @param v - Value to be evaluated.
 * @param mode - Mode of evaludation, e.g. Not Undefined, Undefined, Not Null, Null etc...
 * @param varName - Name of the variable for error display purposes.
 * @param withErrorThrow - Switch value to throw an error when value is invalid.
 * @param errorMessage - Message to be displayed upon error.
 * @return {Boolean}
 */
export function isValueValid (v, mode, varName = 'Variable', withErrorThrow = false, errorMessage = '') {
    // Define mode value properly.
    mode = window._.snakeCase(mode); // Transform mode into proper snake case format.

    // Format mode for label usage.
    let modeAsLabel = window._.startCase(mode);
    if (window._.includes(mode, 'nil')) modeAsLabel = modeAsLabel.replace('Nil', 'Null or Undefined');

    let isValid = null; // Container for the result.

    // Undefined
    if (mode === 'undefined') isValid = window._.isUndefined(v);
    else if (mode === 'not_undefined') isValid = !window._.isUndefined(v);

    // Null
    else if (mode === 'null') isValid = window._.isNull(v);
    else if (mode === 'not_null') isValid = !window._.isNull(v);

    // Nil
    else if (mode === 'nil') isValid = window._.isNil(v);
    else if (mode === 'not_nil') isValid = !window._.isNil(v);

    // Function
    else if (mode === 'function') isValid = window._.isFunction(v);
    else if (mode === 'not_function') isValid = !window._.isFunction(v);

    // Throw an error if the withErrorThrow === true.
    if (withErrorThrow && !isValid) {
        errorMessage = errorMessage === ''
          ? `${varName} is supposedly ${modeAsLabel} and therefore Invalid.`
          : errorMessage;
        throw new Error(errorMessage);
    }

    return isValid;
}

/**
 * Method to generate ID : Name Pair of Objects according to the given list
 *
 * @param {array} list
 *   : list of objects to be used as basis for ID : Name extraction
 *
 * @param {object} mapper
 *   : mapper to determine which key to use and which value to find
 *   : mapper format will be a pair of (key) : (string value)
 *
 * @return {array}
 */
export function keyAndLabels(list, mapper) {

    // Make sure the list is not empty, then proceed.
    if (!window._.isNil(list) && list.length > 0) {

        let r = []; // Prepare an array container for the result

        // Iterate to each object in the list, and use the mapper to extract values
        _.each(list, (x) => {

            let obj = {}; // Prepare an object container for the values

            // Map values using the mapper
            _.each(mapper, (v, k) => { obj[k] = _.get(x, v); });

            // Push the objects into result container
            r.push(obj);
        });

        return r;
    } else { return []; }

} // End of keyAndLabels() method

/**
 * Checks whether the list of the given booking status has been met.
 *
 * @param {object} booking
 *   The object (booking) item where the values will be coming from.
 *
 * @param {array} statuses
 *   The list (in array) of status that will be evaluated.
 *
 * @param {string} [cond=OR]
 *   Condition value whether to use OR | AND.
 *
 * @return {boolean}
 */
export function checkBookStatus(booking, statuses, cond) {

    // Define the following values.
    let bookingStatus = _.toLower(_.get(booking, 'attributes.status'));
    cond = _.isUndefined(cond) ? 'OR' : _.toUpper(cond);
    let result = null;

    let check = (s, cond) => {

        // Set initial value for reset if its null.
        if (_.isNull(result)) {
            result = bookingStatus == s;
        }

        // Else if there is value inside result, run this block...
        else {
            if (cond == 'OR') {
                result = result || bookingStatus == s;

            } else if (cond == 'AND') {
                result = result && bookingStatus == s;
            }
        }
    };

    _.each(statuses, (x) => { check(x, cond) });

    return result;

} // End of End of checkBookStatus() method

/**
 * Returns a result that was found from array/collection of objects.
 *
 * @param haystack
 *   The collection where the seach will happen.
 *
 * @param needle
 *   The criteria on which object item to return.
 *
 * @return {*}
 */
export function findFromObjCollection(haystack, needle) {
    return _.find(haystack, (obj) => {
        return _.includes(obj, needle);
    });
} // End of findFromObjCollection() method


/**
 * Method to validate if the provided value is empty, then...
 * If the value is empty, it will return the default value that provided,
 * else, if value exists, it will return the value.
 *
 * @param v
 *   This is the value that will be evaluated.
 *
 * @param d
 *   The is the default value to be used if v is empty.
 *
 */
export function sd(v, d) {
    d = _.isUndefined(d) ? '' : d;
    return isEmpty(v) ? d : v;
} // End of sd() method


/** 
 * method to remove all empty values from object for filter query params
*/
export function omitFromObject(obj) {
    return _.transform(obj, (result, value, key) => {
        if (_.isNull(value) || _.isUndefined(value) || _.isEmpty(value)) {
            return;
        }
        result[`filter[${key}]`] = _.isObject(value) ? omitFromObject(value) : `${value}`;
    });
}

/** 
 * method to remove all empty values from object, then assign new filter objects
*/
export function setFilterObj(obj) {
    return _.transform(obj, (result, value, key) => {
        if (_.isNull(value) || _.isUndefined(value) || _.isEmpty(value)) {
            return;
        }
        result[key] = _.isObject(value) ? omitFromObject(value) : value;
    });
}

/** 
 * method to remove all empty values from object
*/
export function cleanNull(obj) {
    return _.transform(obj, (result, value, key) => {
        if (_.isNull(value) || _.isUndefined(value) || _.isEmpty(value)) {
            return;
        }
        result[key] = _.isObject(value) ? cleanNull(value) : value;
    });
}
export function removeEmpty(obj) {
    return Object.keys(obj).filter(key => obj[key]).reduce(
      (newObj, key) => {
          newObj[`filter[${key}]`] = obj[key];
        return newObj
      }, {}
    )
}

export function setTimedLocalStorage(item,value){
    let hours = 24; // Reset when storage is more than 24hours
    let now = new Date().getTime();
    let setupTime = localStorage.getItem('setupTime');
    if (setupTime == null) {
        localStorage.setItem('setupTime', now);
        localStorage.setItem(item, value)
    } else {
        if(now-setupTime > hours*60*60*1000) {
            localStorage.removeItem(item);
            localStorage.setItem('setupTime', now);
        }
    }
}

export function playNotification(file='/audios/to-the-point.mp3') {
    if(document.hidden == false || document.webkitHidden == false) {
        let audio = new Audio(file);
        audio.play();
    }
}

export function sortAudits(audits, payload) {
    let auditsTime = {};
    let payloadTime = {};
    let timeCollection = new Set();
    let objCollection = [];

    for (let a in audits) {
        let timestamp = audits[a].created_at;
        auditsTime[timestamp] = audits[a];
        timeCollection.add(timestamp);
    }
    for (let p in payload) {
        let timestamp = payload[p].created_at;
        payloadTime[timestamp] = payload[p];
        timeCollection.add(timestamp);
    }

    timeCollection = Array.from(timeCollection).sort().reverse();

    for (let t in timeCollection) {
        if (auditsTime.hasOwnProperty(timeCollection[t])) {
            objCollection.push(auditsTime[timeCollection[t]]);
        }
        if (payloadTime.hasOwnProperty(timeCollection[t])) {
            objCollection.push(payloadTime[timeCollection[t]]);
        }
    }

    return objCollection;
}

/** 
 * method to remove any non numeric value and parse it make the mobile number as international format
*/
export function makeMobileInternational(mobile){
    mobile = onlyNumeric(mobile)
    if (mobile.startsWith("0")){
      mobile = mobile.substr(1)
      mobile = '+46'+ mobile
    }else if (mobile.startsWith("46")){
      mobile = '+'+ mobile
    }else if (!mobile.startsWith("+")){
      mobile = '+46'+ mobile
    }  

    return mobile      
  }

/** 
 * method to remove any non numeric value from string
*/
export function onlyNumeric(args){
    return args.replace(/\D/g,'')
}
