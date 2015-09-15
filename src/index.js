'use strict';

import {TypeError} from './errors';

/**
 * Recursively synchronizes two JS objects where the target becomes the source,
 * without changing the targets values for the keys that is has in common with the source.
 *
 * Does not work with arrays for obvious reasons.
 *
 * @param target - the object to be synchronized
 * @param source - the object to sync data from
 * @param overwrite - overwrites existing keys if true
 * @returns {{}}
 */
function deepSync(target, source, overwrite) {

    if (!(((target) && (typeof target === 'object')) &&
        ((source) && (typeof source === 'object'))) ||
        (source instanceof Array) || (target instanceof Array)) {

        throw new TypeError('Source and Target must be objects.');
    }

    let sourceKeys = new Set();
    let temp = {};

    if (target && typeof target === 'object') {

        Object.keys(target).forEach(function (key) {
            temp[key] = target[key];
        })
    }

    Object.keys(source).forEach(function (key) {

        sourceKeys.add(key);
        if (typeof source[key] !== 'object' || !source[key]) {

            // keep old value if the key can be found
            if (target[key]) {

                if (overwrite === true) {

                    temp[key] = source[key];
                } else {

                    temp[key] = target[key];
                }

            } else {

                temp[key] = source[key];
            }

        } else {

            if (!target[key]) {

                temp[key] = source[key];
            } else {

                temp[key] = deepSync(target[key], source[key], overwrite);
            }

        }
    });


    // remove keys that are not present in the sync source
    for (let targetKey in temp) {
        if (!sourceKeys.has(targetKey)) {
            delete temp[targetKey];
        }
    }

    return temp;
}

export default deepSync;