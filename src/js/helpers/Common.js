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

export function sd(v, d) {
    d = _.isUndefined(d) ? '' : d;
    return isEmpty(v) ? d : v;
} // End of sd() method


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
